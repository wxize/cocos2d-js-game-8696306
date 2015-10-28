/**
 * Created by Leo on 2015/10/28.
 */


var XZ = lcocos.model.BaseAnimation.extend({
    ctor : function(){
        this._super()

        this.res_plist = res.gs_xz
        this.frames = 5
        this.prefix = 'xz'
        this.start_index = 1//资源的开始索引

        this.render()
        return true
    },

    reset : function(){
        this._super()

    }
})