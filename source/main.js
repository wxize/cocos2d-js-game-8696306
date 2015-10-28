cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));
    // Pass true to enable retina display, disabled by default to improve performance
    cc.view.enableRetina(false);
    //初始化引�?
    flax.init(cc.ResolutionPolicy.SHOW_ALL);

    lcocos.registerScene('s',Scene,res_s)
   // lcocos.registerScene('gs',GameScene,res_gs)
    lcocos.scenesManager.goScene('s')

};
cc.game.run();