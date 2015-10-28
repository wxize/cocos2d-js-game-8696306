/**
 * Created by Leo on 2015/10/28.
 */

var PlayerJump = lcocos.model.BaseAnimation.extend({
    ctor : function(){
        this._super()

        this.res_plist = res.gs_player_jump
        this.frames = 4
        this.prefix = 'f'
        this.start_index = 1//资源的开始索引

        //this.render()

        return true
    },
    render : function(){
      this._super()
    }
})