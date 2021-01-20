// pages/waterfall/index.js
var photos = []
    ,systom = wx.getSystemInfoSync()
    ,colusInfo = [{top:0,index:0,left:systom.windowWidth * 0.03},{top:0,index:1,left:systom.windowWidth * 0.51}]
    ,lastId = 0
    ,frame = 0
    ,loadingstop = false
    ,uploadImgLength = 0
    ,uploadImg = 0
    

function getMoreData( data, cb ){
    /* 接口处理, data 为参数,cb为回调
    wx.request({
      url: "",
      data: data,
      method: 'GET',
      success: function({data}){
        var { code, data } = data
        if( !code ){
            !data.length && ( loadingstop = true )
            reCalcData( data )
            cb( {
                photos : photos
                ,loadingTop: findCurCol('max').top
                ,loadingstop
            } )
        }
      }
    })*/
    var _data = require("./data"+data.frame)["data"+data.frame]
    var { code, data } = _data
    if( !code ){
        !data.length && ( loadingstop = true )
        reCalcData( data )
        cb( {
            photos : photos
            ,loadingTop: findCurCol('max').top
            ,loadingstop
        } )
    }
}
function findCurCol(type){
	var _cols = colusInfo.slice(0)
	_cols.sort(function( a, b ){
		return  type == "min" ? ( a.top - b.top ) : ( b.top - a.top )
	})
	return  { index: _cols[0].index, top: _cols[0].top,left:_cols[0].left }
}
function reCalcData( data ){
    frame ++
    var _d = data.map( function( v, i, arr ){
        var obj = {}
            ,curCol = findCurCol("min")
        obj.img = v.url
        obj.height = parseInt(systom.windowWidth * 0.45 * v.height / v.width)
        obj.left = curCol.left
        obj.top = curCol.top
        colusInfo[ curCol.index ].top  += obj.height + 10
        photos.push( obj )
        if( i == arr.length - 1 ){ lastId = v.id }
    } )
}
Page({
  data:{
      numbers:[
      ]
      ,lastState:{
        
      }
      ,loadingTop: ""
      ,photos:[]
      ,triggerUplaodHeight: systom.windowHeight * 0.2
      ,loadingstop:false
      ,scrollDown: true
      ,uploadImgLength : 0
      ,uploadImg : 0
  }
    ,onLoad: function( option ){
        var that = this
        //初始化的原因是 每次在进入这个页面会保留之前的值
        photos.splice(0,photos.length)
        colusInfo = [{top:0,index:0,left:systom.windowWidth * 0.03},{top:0,index:1,left:systom.windowWidth * 0.51}]
        lastId = 0
        frame = 0
        loadingstop = false
        uploadImg = 0
        uploadImgLength = 0

        getMoreData( {
            frame:0
            ,
        }, ( { photos, loadingTop, loadingstop } ) => {
            if( photos.length < 10 ){
                loadingstop = true
            }
            that.setData({photos,loadingTop, loadingstop})
        } )   
}
  ,lowrefresh:function(){
      
      if( !loadingstop ){
            getMoreData({
                  frame:frame
              },( { photos, loadingTop,loadingstop } ) => { this.setData({photos,loadingTop,loadingstop}) })
      }
      
  }
  ,scrollevent:function( ev ){
        if( ev.detail.deltaY < 0 ){
          console.log('ssss')
          this.setData({
              scrollDown: false
          })
      }else{
          this.setData({
              scrollDown: true
          })
      }
  }
})