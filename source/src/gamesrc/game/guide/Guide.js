/**
 * Created by Leo on 2015/10/27.
 */
var Guide = lcocos.model.BaseStartScene.extend({
    ctor : function(){
        this._super()

        var size = cc.winSize

        this.res_bg = res.gs_guide
        this.res_play = res.gs_guide_close
        this.call_play = function(){
            var scene = lcocos.scenesManager.currentScene
            var guide = scene.game.guide
            guide.runAction(
                cc.sequence(
                    cc.moveBy(0.2,cc.p(0,600)),
                    cc.callFunc(function(){
                        guide.removeFromParent(true)
                        scene.game.start()
                    })
                )

            )
        }
        this.position_play = cc.p(size.width/2+150,size.height/2+130)

        this.render()
        return true
    }
})