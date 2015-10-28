/**
 * Created by Leo on 2015/10/24.
 */
var StartScene = lcocos.model.BaseStartScene.extend({
    ctor : function(){
        this._super()

        var size = cc.winSize

        this.res_bg = res.ss_bg
        this.res_play = res.ss_play
        this.position_bg = cc.p(size.width/2,680)
        this.call_play = function(){
            var scene = lcocos.scenesManager.currentScene
            var play = scene.start.getPlay()
            play.runAction(
                cc.sequence(
                    cc.moveBy(0.2,cc.p(0,-300)),
                    cc.callFunc(function(){
                        scene.game.showGuide()
                        scene.start.removeFromParent(true)
                    })
                )
            )
            this.bg.runAction(
                    cc.moveBy(0.2,cc.p(0,300))
            )

            //scene.start.removeFromParent(true)
        }
        this.render()
        return true
    }
})