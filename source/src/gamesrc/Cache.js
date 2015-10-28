/**
 * Created by Leo on 2015/10/27.
 */

var cache = cache || {}

// register cache
cache.stump = {list:[],class:Branch}
cache.xz = {list:[],class:XZ}
cache.stone = {list:[],class:Stone}


cache.get = function(type){
    if(!cache[type]){
        cc.error('no regist -->' + type)
    }
    var item
    if(cache[type].list.length){
        item = cache[type].list.shift()
    }else{
        item = new cache[type].class()
    }
    item.reset()
    return item
}

cache.set = function(type,item){
    if(item.parent){
        item.removeFromParent(true)
    }
    cache[type].list.push(item)
}