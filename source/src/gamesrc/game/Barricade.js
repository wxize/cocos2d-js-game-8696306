/**
 * Created by Leo on 2015/10/27.
 */

    // 由于障碍物和player还有熊会出现层级的问题，所有此类内容将不直接添加到this
    // 而是添加到和他们同一层级的地方（game scene)
var Barricade = cc.Layer.extend({


    collisions : [],

    create_functions : [],
    create_space : 3,

    ctor : function(){
        this._super()

        this.create_functions = [
            '_createBranch',"_createXZ","_createStone"
        ]

        return true
    },

    run : function(){
        this.scheduleUpdate()
    },
    stop : function(){
        this.unscheduleUpdate()
    },

    update : function(dt){
        this.__create__(dt)
        this.__move__(dt)
    },
    __move__ : function(dt){
        var item
        for(var i = this.collisions.length-1; i >= 0 ; i--){
            item = this.collisions[i]
            item.y+=dt*1000/16*6
            item.x += -item.index/1.6
            item.scale = (800-item.y)/800
            if(item.y > cc.winSize.height/2-80){
                item.setLocalZOrder(9)
            }
            if(item.y > 600){
                this.collisions.splice(i,1)
                cache.set(item.prefix,item)
            }

        }
    },

    __ : 0,
    __create__ : function(dt){
        this.__+= dt
        if(this.__ >= this.create_space){
            this.__ -= this.create_space
            var index = Math.floor(Math.random()*3)
            this[this.create_functions[index]]()
            //this.create_space = 1000000
        }
    },
    _createBranch : function(){
        this.___c('stump',0)
    },
    _createXZ : function(){
        var index = Math.floor(Math.random()*3) - 1
        this.___c('xz',index)
    },
    _createStone : function(){
        var index = Math.floor(Math.random()*3) - 1
        this.___c('stone',index)
    },
    ___c : function(type,index){
        var scene = lcocos.scenesManager.currentScene
        var size = cc.winSize
        var item = cache.get(type)
        item.index = index
        scene.game.addChild(item,11)
        item.play()
        item.setPosition(cc.p(size.width/2+index*100,-30))
        this.collisions.push(item)
    }

})