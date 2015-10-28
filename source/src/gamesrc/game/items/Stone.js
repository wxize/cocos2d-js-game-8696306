/**
 * Created by Leo on 2015/10/28.
 */

var Stone = lcocos.model.BaseAnimation.extend({
    ctor : function(){
        this._super()

        this.res_plist = res.gs_stone
        this.frames = 5
        this.prefix = 'stone'
        this.start_index = 1//资源的开始索引

        this.render()
        return true
    },

    reset : function(){
        this._super()

    }
})