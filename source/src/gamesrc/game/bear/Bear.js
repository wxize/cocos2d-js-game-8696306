/**
 * Created by Leo on 2015/10/27.
 */

var Bear = lcocos.model.BaseAnimation.extend({
    index : 0,
    ctor : function(){
        this._super()

        this.res_plist = res.gs_bear_plist
        this.frames = 5
        this.prefix = 'bear'
        this.start_index = 1//资源的开始索引

        this.render()

        return true
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
        this.animation.x = this.index * 30
    }
})