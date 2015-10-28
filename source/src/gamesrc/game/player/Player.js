/**
 * Created by Leo on 2015/10/27.
 */


var Player_data = {
    hp:3,
    position : [
        cc.p(-60,0),cc.p(0,0),cc.p(60,0)
    ]
}
var Player = cc.Scene.extend({
    player_run : null,
    player_jump : null,
    player_run_ : null,
    player_collisionRect : null,
    index : 0,
    ctor : function(){
        this._super()

        this.player_run = new Run()
        this.addChild(this.player_run)

        this.player_jump = new PlayerJump()
        this.player_jump.onFishedCall = function(){
            // change action
            var scene = lcocos.scenesManager.currentScene
            if(Player_data.hp>1){
                scene.game.player.changeAction('run')
            }else{
                scene.game.player.changeAction('run_')
            }
        }
        this.player_jump.render()

        this.player_run_ = new PlayerRun_()

        this.player_collisionRect = new cc.DrawNode()
        this.player_collisionRect.drawRect(cc.p(-5,-5), cc.p(10,10),null,0.000001,null)
        this.addChild(this.player_collisionRect)
        this.player_collisionRect.setPosition(cc.p(0,-80))

        return true
    },
    run : function(){
        if(this.player_run.parent){
            this.player_run.play()
        }
        if(this.player_run_.parent){
            this.player_run_.play()
        }
        if(this.player_jump.parent){
            this.player_jump.play()
        }
    },
    pause : function(){
        this._super()
        if(this.player_run.parent){
            this.player_run.stop()
        }
        if(this.player_run_.parent){
            this.player_run_.stop()
        }
        if(this.player_jump.parent){
            this.player_jump.stop()
        }
    },

    changePosition : function(dir){

        // 'left' , 'right'
        if(dir=='left'){
            if(this.index==-1){
                return
            }
            this.index--
        }
        if(dir=='right'){
            if(this.index==1){
                return
            }
            this.index++
        }
        this.player_run.x = this.index * 60
        this.player_collisionRect.x = this.player_run.x
    },

    changeAction : function(type){
        // 'run' , 'jump' , 'run_'
        this.player_run.removeFromParent(true)
        this.player_jump.removeFromParent(true)
        this.player_run_.removeFromParent(true)
        var item = this['player_'+type]
        this.addChild(item)
        item.play()
        item.x = this.index * 60
        this.player_collisionRect.x = item.x
    }
})