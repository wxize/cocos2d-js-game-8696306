/**
 * Created by Leo on 2015/10/28.
 */

var PlayerRun_ = lcocos.model.BaseAnimation.extend({
    ctor : function(){
        this._super()

        this.res_plist = res.gs_player_run_
        this.frames = 4
        this.prefix = 'd'
        this.start_index = 1//资源的开始索引

        this.render()

        return true
    }
})