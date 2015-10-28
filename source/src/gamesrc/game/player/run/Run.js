/**
 * Created by Leo on 2015/10/27.
 */



var Run = lcocos.model.BaseAnimation.extend({
    ctor : function(){
        this._super()

        this.res_plist = res.gs_player_run
        this.frames = 6
        this.prefix = 's'
        this.start_index = 1//资源的开始索引
        this.frame_time = 0.06
        this.render()

        return true
    }
})