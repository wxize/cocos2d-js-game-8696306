/**
 * Created by Leo on 2015/10/24.
 */
var GameScene = lcocos.model.BaseAnimationScene_flax.extend({
    guide : null,
    player : null,
    bear : null,
    barricade : null,

    _m : null,
    ctor : function(){
        this._super()

        var size = cc.winSize

        var _this = this
        // background
        var c = new cc.LayerColor()
        c.setColor(cc.color(136,198,73,255))
        this.addChild(c)
        this.res_bg_plist = res.gs_bg
        this.scene_name = 'bg'
        this.scene_position = cc.p(240,600)
        this.animation_list = [
            'road','leftTree','rightTree'
        ]
        this.render()

        // bear
        this.bear = new Bear()
        this.addChild(this.bear,10)
        this.bear.setPosition(cc.p(size.width/2,size.height/2 + 100))

        // player
        this.player = new Player()
        this.addChild(this.player,10)
        this.player.setPosition(cc.p(size.width/2,size.height/2))


        this.barricade = new Barricade()
        this.addChild(this.barricade)

        if(!this.gameOver){
            this.gameOver = new OverScene()
        }

        // m
        this._m = new cc.LabelTTF("","Arial",38)
        this.addChild(this._m)
        this._m.setPosition(cc.p(size.width/2,600))

        var beganPoint = null
        var listener = lcocos.event.getListener(
            // began handler
            function(touch,event){
                beganPoint = touch.getLocation()
            },
            // move handler
            function(touch,event){},
            // ended handler
            function(touch,event){
                var touchPoint = touch.getLocation()
                var _x = touchPoint.x - beganPoint.x
                var _y = touchPoint.y - beganPoint.y
                if(Math.abs(_x) > Math.abs(_y)){
                    if(Math.abs(_x) > 20){
                        if(_x > 0){
                            _this.player.changePosition('right')
                            _this.bear.changePosition('right')
                        }else{
                            _this.player.changePosition('left')
                            _this.bear.changePosition('left')
                        }
                    }
                }else{
                    if(Math.abs(_y) > 20){
                        if(_y > 0){
                            _this.player.changeAction('jump')
                        }else{

                        }
                    }
                }
            }
        )
        cc.eventManager.addListener(listener, this);


        return true
    },

    __:0,
    update : function(dt){
        this.__+=dt
        if(this.__ >= 1){
            this.__ -= 1
            d.local_score ++
            this._m.setString(d.local_score)
        }
        // ¼ì²âÅö×²
        var player = this.player
        var p_rect = this.player.player_collisionRect
        var collisions = this.barricade.collisions
        var p_rect_point = p_rect.parent.convertToWorldSpace(p_rect.getPosition())
        var item
        for(var i = 0; i < collisions.length; i++){
            item = collisions[i]
            if(p_rect_point.y - item.y > 0){
                if(p_rect_point.y - item.y < 10){
                    if(!player.player_jump.parent){
                        var bool = false
                        if(item.prefix=='stump'){
                            bool = true
                        }else{
                            var _x = Math.abs(p_rect_point.x - item.x)
                            if(_x < 15){
                                bool = true
                            }
                        }
                        // collision
                        if(bool){


                            if(item.prefix=='xz'){
                                lc.action.shake(player)
                                collisions.splice(i,1)
                                cache.set(item.prefix,item)
                                cc.log('collision')
                            }else{
                                lc.action.shake(player)
                                collisions.splice(i,1)
                                cache.set(item.prefix,item)
                                cc.log('collision')
                                this.showGameOver()
                            }


                        }
                    }
                }
            }
            if(lcocos.util.hasCollision(p_rect,item)){
                item.removeFromParent(true)
            }
        }
    },

    start : function(){
        this.player.run()
        this.bear.play()
        this.play()
        this.barricade.run()
        this.scheduleUpdate()
    },

    showGuide : function(){
        lcocos.fetchUserData()
        lcocos.userData.hasGuide = null
        if(lcocos.userData.hasGuide){
            return
        }else{
            lcocos.userData.hasGuide = true
            lcocos.saveUserData()

            this.guide = new Guide()
            this.addChild(this.guide,12)
            this.guide.y = 600
            this.guide.runAction(
                cc.moveBy(0.2,cc.p(0,-600))
            )
        }
    },

    showGameOver : function(){
        if(!lc.isDebug){
            ggay()
        }
        this.unscheduleUpdate()
        this.gameOver.y = 600
        this.addChild(this.gameOver,13)
        this.gameOver.runAction(
            cc.moveBy(0.2,cc.p(0,-600))
        )
        this.gameOver.setLocalScore(d.local_score)
        lcocos.fetchUserData()
        if(!lcocos.userData.score){
            lcocos.userData.score = 0
        }
        if(lcocos.userData.score < d.local_score){
            lcocos.userData.score = d.local_score
        }
        lcocos.saveUserData()
        this.gameOver.setBestScore(lcocos.userData.score)
        this.player.pause()
        this.bear.stop()
        this.stop()
        this.barricade.stop()

        d.local_score = 0
        this._m.setString(d.local_score)
    }
})