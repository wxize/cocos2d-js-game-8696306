/**
 * Created by Leo on 2015/10/27.
 */



// 开始 -- 游戏中 -- 结束 全部出现在一个场景里面， 所有有了一个类


var Scene = cc.Scene.extend({

    start : null,
    game : null,

    ctor : function(){
        this._super()

        // game
        this.game = new GameScene()
        this.addChild(this.game)

        // start
        this.start = new StartScene()
        this.addChild(this.start)

        // over
        //var over = new OverScene()
        //this.addChild(over)

        return true
    }
})