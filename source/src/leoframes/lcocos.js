var lcocos = lcocos || {};

//-----------------
lcocos.getIsBookor = function(){
	if(window.location.href.indexOf("bookor")==-1){
		lcocos.language = 'en'
	}else{
		lcocos.language = 'ch'
	}
	lcocos.language = 'ch'
}
lcocos.getIsBookor()


lcocos.generalSetting = function(){
	var l =window.document.getElementById("gameico")
	l.href = 'res/'+lcocos.language+'/favicon.ico';
    l.type = '';
    l.type = 'image/GIF';
}
lcocos.generalSetting()
//-----------------



lcocos.displayObject = {}
lcocos.displayObject.pause = function(target){
	cc.eventManager.pauseTarget(target, true); 
}
lcocos.displayObject.resume = function(target){
	cc.eventManager.resumeTarget(target, true); 
}

lcocos.effect = {}
lcocos.effect.shake = function(tar){
	tar.runAction(
		cc.sequence(cc.moveBy(0.01, 3, 0), cc.moveBy(0.01, 0, 3), cc.moveBy(0.02, -6, 0), cc.moveBy(0.02, 0, -6), cc.moveBy(0.01, 3, 0), cc.moveBy(0.01, 0, 3))
	)
}
lcocos.effect.heartbeat = function(tar){
	tar.runAction(
		cc.sequence(
			cc.scaleTo(1,1.1),
			cc.scaleTo(1,1)
		).repeatForever()
	)
}
lcocos.animator = {}
lcocos.animator.play = function(){

}
lcocos.animator.get = function(default_png){
	return new cc.Sprite(default_png)
}
lcocos.animator.init = function(plist,png){
	// var frameCache = cc.spriteFrameCache
	// frameCache.addSpriteFrame(plist,png)
}






lcocos.panel = {};
lcocos.panel.showWithScale = function ( panel , runTime ){
	var size = cc.winSize;
	panel.setScale(0.1);
	panel.runAction(new cc.ScaleTo(runTime , 1));
	lcocos.scenesManager.currentScene.addChild(panel , 100)
	panel.setPosition(cc.p(size.width/2,size.height/2))
}

lcocos.array = {}
lcocos.array.broken = function(arr){
    arr.sort(function(){ return 0.5 - Math.random() })
}

lcocos.button = {}
lcocos.button.getUIBtn = function (resPath ,callFunc,main) {
	var button = new ccui.Button();
    button.setTouchEnabled(true);
    button.loadTextures(resPath, resPath, "");
    button.addTouchEventListener(callFunc,main);
   	return button;
}
lcocos.button.getBtn = function ( resPath , point , callFunc , main ) {
	var sp = lcocos.util.getSprite(resPath);
	sp.setPosition(point)
	var listener = lcocos.util.getListener_end(callFunc)
	cc.eventManager.addListener(listener, sp);
	return sp;
}

lcocos.prompt = {}
lcocos.prompt.showText = function(text,color){
	var label = lcocos.util.getLabel();
	label.setString(text)
	label.setColor(color)
	lcocos.scenesManager.currentScene.addChild(label,100)
	label.setPosition(lcocos.point.getCenterXFloorY())
	label.runAction(new cc.Sequence(new cc.moveTo(0.2,lcocos.point.getCenter()),new cc.DelayTime(1),new cc.CallFunc(function(){label.removeFromParent(true)})))
}

lcocos.point = {}
lcocos.point.getCenter = function(){ return cc.p(cc.winSize.width/2,cc.winSize.height/2)}
lcocos.point.getCenterXFloorY = function(){ return cc.p(cc.winSize.width/2,0)}
lcocos.point.getCenterXTopY = function(){ return cc.p(cc.winSize.width/2,cc.winSize.height)}
/**
 *
 * @param tar
 * @returns {*|cc.Point}
 */
lcocos.point.getWorldPosByObject = function ( tar ) {
    return tar.parent.convertToWorldSpace(tar.getPosition());
}

lcocos.event = {}
lcocos.event.getListener = function(beganCall,moveCall,endCall){
	return cc.EventListener.create({
		event:cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches:true,
		onTouchBegan:function(touch,event){
			beganCall(touch,event)
			return true
		},
		onTouchMoved:function(touch,event){
			moveCall(touch,event)
			return true
		},
		onTouchEnded:function(touch,event){
			endCall(touch,event)
			return true
		}
	})
}
lcocos.event.getListener_begin = function(callFunc){
	return cc.EventListener.create({
	            event: cc.EventListener.TOUCH_ONE_BY_ONE, //TOUCH_ONE_BY_ONE 为单次触摸事件监听器
	            swallowTouches: true,
	            onTouchBegan: function (touch, event) {
	                // 需要返回true，否则不会调用后面的onTouchEnded方法
	                callFunc(touch,event);
	                return false;
	            }
     		})
}
lcocos.event.getListener_end = function(callFunc){
	return cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE, //TOUCH_ONE_BY_ONE 为单次触摸事件监听器
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                // 需要返回true，否则不会调用后面的onTouchEnded方法
                return true;
            },
            onTouchEnded: function (touch, event) {
               callFunc(touch,event);
            }
    });
}

lcocos.util = {};
lcocos.util.hasCollision = function(tar1,tar2){
	if(!tar1.parent)return
	if(!tar2.parent)return
	var p1 = tar1.parent.convertToWorldSpace(tar1.getPosition());
    var p2 = tar2.parent.convertToWorldSpace(tar2.getPosition());
    
    //var distanceX = Math.abs(p1.x - p2.x);
	//var distanceY = Math.abs(p1.y - p2.y);
	//if(distanceX < (tar1.width + tar2.width)/2 && distanceY < (tar2.height+tar1.height)/2){
	//    return true
	//}
	// return false
	// 另一种方法
     var rect1 = tar1.getBoundingBox()//cc.rect(p1.x,p1.y,tar1.width,tar1.height)//tar1.getBoundingBox();
     var rect2 = tar2.getBoundingBox()//cc.rect(p2.x,p2.y,tar2.width,tar2.height)//tar2.getBoundingBox();
     rect1.x = p1.x;
     rect1.y = p1.y;
     rect2.x = p2.x;
     rect2.y = p2.y;
    return cc.rectIntersectsRect(rect1, rect2);
}

lcocos.util.getLabel = function () {
	return new cc.LabelTTF("", "Arial", 38);
}
lcocos.util.getScrollView = function (size , childSize) {
	var listView= new ccui.ScrollView();
    //listView.retain();
    listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
    listView.setTouchEnabled(true);
    listView.setBounceEnabled(true);
    listView.setSize(size);
    listView.setInnerContainerSize(childSize)
    return listView;
}
lcocos.util.getTilesPanel = function(data_arr,width,obj,callFunc){
	var panel = new cc.Layer();
	var arr = [],index=0,tempItem,item,_objItem,_height=0;
	for(var i=0;i<data_arr.length;i++){
		item = data_arr[i];
		_objItem=obj[i];
		item = lcocos.button.getUIBtn(item,callFunc,panel);
		item.cdata=_objItem;
		if(!arr[index]) {
			arr[index]=[]
		}
		var len = arr[index].length;
		tempItem = arr[index][len-1];
		var _x,_y;
		if(tempItem){
			_x = tempItem.x + tempItem.cdata.width;
			if ( _x + item.cdata.width > width ) {
				index++;
				if(!arr[index]) {
					arr[index]=[]
				}
				_x = 0;
			}
		}else{
			_x = 0;
		}
		if(index==0){
			_y=0;
		}else{
			len = arr[index-1].length;
			tempItem = arr[index-1][len-1];
			_y = tempItem.y + tempItem.cdata.height;
		}
		item.x = _x + item.cdata.width;
		item.y = _y + item.cdata.height + 20;
		arr[index].push(item)
		panel.addChild(item);
		if(item.y > _height){
			_height=item.y + 100;
		} 
	}
	panel.height = _height;
	return panel;
}








lcocos.scenesManager = {
	scene:{},
	currentScene:null
};
lcocos.registerScene = function (key,className,res){
	lcocos.scenesManager.scene[key] = {
		key:key,
		className:className,
		res:res
	}
}
lcocos.scenesManager.goScene = function(key) {
	var obj = lcocos.scenesManager.scene[key];
	if(!obj){
		console.log('出现错误，或许你没有注册该场景！');
		return;
	}
	cc.LoaderScene.preload(obj.res, function () {
        lcocos.scenesManager.currentScene = new obj.className();
        cc.director.runScene(lcocos.scenesManager.currentScene);
    }, this);
}


// source file --> flax
lcocos.userData = {}
lcocos.fetchUserData = function(defaultValue) {
    var data = null;
    try{
        data = cc.sys.localStorage.getItem(cc.game.config["gameId"]);
        if(data) data = JSON.parse(data);
    }catch(e){
        cc.log("Fetch UserData Error: "+ e.name);
    }
    if(data) lcocos.copyProperties(data, lcocos.userData);
    else if(defaultValue) lcocos.userData = defaultValue;
    if(!lcocos.userData) lcocos.userData = {};
};
lcocos.saveUserData =  function() {
    if(!lcocos.userData) lcocos.userData = {};
    try{
        cc.sys.localStorage.setItem(cc.game.config["gameId"], JSON.stringify(lcocos.userData));
    }catch (e){
        cc.log("Save UserData Error: "+ e.name);
    }
};
/**
 * Copy all the properties of params to target if it own the property
 * */
lcocos.copyProperties = function(params, target)
{
    if(params == null || target == null) return;
    for(var k in params){
        try{
            target[k] = params[k];
        }catch (err) {

        }
    }
};

var lc = lc || {}
lc.isDebug = true
lc.iso = (window.location.href.indexOf("ookor")==-1) ? false : true
lc.action = {
	shake : function(display){
		display.runAction(
			cc.sequence(cc.moveBy(0.02, 3, 0), cc.moveBy(0.02, 0, 3), cc.moveBy(0.04, -6, 0), cc.moveBy(0.04, 0, -6), cc.moveBy(0.02, 3, 0), cc.moveBy(0.02, 0, 3))
		)
	}
}

















/**
 *  模板
 * @type {{}}
 */
lcocos.model = {}
/**
 *  flax
 */
lcocos.model.BaseAnimationScene_flax = cc.Scene.extend({
	res_bg_plist : "",
	scene_name : "",
	scene_position : null,
	animation_list : null,

	//---  private
	_bg : null,
	render : function(){
		var size = cc.winSize
		this._bg = flax.assetsManager.createDisplay(this.res_bg_plist,this.scene_name)
		this.addChild(this._bg)
		//bg.setAnchorPoint(cc.p(0.5,0.5))
		this._bg.setPosition(this.scene_position)
		this._bg.fps = 85
		//for(var i = 0; i < this.animation_list.length; i++) {
		//	this._bg[this.animation_list[i]].play()
		//	this._bg[this.animation_list[i]].fps = 120
		//}
	},

	stop : function(){
		for(var i = 0; i < this.animation_list.length; i++) {
			this._bg[this.animation_list[i]].stop()
		}
	},

	play : function(){
		for(var i = 0; i < this.animation_list.length; i++) {
			this._bg[this.animation_list[i]].play()
		}
	}
})
lcocos.model.BaseAnimation = cc.Node.extend({
	res_plist : "",
	frames : 0,
	prefix : "",//资源名前缀
	start_index : 0, // 开始的索引
	frame_time : 0.1,// 帧时间
	animation : null,
	action : null,
	onFishedCall:function(){},
	render : function(){
		var cache = cc.spriteFrameCache
		cache.addSpriteFrames(this.res_plist)

		var frames = []
		for(var i = 0; i < this.frames; i++){
			var resName = this.prefix + (i+this.start_index) + '.png'
			var frame = cache.getSpriteFrame(resName)
			frames.push(frame)
		}
		var animation = new cc.Animation(frames,this.frame_time)
		this.action = new cc.RepeatForever(cc.sequence(new cc.Animate(animation),cc.callFunc(this.onFishedCall)))
		var default_ = cache.getSpriteFrame(this.prefix+this.start_index+'.png')
		this.animation = new cc.Sprite(default_)
		this.addChild(this.animation)
		//this.reset()
		//this.animation.runAction(this.action)
	},
	reset : function(){

	},
	stop : function(){
		this.animation.stopAllActions()
	},
	play : function(){
		this.animation.stopAllActions()
		this.animation.runAction(this.action)
	}

})

lcocos.model.BaseScene = cc.Scene.extend({
	res_bg : "",
	position_bg : null,
	bg : null,
	render : function(){
		var size = cc.winSize
		if(this.res_bg!=""){
			this.bg = new cc.Sprite(this.res_bg)
			this.addChild(this.bg)
			if(!this.position_bg){
				this.position_bg = cc.p(size.width/2,size.height/2)
			}
			this.bg.setPosition(this.position_bg)
		}
	}
})
lcocos.model.BaseStartScene = lcocos.model.BaseScene.extend({

	res_play : "",
	call_play : null,
	position_play : cc.p(240,200),
	// private
	mu : null,
	render : function(){
		this._super()
		var size = cc.winSize
		if(this.res_play!=""){
			var play = new cc.MenuItemImage(
				this.res_play,
				this.res_play,
				this.call_play, this);
			this.mu = new cc.Menu(play);
			this.mu.setPosition(cc.p(0,0))
			this.addChild(this.mu)
			play.setPosition(this.position_play)
			lcocos.effect.heartbeat(play)
		}
	},
	getPlay : function(){
		return this.mu
	}
})

lcocos.model.BaseOverScene = lcocos.model.BaseScene.extend({
	res_home : "",
	home_position : null,
	res_reGo : "",
	reGo_position : null,
	reGo_call : null,
	render : function(){
		this._super()
		var size = cc.winSize
		var _this = this
		if(this.res_home!=""){
			var home = new cc.MenuItemImage(
				this.res_home,
				this.res_home,
				function(){
					window.location.href = '/'
				},this
			)
			if(this.home_position) {
				home.setPosition(this.home_position)
			}
			var reGo = new cc.MenuItemImage(
				this.res_reGo,
				this.res_reGo,
				function(){
					_this.reGo_call()
				},this
			)
			if(this.reGo_position){
				reGo.setPosition(this.reGo_position)
			}
			var mu = new cc.Menu(home,reGo)
			mu.setPosition(cc.p(0,0))
			this.addChild(mu)
		}
	}
})











































