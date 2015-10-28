/**
 * Created by Leo on 2015/10/26.
 */



var OverScene = lcocos.model.BaseOverScene.extend({

    _local_score : null,
    _best_score : null,
    ctor : function(){
        this._super()

        var size = cc.winSize

        this.res_bg = res.os_lose_bg_png
        this.res_home = res.os_home_png
        this.res_reGo = res.os_restart_png
        this.home_position = cc.p(size.width/2-120,230)
        this.reGo_position = cc.p(size.width/2+120,230)
        this.reGo_call = function(){
            var scene = lcocos.scenesManager.currentScene
            var game_over = scene.game.gameOver
            game_over.runAction(
                cc.sequence(
                    cc.moveBy(0.2,cc.p(0,600)),
                    cc.callFunc(function(){
                        game_over.removeFromParent(true)
                        scene.game.start()
                    })
                )

            )
        }
        this.render()


        // 本局得分
        this._local_score = new cc.LabelTTF("12345678","Arial",38)
        this.addChild(this._local_score)
        this._local_score.setPosition(cc.p(316,425))
        // 最高得分
        this._best_score = new cc.LabelTTF("12345678","Arial",38)
        this.addChild(this._best_score)
        this._best_score.setPosition(cc.p(316,356))
        return true
    },
    setLocalScore : function(value){
        this._local_score.setString(value)
    },
    setBestScore : function(value){
        this._best_score.setString(value)
    }
})