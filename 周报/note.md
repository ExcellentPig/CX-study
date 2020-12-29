1. vue实现复制粘贴功能

   1. 安装依赖  npm install --save vue-clipboard2

   2. 使用

      1. 在vue-cli中

         ```
         import Vue from 'vue'
         import VueClipboard from 'vue-clipboard2'
         Vue.use(VueClipboard)
         ```

      2. 常规用法

         ```
         <script src="vue.min.js"></script>
         <!-- 必须在vue.js之后放置这一行 -->
         <script src="vue-clipboard.min.js"></script>
         ```

      3. Demo中使用

         ```
         <template>
           <div class="wxsmallcode-page publicCon">
             <div class="copyBox">
               sysAppId：<span>{{sysAppIds}}</span>
               <el-button class="ml10" type="text" size="medium"
                 v-clipboard:copy="sysAppIds"
                 v-clipboard:success="onCopy"
                 v-clipboard:error="onError">点击复制</el-button>
             </div>
         </template>
         
         <script>
         export default {
           data(){
             return {
               sysAppIds: 'xxxxxxxxxxxsx'
             }
           },
           methods: {
             // 复制成功
             onCopy(e){
               console.log(e);
             },
             // 复制失败
             onError(e){
               alert("失败");
             },
           }
         }
         </script>
         ```

2. tinymce
   1. TinyMCE 是一个采用 JavaScript 编写的、轻量级的、基于浏览器的、所见即所得编辑器
   2. [教程](https://blog.csdn.net/shiyanfangye/article/details/81911176)
   
3. vue-element-admin

   1. [vue-element-admin](http://panjiachen.github.io/vue-element-admin) 是一个后台前端解决方案，它基于 [vue](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element)实现。它使用了最新的前端技术栈，内置了 i18 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。
   2. [文档](https://panjiachen.github.io/vue-element-admin-site/zh/guide/#%E5%8A%9F%E8%83%BD)

4. HTTP调用接口的方法

   1. GET  查询数据
   2. POST 创建、提交数据
   3. PUT 专注于update操作
   4. DELETE 删除操作
   5. [blog1](https://blog.csdn.net/T_james/article/details/80322414)
   6. [blog2](https://www.cnblogs.com/shy1766IT/p/5522182.html)

5. UI设计和原型设计的区别

   1. UI设计

      泛指用户的操作界面，包含移动APP，网页，智能穿戴设备等。UI设计主要指界面的样式，美观程度。而使用上，对软件的人机交互、操作逻辑、界面美观的整体设计则是同样重要的另一个门道。好的UI不仅是让软件变得有个性有品味，还要让软件的操作变得舒适、简单、自由，充分体现软件的定位和特点。

   2. 原型图

      原型图的产品最初的构想图，一般是产品经理绘制，内容比较粗糙；设计效果图，一般是由设计师出图，根据产品经理的原型图，进行设计后的很形象、美观的图‘；框架结构图，指的是整个软件的架构。

   3. UI即视觉：是根据原型设计的包装，美化，使原型更完整的出现在大众的眼前。
      原型图：是包括交互、线框在内的产品雏形。
   
6. mixins理解

   1. 组件在引用之后相当于在父组件内开辟了一块单独的空间，来根据父组件props过来的值进行相应的操作，但本质上两者还是泾渭分明，相对独立。

   2. 而mixins则是在引入组件之后，则是将组件内部的内容如data等方法、method等属性与父组件相应内容进行合并。相当于在引入后，父组件的各种属性方法都被扩充了。

   3. ```
      let mixin={
          data(){
              return{
                  msg:1
              }
          },
          methods:{
              foo(){
                  console.log('hello from mixin!----'+this.msg++)
              }
          }
      }
      var child=Vue.component('child',{ 
              template:`<h1 @click="foo">child component</h1>`, 
              mixins:[mixin]
      })
      Vue.component('kid',{ 
              template:`<h1 @click="foo">kid component</h1>`, 
              mixins:[mixin]
      })
      ```

   4. 在借助mixins之前，在两个不同的组件的组件中调用foo方法，需要重复定义，倘若方法比较复杂，代码将更加冗余。若借助mixins，则变得十分简单

7. Vuex中的namespaced使用

   1. ```
      export default {
        namespaced: true,//namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
        state,
        mutations,
        actions
      }
      
      使用模块中的mutations、getters、actions时候，要加上模块名，例如使用commint执行mutations时
      格式：模块名/模块中的mutations
      xxx/setUserInfo
      this.$store.commit(“userInfo/setUserInfo”,userInfo)
      
      获取属性时同样加上模块名
      格式：store.state.模块名.模块属性
      $store.state.userInfo.userName
      ```

8. Vuex中的dispatch和commit

   1. dispatch含有异步操作

   2. ```
      存储：
      this.$store.dispatch('initUserInfo',friend);
      
      取值：
      this.$store.getters.userInfo;
      ```

   3. commit同步操作

   4. ```
      存储：
      this.$store.commit('initUserInfo',friend);
      
      取值：
      this.$store.state.userInfo;
      ```

9. Vue.config.prodictionTip = false 防止启动生产消息(log)

10. vuex中的mapState、mapMutaions、mapActions

   1. mapState

      1. 当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性。

      2. ```
         
         // 在单独构建的版本中辅助函数为 Vuex.mapState
         import { mapState } from 'vuex'
          
         export default {
           // ...
           computed: mapState({
             // 箭头函数可使代码更简练，es6的箭头函数，传入参数是state，返回值是state.count。然后把返回值映射给count，此时调用this.count就是store里的count值
             count: state => state.count,
          
             // 传字符串参数 'count' 等同于 `state => state.count`
             countAlias: 'count',
          
             // 为了能够使用 `this` 获取局部状态，必须使用常规函数
             countPlusLocalState (state) {
               return state.count + this.localCount
             }
           })
           
           mapState 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。但是自从有了对象展开运算符（现处于 ECMASCript 提案 stage-4 阶段），我们可以极大地简化写法：
          
         
         computed: {
           localComputed () { /* ... */ },
           // 使用对象展开运算符将此对象混入到外部对象中
           ...mapState({
             // ...
           })
         }
         
         ```

      3. mapMutations和mapActions

         1. mapMutations/mapActions只是把mutation/action函数绑定到methods里面，调里面的方法时正常传参数。

            注意：映射都是映射到当前对象，使用时需要用this来调用。

         2. ```
            ...mapMutations([
            'xxx',
            'xxx'  //映射为 this.$store.commit('xxx')
            ])
            
            ...mapActions({
            'xxx': 'xxx/xxx' //映射为this.$store.dispatch('xxx')
            })
            
            ```

11. this.$nextTick()

    1. ```
       $nextTick
       　　Vue.nectTick() 是在下次DOM更新循环结束之后执行延迟回调，在修改数据之后使用$nextTick，则可以在回调中获取更新后的DOM（dom的改变是发生在nextTick()之后），这个方法作用是当数据被修改后使用这个方法，会回调获取更新后的dom再render出来
       
       　　Vue.nextTick()作用：在下次dom更新循环结束之后，执行延迟回调。在修改数据之后立即使用这个方法，获得更新后的dom
       
        
       
       在以下两个情况下需要用到Vue.nextTick()
       1、Vue声明周期的created() 钩子函数进行的DOM操作一定要放在Vue.nextTick() 的回调函数中，因为created() 执行的时候DOM实际上并未进行任何渲染，此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。
       
       　　与之对应的就是mounted 钩子函数，因为该函数执行时所有的DOM挂载和渲染都已完成，此时再钩子函数中进行任何DOM操作都不会有问题。
       
       2、在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作应该放进Vue.nextTick() 的回调函数中
       
        
       
       简而言之，如果你在数据改变之后的操作跟改变之后的DOM有关，那么就应该使用Vue.nextTick()
       ```

12. ```
    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
      .login-container .el-input input {
        color: $cursor;
      }
    }
    上面这段代码主要解决光标颜色和文字颜色一致
     
    @supports可以判断当前浏览器是否支持css3的属性 支持（与 and， 或 or ，非 not）
    
    ```

13. window.close() 用于关闭浏览器窗口

14. ElementUI 日期选择器时间选择范围限制

    1. ```
       
       # 组件代码
       <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0">
       </el-date-picker>
       
       #1 设置选择今天以及今天之后的日期
       data (){
          return {
              pickerOptions0: {
                 disabledDate(time) {
                   return time.getTime() < Date.now() - 8.64e7;
                 }
               },  
          }     
       } 
       
       #2 设置选择今天以及今天以前的日期
       data (){
          return {
              pickerOptions0: {
                 disabledDate(time) {
                   return time.getTime() > Date.now() - 8.64e6
                 }
               },  
          }     
       }
       
       #3 设置选择今天之后的日期(不能选择当天时间)
       data (){
          return {
              pickerOptions0: {
                 disabledDate(time) {
                   return time.getTime() < Date.now();
                 }
               },  
          }     
       }
       
       #4 设置选择今天之前的日期(不能选择当天)
       data (){
          return {
              pickerOptions0: {
                 disabledDate(time) {
                   return time.getTime() > Date.now();
                 }
               },  
          }     
       }
       
       #5 设置选择三个月之前到今天的日期
       data (){
          return {
              pickerOptions0: {
                 disabledDate(time) {
                   let curDate = (new Date()).getTime();
                   let three = 90 * 24 * 3600 * 1000;
                   let threeMonths = curDate - three;
                   return time.getTime() > Date.now() || time.getTime() < threeMonths;;
                 }
               },  
          }     
       }
       
       ```

    2. ```
       # 两个组件
       <el-date-picker
              v-model="value1"
              type="date"
              placeholder="开始日期"
              :picker-options="pickerOptions0">
       </el-date-picker>
       <el-date-picker
              v-model="value2"
              type="date"
              placeholder="结束日期"
              :picker-options="pickerOptions1">
       </el-date-picker>
       
       #1 限制结束日期不能大于开始日期
       data(){
           return {
                pickerOptions0: {
                       disabledDate: (time) => {
                           if (this.value2 != "") {
                               return time.getTime() > Date.now() || time.getTime() > this.value2;
                           } else {
                               return time.getTime() > Date.now();
                           }
       
                       }
                   },
                   pickerOptions1: {
                       disabledDate: (time) => {
                           return time.getTime() < this.value1 || time.getTime() > Date.now();
                       }
                   },
           }      
       }
       ```

16. vue-cli3.0环境变量与模式

    1. [blog](https://segmentfault.com/a/1190000015133974)

17. [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

### 2020-10-20

1. window.location

   1. window.location.href 当前URL  http://www.xxx.xxx:8000/test?id=123&username=xxx
   2. window.location.protocol 协议  http
   3. window.location.host 域名+端口  www.xxx.com:7000
   4. window.location.hostname 域名  www.myurl.com
   5. window.location.prot 端口  3000
   6. window.location.pathname 路径部分  /test
   7. window.location.search 请求参数  ?id=123&name=xxx
   8. window.location.origin ?前面的URL http://www.xxx.com:8000
   9. window.location.hash #后面的部分  #book

2. [document.referrer](https://www.jianshu.com/p/2137a778dffe)

3. host、referer、origin的区别

   1. host是说用户请求的时候输入的网址
   2. referer和origin相似，都是说从哪个网站的链接链入，referer一般用于统计和阻止盗链，origin用于CORS请求。
   3. [blog](https://juejin.im/post/6844903954455724045)

4. ```
   win.addEventListener("pageshow", function(e) { //pageshow页面显示时触发  pagehide 隐藏时触发
       if (e.persisted) { // 浏览器后退的时候重新计算
      	 clearTimeout(tid);
      	 tid = setTimeout(refreshRem, 300);
       }
   }, false); // false 冒泡  true捕获 默认true
   ```

5. ```
   min-height:calc( 100vh - 64px )
   calc计算 本身的100% 减去64px
   ```

6. doucment.readyState

   1. uninitialized 还未开始载入
   2. loading 载入中
   3. interactive 已加载，文档与用户可以开始交互
   4. complete 载入完成

7. 区别于ajax中的 xhr.readyState 

   1.  0-未初始化-还没调用send()方法
   2.  1-载入-已调用send()方法，正在发送请求
   3.  2-载入完成-send()方法执行完毕，已接收全部响应内容
   4.  3-交互-正在解析响应内容
   5.  4-完成-响应内容解析完成，可以在客户端调用

8. Element.getBoundingClientRect() 返回元素的大小及其对于视口的位置

   1. 标准盒子模型  元素尺寸等于width/height+padding+border-width总和
   2. 怪异盒子模型(box-sizing: border-box)，元素的尺寸等于width/height

9. [async 和 defer](https://segmentfault.com/a/1190000019506857?utm_source=tag-newest)

10. mousewheel事件

    1. ```
       当用户通过鼠标滚轮与页面交互、在垂直方向上滚动页面时，就会触发mousewheel事件，这个事件就是实现全屏切换效果需要用到的。在IE6, IE7, IE8, Opera 10+, Safari 5+中，都提供了 “mousewheel” 事件，而 Firefox 3.5+ 中提供了一个等同的事件：”DOMMouseScroll”。与mousewheel事件对应的event对象中我们还会用到另一个特殊属性—wheelDelta属性。
       
       “mousewheel” 事件中的 “event.wheelDelta” 属性值：返回的值，如果是正值说明滚轮是向上滚动，如果是负值说明滚轮是向下滚动；返回的值，均为 120 的倍数，即：幅度大小 = 返回的值 / 120。
       “DOMMouseScroll” 事件中的 “event.detail” 属性值：返回的值，如果是负值说明滚轮是向上滚动（与 “event.wheelDelta” 正好相反），如果是正值说明滚轮是向下滚动；返回的值，均为 3 的倍数，即：幅度大小 = 返回的值 / 3。
       ```

    2. vue在组件标签上写  @wheel.native.prevent

11. [el-scrollbar](https://www.jianshu.com/p/65089f044a3d)

12. CSS加号选择器(+)，就是找到某元素的某类的元素除第一个元素以外的兄弟元素起作用，即第一个元素不起作用，后面的兄弟元素会起作用。

13. [常用正则表达式](https://blog.csdn.net/weixin_30917213/article/details/96107335)

14. JS转换为数组

    1. ```
       // 1
       var args = Array.prototype.slice.call(arguments)
       
       // 2
       var args = [].slice.call(arguments)
       
       // 3
       function toArray() {
       	var args = [];
       	for(var i=1;i<arguments.length;i++){
       		args.push(arguments[i])
       	}
       	return args;
       }
       ```

15. [CSS3 transition-timing-function](https://www.runoob.com/cssref/css3-pr-transition-timing-function.html) 

17. ```
    starsWidth 和 endsWidth ie不兼容方案
    
    //startsWidth
    if (typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function (prefix){
      return this.slice(0, prefix.length) === prefix;
      };
    }
    //正则
    String.prototype.startsWith=function(str){  
      var reg=new RegExp("^"+str);  
      return reg.test(this);  
    } 
     
    //endsWidth
    if (typeof String.prototype.endsWith != 'function') {
     String.prototype.endsWith = function(suffix) {
     return this.indexOf(suffix, this.length - suffix.length) !== -1;
     };
    }
    //正则
     String.prototype.endsWith=function(str){  
      var reg=new RegExp(str+"$");  
      return reg.test(this);  
    } 
    ```


### 2020-10-21

1. vue-draggable 学习和使用

   1. 作用

      1. 在项目中总会遇见一些需要排序的数据 ， 我们可以通过vue.draggable 进行拖动排序 。
      2. Draggable为基于Sortable.js的vue组件，用以实现拖拽功能。
      3. 拖顶的数据和data里的数据为双向绑定 ，在界面变的时候data中的数据也在跟着变化。

   2. 安装

      1. npm i -S vuedraggable

   3. 使用

      ```
      #页面引入
      import draggable from "vuedraggable"
      
      # 定义组件
      components: {
           draggable
        },
      ```

      ```
      # 页面使用
        <draggable
                  class="syllable_ul"
                  element="ul"
                  :list="syllable"
                  :options="{group:'title', animation:150}"
                  :no-transition-on-drag="true"
                  @change="change"
                  @start="start"
                  @end="end"
                  :move="move"
                >
                  <transition-group type="transition"  :name="!drag? 'syll_li' : null" :css="true">
                    <li v-for="(item , idx) in syllable" :key="idx">{{item.title}}</li>
                  </transition-group>
                </draggable>
                
      # 事件
       //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
          change(evt) {
            console.log(evt , 'change...')
          },
          //start ,end ,add,update, sort, remove 得到的都差不多
          start(evt) {
            this.drag = true
            console.log(evt , 'start...')
          },
          end(evt) {
            console.log(evt , 'end....')
            this.drag = true
            evt.item //可以知道拖动的本身
            evt.to    // 可以知道拖动的目标列表
            evt.from  // 可以知道之前的列表
            evt.oldIndex  // 可以知道拖动前的位置
            evt.newIndex  // 可以知道拖动后的位置
          },
          move(evt, originalEvent) {
            console.log(evt , 'move')
            console.log(originalEvent) //鼠标位置
          }
      
      ```

      

   4. 属性和方法说明

      1. draggable的属性：

         | 参数    | 说明                                                         | 可选值        | 默认值 |
         | ------- | ------------------------------------------------------------ | ------------- | ------ |
         | value   | 用于实现拖拽的list，通常和内部v-for循环的数组为同一数组      | Array，非必须 | null   |
         | list    | 就是value的替代品。从表现上没有看出不同                      | Array，非必须 | null   |
         | element | <draggable>标签在渲染后展现出来的标签类型 ,`可以用来兼容UI组件` | String，      | div    |
         | options | 配置项对象  `下面有详细解释`                                 | Object        |        |



2. [输入URL后发生了什么](https://www.pianshen.com/article/85231658730/)

3. 常用状态码

   1. 分类
      1. 1xx-Informational(信息性状态码)-接受的请求正在处理
      2. 2xx-Success(成功状态码)-请求正常处理完毕
      3. 3xx-Redirection(重定向)-需要进行附加操作以完成请求
      4. 4xx-Client error(客户端错误)-客户端请求出错，服务器无法处理请求
      5. 5xx-Server Error(服务器出错)-服务器处理请求出错
   2. 常见状态码
      1. 200-OK-表示从客户端发送给服务器的请求被正常处理并返回
      2. 204-Not Content 没有资源可以返回
      3. 206-Partial Conent 服务器已经成功处理了部分 GET 请求。
      4. 301-Moved Permanently 永久性转移
      5. 302-Moved Temporarily 暂时性转移
      6. 304-Not Modified 从缓存中读取
      7. 400-Bad Request请求有误，当前请求无法被服务器理解
      8. 401-Unauthorized 当前请求需要用户验增
      9. 403-Forbidden 服务器已经理解请求，但是拒绝执行它
      10. 404-Not Found 请求的资源没有被找到
      11. 500-Interval Server Error 服务器内部错误
      12. 502-Bad GateWay 网关错误
      13. 503-Server Unavailable 由于临时的服务器维护或者过载，服务器当前无法处理请求
      14. 504-Gateway Timeout 作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器（URI标识出的服务器，例如HTTP、FTP、LDAP）或者辅助服务器（例如DNS）收到响应

4. HTML访问图片资源403问题(http referrer)

   1. ```
      # 解决办法  在head中添加
      <meta name="referrer" content="no-referrer" />
      ```

   2. [blog](https://www.jianshu.com/p/56df73d0d128)

   3. [Referrer Policy](https://blog.csdn.net/heresin/article/details/79813499)

5. ```
   #使用好多粉加粉统计系统 插件
   <script type="text/javascript" src="//res.hduofen.cn/js/zaaxstat.js?id=NudUxLyb"></script>
   ```


### 2020-10-22

1. [_hmt 百度统计](https://blog.csdn.net/u012982629/article/details/80463583)

2. font-size

   1. vm-视窗宽度的百分比(1vm 代表视窗的宽度为1%)
   2. vh-视窗高度的百分比
   3. vmin-当前vw和vh中较小的一个值
   4. vmax-当前vm和vh中较大的一个值
   5. [blog](https://blog.csdn.net/zhangchen124/article/details/87710579)
   6. px、em、rem
      1. px是固定像素，一旦设置了就没法适应页面大小而改变
      2. em和rem相对于px更具有灵活性，他们呢是相对长度单位，意思是长度不是定死了的，更适用于响应式布局
      3. em相对于父元素来设置字体大小
      4. rem相对于根元素来设置字体大小
      5. [blog](https://www.cnblogs.com/webdragon/p/11185979.html)

3. text-align

   1. left 把文本排列到左边。默认值：由浏览器决定
   2. right: 把文本排列到右边
   3. center: 把文本排列到中间
   4. justify：实现两端对齐文本效果
   5. inherit: 规定应该从父元素继承 text-align属性的值

4. flex布局

   1. display: flex; 可以简便、完整、响应式地实现各种页面布局。
   2. flex-Flexible Box 弹性布局，设置flex布局后，子元素的float、clear和vertical-align属性将失效
   3. 属性
      1. flex-direction 容器内元素的排列方向(默认横向排列)
         1. flex-direction: row; 沿水平轴让元素从左向右排列
         2. flex-direction: column; 让元素沿垂直主轴从上到下垂直排列
         3. flex-direction: row-reverse; 然水平轴让元素从右向左排列
      2. flex-wrap 容器内元素换行(默认不换行)
         1. flex-wrap: nowrap; 不换行
         2. flex-wrap: wrap; 元素换行
      3. justify-content 元素在主轴(页面)上排列
         1. justify-content: center; 元素在主轴(页面)上居中排列
         2. justify-content: flex-start; 元素在主轴(页面)上由左或者上开始排列
         3. justify-content: flex-end; 元素在主轴(页面)上由右或者下开始排列
         4. justify-content: space-between; 元素在主轴(页面)上左右或者上下两端开始排列
         5. justify-content: space-around; 每个元素两侧的间隔相等。元素之间的间隔比元素与边框的间隔大一倍
      4. align-items 元素在主轴(页面)当前行的横轴(纵轴)方向的对其方式
         1. aligin-items: flex-start; 弹性盒子元素的侧轴(纵轴)起始位置的边界紧靠住改行的侧轴起始边界（靠上对齐）
         2. align-items: flex-end; lex-end; 弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界。（靠下对齐）
         3. align-items: center; 弹性盒子元素在该行的侧轴(纵轴)上居中放置(居中对齐)
         4. align-items: baseline; 如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐。（靠上对齐）
      5. align-content 在弹性容器内的元素没有占用交叉轴上所有可用的空间时对齐容器内的各项（垂直）
         1. align-content: flex-start; 元素位于容器的开头。各行向弹性盒容器的起始位置堆叠
         2. align-content: flex-end; 元素位于容器的结尾。各行向弹性盒容器的结尾位置堆叠
         3. align-content: stretch; 元素位于容器的中心。各行向弹性盒容器的中间位置堆叠
         4. align-content: center; 默认值。元素被拉伸以适应容器。各行将会伸展以占用剩余的空间。如果剩余的空间是负数，该值等效于'flex-start'。
         5. align-conent: space-between; 元素位于各行之间留有空白的容器内。各行在弹性盒容器中平均分布。
         6. align-content: space-around;元素位于各行之前、之间、之后都留有空白的容器内。各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。如果剩余的空间是负数或弹性盒容器中只有一行，该值等效于'center'。
      6. [blog](https://www.jianshu.com/p/d9373a86b748/)

5. html5页面ClipboardJS实现点击复制功能

   1. [blog](Just because you can doesn't mean you should �� clipboard.js)

6. v-cloak

   1. 当网络较慢，页面还在加载Vue.js，从而导致Vue来不及渲染，这时页面就会显示出Vue源代码。我们可以使用v-cloak指令来解决这一问题

   2. ```
      <style>
       [v-cloak]{
       	display: none;
       }
      </style>
      
      <div id="app" v-cloak>
      	{{ context }}
      </div>
      ```

7. text-overflow 属性规定当文本溢出包含元素时发生的事情

   1. clip 修剪文本
   2. ellipsis 显示省略符号来代表修剪的文本
   3. string 使用给定的字符串来代表被修剪的文本

8. 移动端浏览器触摸事件

   1. | 事件名称    | 描述                                     | 是否包含 touches 数组 |
      | ----------- | ---------------------------------------- | --------------------- |
      | touchstart  | 触摸开始，多点触控，后面的手指同样会触发 | 是                    |
      | touchmove   | 接触点改变，滑动时                       | 是                    |
      | touchend    | 触摸结束，手指离开屏幕时                 | 是                    |
      | touchcancel | 触摸被取消，当系统停止跟踪触摸的时候触发 | 否                    |

   2. [blog](https://blog.csdn.net/wangmx1993328/article/details/83270166)


### 2020-10-26 +

1. 设计模式

   1. [blog](https://www.jianshu.com/p/4f3014fb8b8b)

   2. 单例模式

      1. 思想是确保一个类只有唯一实例，一般用于全局缓存，比如全局window，唯一登录浮窗等，采用闭包的方式如下

         ```
         var single = (function(){
         	let instance;
         	function getInstance(){
         		//如果该实例存在，则直接返回，否则就对其实例化
         		if(instance === undefined){
         			instance = new Construct();
         		}
         		return instance;
         	}
         	function Construct(){
         		//... 生成单例的构造函数代码
         	}
         	return {
         		getInstance: getInstance
         	}
         })();
         ```

      2. 工厂模式

         1. 常用的设计模式，为了不暴露创建对象的具体逻辑，将逻辑封装在一个函数中，这个函数就被称为一个工厂。本质上是一个负责生产对象实例的工厂。工厂模式根据抽象的不同可以分为：简单工厂，工厂方法和抽象工厂。通常用于根据权限生产角色的场景，抽象工厂的实现如下

            ```
            //安全模式创建的工厂方法函数
            let UserFactory = function(role){
            	if(this instanceof UserFactory) {
            		var s = new this[role]();
            		return s;
            	}else {
            		return new UserFatory(role);
            	}
            }
            //工厂方法函数的原型中设置所有对象的构造函数
            UserFactory.prototype = {
            	SuperAdmin: function() {
                this.name = "超级管理员",
                this.viewPage = ['首页', '通讯录', '发现页', '应用数据', '权限管理']
              },
              Admin: function() {
                this.name = "管理员",
                this.viewPage = ['首页', '通讯录', '发现页', '应用数据']
              },
              NormalUser: function() {
                this.name = '普通用户',
                this.viewPage = ['首页', '通讯录', '发现页']
              }
            }
            //调用
            let superAdmin = UserFactory('SuperAdmin');
            let admin = UserFactory('Admin');
            let normalUser = UserFactory('NormalUser');
            ```

      3.策略模式

       1. 策略模式的本意是将算法的使用与算法的实现分离开来，避免多重判断调用那些算法。适用于有多个判断分支的场景，如解决表单验证的问题。

          ```
          //对于VIP客户
          function vipPrice() {
          	this.discount = 0.5;
          }
          vipPrice.prototype.getPrice = function(price) {
          	return price * this.discount;
          }
          //对于老客户
          function oldPrice() {
          	this.discount = 0.3;
          }
          oldPrice.prototype.getPrice = function(price) {
          	return price * this.discount;
          }
          //对于普通用户
          function Price() {
          	this.discount = 1;
          }
          Price.prototype.getPrice = function(price) {
          	return price;
          }
          //上下文，对于客户端使用
          functon Context() {
          	this.name = name;
          	this.strategy = null;
          	this.price = 0;
          }
          Context.prototype.set = function(name,strategy,price) {
          	this.name = name;
          	this.strategy = strategy;
          	this.price = price;
          }
          Context.prototype.getResult = function() {
          	console.log(`${this.name}的结账价为: `+this.strategy.getPrice(this.price))
          }
          var context = new Context();
          var vip = new vipPrice();
          context.set ('vip客户', vip, 200);
          context.getResult();   // vip客户 的结账价为: 100
          
          var old = new oldPrice();
          context.set ('老客户', old, 200);
          context.getResult();  // 老客户 的结账价为: 60
          
          var Price = new Price();
          context.set ('普通客户', Price, 200);
          context.getResult();  // 普通客户 的结账价为: 200
          ```

      	2. 代理模式

          	1. 代理模式是为其他对象提供一种代理，也就是当其他对象直接访问该对象时，如果开销较大，就可以通过这个代理层控制对该对象的访问。常见的使用场景为懒加载，合并http请求和缓存，实现如下：

          ```
          (funciton() {
          	//目标对象，时真正被代理的对象
          	function Subject(){}
          	Subject.prototype.request = function(){}
          	function Proxy(realSubject) {
          		this.realSubject = realSubject;
          	}
          	Proxy.prototype.request = function() {
          		this.realSubject.request();
          	}
          })();
          ```

      5.观察者模式

      1. 也叫发布订阅模式，在这种模式中，一个订阅者订阅发布者，当一个特定的事件发生的时候，发布者会通知(调用)所有的订阅者。实现代码如下

      ```
      var EventCenter(function() {
      	var events = {};
      	function on(event,handler) {
      		events[event] = events[event] || [];
      		events[event].push({
      			handler: handler
      		})
      	}
      	function fire(event,args) {
      		if(!events[event]){return}
      		for(var i=0;i<events[event].length;i++) {
      			events[event][i].handler(args);
      		}
      	}
      	function off(event) {
      		delete events[event];
      	}
      	return {
      		on: on,
      		fire: fire,
      		off: off
      	}
      })();
      EventCenter.on('event',function(data) {
      	console.log('event received...')
      })
      ```

      6.模块模式

       1. 模块模式可以知道类想暴露的属性和方法，并且不会污染全局。采用闭包的形式，实现如下

      ```
      var Person = (functon() {
      	var name = 'xxx'
      	function sayName() {
      		console.log(name)
      	}
      	return {
      		name: name,
      		sayName: sayName
      	}
      })
      ```

      7. 构造函数模式和混合模式
         1. 构造函数和混合模式就是js中集成的两种实现方式，前者通过构造函数的形式定义类，通过new新增实例，而后者是将构造函数的引用属性和方法放到其原型上，子类是父类原型的一个实例。

2. [理解前端自动化测试TDD+BDD](https://segmentfault.com/a/1190000022503519)

   1. 单元测试

      对某个系统单元进行测试，而这个单元，可以是某个函数，某个组件，对于这种测试形式来说，我们只关注这个独立的单元功能是否正常、测试用例以当前单元内的功能作为对象。

   2. 集成测试

      将多个单元集成到一起，进行测试，重点关注各个单元串联起来之后的系统整体功能是否正常。此时的测试用例以多个单元组成的某个独立的系统对象。

   3. TDD：测试驱动开发(Test-Driven Development)

      这种模式中，先编写测试用例，在测试用例的指导下去完善功能，当测试用例编写完并且都通过测试之后，相应的功能也就做完了。TDD的模式适合于对系统代码质量和测试覆盖率有要求的开发主体，比如函数和组件库。但通常在代码发生变化的时候，测试用例也要进行相应的调整。

   4. BDD：行为驱动开发(Behavior Driven Developmen)

      测试用例模拟用户的操作行为，通常在完成业务代码开发之后，以用户的操作为指导编写测试代码。当测试用例跑

      |      区别项      |                             ATDD                             |                             TDD                              |                             BDD                              |
      | :--------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
      |   参与者和范围   | 业务用户，开发人员，测试人员之间的沟通机制以确保需求得到充分记录 | 开发人员和测试人员之间的开发方法，以创建良好的代码单元(模块，类，功能) |                       ATDD和TDD的组合                        |
      |       重点       | 专注于提取用户验收测试中的要求并用于推动开发。是一种使客户进入设计阶段的技术 |                        一种模式和规范                        | 专注于客户和开发者的系统行为方面，任然是偏向于不断测试的实践来引导客户进入测试阶段，并通过逐步关注其行为进行认证 |
      |     敏捷步骤     |       1、讨论<br />2、开发<br />3、发布<br />不断重复        |       1、测试<br />2、编码<br />3、重构<br />不断重复        | 按预期行为逐步构建功能。他是和TDD和编写使功能、行为失败的测试的延伸 |
      |     输入文档     | 验收标准+示例(数据和方案)=验收测试需求文档将作为开发和测试的基础 |                           需求文档                           |        用GWT格式书写的实例化文档，有时也需要验收标准         |
      |    自动化要求    |               不是必须，但是可在回顾测试时实现               |                             必须                             |                             必须                             |
      | 故事特性测试地图 |                 每个故事都应对应一个验收测试                 |                  每个功能都需要对应一个测试                  |                 每个故事都应对应一个行为测试                 |
      |     主流工具     |          .Robot Franework<br />.FitNesse<br />.FIT           |                       Xunit framework                        |     Cucumber,JBehave,Concordian,lettuce,Robot Framework      |
      |     最终用户     |                             客户                             |                      开发人员、测试人员                      |                         客户和开发者                         |

      通之后，就可以认为系统的整体流程已经流畅了。BDD模式使用平时的业务代码开发，因为业务的需求有可能更频繁，但操作流程有可能不会变化，当业务代码发生变化的时候，可以使用原来的测试用例继续跑代码，节省了开发时间。

   5. TDD和BDD相结合，TDD负责方法类、独立组件的测试。BDD则负责整体业务模块的测试。

   6. ATDD：验收测试驱动开发(Acceptance Test Driven Development)

      这是一种在编码开始之前将客户带入测试设计过程的技术。他也是一个协作实践、用户、测试人员和开发人员定义了自动化验收标准。ATDD有助于确保所有项目成员准确理解需要完成和实施的内容。如果系统未通过测试课提供快速反馈，说明未满足要求。验收测试已业务领域术语进行指定，每个功能都必须提供真实且可衡量的业务价值，事实上，如果你的功能没有追溯至至少一个任务目标，那么你应该想知道为什么你首先实施他。

   7. ATDD、TDD、BDD的区别

      

   8. 名词

      1. jest

         facebook的测试框架，与react打配合会更加得心应手一些

      2. mocha

         强大的测试框架，中文名叫抹茶，常见的describe，beforeEach就来自这里

      3. karma 

         不是测试框架，也不是断言库，可以做到抹平浏览器障碍式的生成测试结果

      4. Chai 

         BDD/TDD断言库，assert,expect,should比较有趣

      5. sinon

         js,mock测试框架，everything is fake，spy比较有趣

      6. Jsmine 

         Js BDD测试框架

      7. vue/test-utils

         专门为测试单文件组件而开发，学会使用vue-test-utils，将会对vue的理解上更上一层楼。

3. 前端自动化测试基础

   1. ![image-20201028103520398](/Users/admin/Library/Application Support/typora-user-images/image-20201028103520398.png)
   2. [技术胖博客](https://jspang.com/)
   3. 好的前端工程化一般包括三个大的方面
      1. 前端自动化测试(前提条件)
      2. 高质量的代码设计
      3. 高质量的代码实现
   4. Jest基础知识
      1. 主流框架
         1. Jasmine
         2. MOCHA
         3. Jest
      2. Jest优点
         1. 比较新
         2. 基础好
         3. 速度快
         4. API简单
         5. 隔离性好
         6. IDE整合  vscode
         7. 多项目运行
         8. 覆盖率
      3. Jest环境搭建
         1. npm init -y 初始化package.json
         2. npm i jest@24.8.0 -D 安装Jest  安装到devDependencies  在开发环境中使用
      4. Package.json  中  "test": "jest"
      5. 运行  npm run test  / yarn test
      6. 输出会有详细的提示 ， 一般有错是修改源代码  不修改测试代码
      7. 单元测试—unit testing 看上面
      8. 集成测试—看上面
      9. Jest初始化配置
         1. npx jest  --init  生成jest.config.js
         2. coverageDirectory: "coverage", 代码覆盖率  第二个选项  "coverage"可以修改即文件名
         3. clearMocks: true, 清除默认配置  第三个选项
         4. browser: false,  运行环境 第一个选项
      10. 代码覆盖率
          1. npx jest --coverage  终端生成报告  同时会生成文件
          2. "coverage": "jest --coverage" 这样就可以使用 npm run coverage/yarn coverage 可以替代npx(npx 就是会自动去配置)
      11. 匹配器
          1. toBe 绝对相等 === 
          2. toEqual 相当于 == 
          3. toBeNull  匹配null
          4. toBeUndefined 匹配undefined
          5. toBeDefined 匹配定义
          6. toBeTruthy 匹配true
          7. toBeFalsy 匹配false
          8. "test": "jest --watchAll", 自动测试
          9. toBeGreaterThan  大于
          10. toBeLessThan 小于
          11. toBeGreaterThanOrEqual 大于等于
          12. toBeLessThanOrEqual 小于等于
          13. toBeCloseTo 浮点错误相关
          14. toMatch 匹配字符串
          15. toContain 匹配数组 Set
          16. toThrow 匹配异常
          17. .not 取反
          18. .only 执行当前的 调试的时候用
      12. Jest 配置ES6 支持
          1. yarn add @babel/core@7.4.5 @babel/preset-env@7.4.5 --dev
          2. .babelrc配置
      13. 异步代码测试方法
      14. Jest四个钩子函数
          1. beforeAll  所有测试用例之前执行
          2. afterAll 所有测试用例完成之后执行
          3. beforeEach 在每一个测试用例之前执行
          4. afterEach 每个测试用例完成之后执行
          5. 特色
             1. 钩子函数在父级分组课作用于子集，类似于继承
             2. 钩子函数同级分组作用于互不干扰，各起作用
             3. 先执行外部的钩子函数，再执行内部的钩子函数
      15. describe 分组

4. 常用设计模式

   1. 什么是面向对象
      1. 以类和对象作为组织代码的基本单位，并实现封装、抽象、继承、多态四个特性
         1. 抽象
            1. 抽象主要是隐藏方法的实现，让调用者只关心有哪些功能而不是关心功能的实现
            2. 抽象可以提高代码的可扩展性和维护性，修改实现不需要改变定义，可以较少代码的改动范围
         2. 继承
            1. 继承主要的用处是实现代码的复用
            2. 继承可以把父类的公共方法抽离出来，提高复用，较少冗余
            3. 是一种is-a的关系
            4. 过度继承也有坏处
         3. 封装
            1. 把数据封装起来
            2. 较少耦合，不该外部访问的不要让外部访问
            3. 利于数据的接口权限管理
            4. 仅暴露有限的必要接口，提高类的易用性
            5. 实现
               1. public公有修饰符，可以在类或者类外使用public修饰的属性或者行为，默认修饰符
               2. protected受保护的修饰符，可以本类和子类中使用protected修饰符的属性和行为
               3. private私有修饰符，只可以在类内使用private修饰的属性和行为
         4. 多态
            1. 多态是指，子类可以替换父类
            2. 保持子类的开放性和灵活性，可以重写父类中的方法
            3. 实现接口面向对象编程
      2. 软件开发经历分析，设计和编码是哪个阶段
         1. 面向对象分析(OOA) (Object Oriendted Analysis)
         2. 面向对象设计(OOD)(Object Oriendted Design)
         3. 面向对象编程(OOP)(Obejct Oriendted Programming)
      3. 工厂模式
         1. 简单工厂就是函数里返回的实例
         2. 工厂方法：就是把创建产品的工作交由具体工厂类来实现
         3. 抽象工厂模式

## 2020-10-29+

1. Jest的优点

   速度快、API简单、易配置、隔离性好、监控模式、IDE整合、Snapshot、多项目并行、覆盖率、Mock丰富

2. npm run test

   1. "test": "jest"
   2. Jest(babel-jest) 取.babelrc配置
   3. 在运行之前，结合babel,先把你的代码做一次转化
   4. 运行转化后的测试用例代码 

3. ```
    › Press f to run only failed tests.  只跑错误的
    › Press o to only run tests related to changed files.只会测试和改变文件相关的测试用例 结合git 来管理被改变的代码 与--watch / --watchAll有关
    
    › Press p to filter by a filename regex pattern. 使用watchAll 会有  找对应文件的测试用例
    › Press t to filter by a test name regex pattern. 根据测试用例的名字来获取 相应的测试用例
    › Press q to quit watch mode.  退出对代码的监控
    › Press Enter to trigger a test run.
   ```

4. mock函数

   1. let func = jest.fn()
   2. 捕获函数的调用和返回结果以及this调用的顺序
   3. func.mockReturnValue 可以只有设置返回的结果
   4. 改变函数的内部实现
      1. jest.mock('axios')  不会真正去请求数据，模拟axios
      2. axios.get.mockResolvedValue({data: 'hello'}) //模拟请求结果
   5. npm i prettier@1.18.2 --save snapshot 快照行内工具  会直接在代码中体现 而不是单独写在一个文件中

5. ndoe不具备DOM   jest在node环境下自己模拟了一套DOM的API--jsDOM

6. TDD的开发流程-Red-Green-Development

   1. 编写测试用例
   2. 运行测试，测试用例无法通过测试
   3. 编写代码，使测试用例通过测试
   4. 优化代码，完成开发
   5. 重复上述过程

7. TDD的优势

   1. 长期减少回归BUG
   2. 代码质量更好(组织，可维护性)
   3. 测试覆盖率高(高 未必是好事情)
   4. 错误测试代码不容易出现
   
8. [ToDoList](http://www.todolist.cn/)

9. ```
    [vue-test-utils]: finding components with `find` or `get` is deprecated and will be removed in the next major version. Use `findComponent` and `getComponent` instead.
    ```

10. ```
    "collectCoverageFrom": ["**/*.{js,vue}", "!**/node_modules/**"]
    
    "collectCoverageFrom": ["**/*.vue", "!**/node_modules/**"]
    ```

11. TDD和单元测试
    1. TDD代码质量提高
    2. 单元测试 测试覆盖率高、业务耦合度高、代码量大、过于独立
    
12. BDD - Behavior Driven Development 行为驱动开发

     1. 先写代码然后在写测试
     2. TDD和BDD
        1. TDD
           1. 先写测试再写代码
           2. 一般结合单元测试使用，是白盒测试
           3. 测试重点是在代码
           4. 安全感低
           5. 速度快
        2. BDD
           1. 先写代码再写测试
           2. 一般结合集成测试使用，是黑盒测试
           3. 测试重点在UI(DOM)
           4. 安全感高
           5. 速度慢

13. 前端自动化测试的优势

     1. 更好的代码组织，项目可维护性增强
     2. 更小的BUG出现概率，尤其是回归测试中的BUG
     3. 修改工程质量差的项目，更加安全
     4. 项目具备潜在的文档特性
     5. 扩展前端知识面

14. 前端自动化测试的重要知识点

     1. BDD、TDD
     2. 集成测试，单元测试
     3. 测试与业务的解耦
     4. 代码测试覆盖率并不代表一定靠谱
     5. 功能测试及UI测试
     6. 测试越独立，隐藏的问题越多

### 2020-11-03+

1. Vue3.0新增

   1. Performance: 性能比Vue2.x快了1~2倍
   2. Tree shaking support： 按需编译，体积比Vue2.x更小
   3. Composition API: 组合API(类似于React Hooks)
   4. Better TypeScript support: 更好的TS支持
   5. Custom Renderer API: 暴露了自定义渲染API
   6. Fragment Teleport(Protal),Suspense: 更先进的组件

2. Vue3.0 是如何变快的

   1. diff算法优化

      1. Vue2中的虚拟dom是进行全量的对比

      2. Vue3新增了静态标记(PathFlag)

      3. 在于上次虚拟节点进行对比的时候，只对比带有path flag的节点，并且可以通过flag的信息得知当前节点要对比的具体内容

      4. ```
         vue2.xx版本在线编译:https://template-explorer.vuejs.org/#
         
         vue3.xx版本在线编译:https://vue-next-template-explorer.netlify.app/#
         ```

   2. hoistStatic 静态提升

      1. vue2中无论元素是否参与更新，每次都会重新创建
      2. vue3中对于不参与更新的元素，只会被创建一次，之后会在每次渲染的时候被不停的复用

   3. cacheHandlers 事件侦听器缓存

      1. 默认情况下onClick会被视为动态绑定，所以每次都会去追踪它的变化，但是因为是同一个函数，所以没有追踪他的变化，直接缓存起来复用就行了

   4. ssr渲染

      1. 当有大量静态的内容的时候，这些内容会被当做纯字符串推进一个buffer里面，即使存在动态绑定，会通过模板插值嵌入进去，这样会比通过虚拟DOM来渲染的快上很多
      2. 当静态内容大到一定量级的时候，会用_createStaticVNode方法在客户端生成一个status node,这些静态node，会被直接innerHTML,就不需要创建对象，然后根据对象渲染

3. 创建vue3的方式

   1. vue-cli
   2. webpack
   3. Vite

4. 什么是Vite 

   1. 意图取代webpack的工具
   2. 实现原理是利用ES6中的import会发送请求去加载文件的特性，拦截这些请求，做一些编译，省去webpack冗长的打包时间
   3. 安装 npm i -g create-vite-app
   4. vite创建项目
      1. create-vite-app projectName
      2. cd projectName
      3. npm install
      4. npm run dev
   5. Compisition  API(setup)  option API(data)
   6. Compisition API本质(组合API/注入API)
   7. setup执行时机
      1. beforeCreate  表示组件刚刚被创建，组件的data和methods还没有被初始化好
      2. setup
      3. Created 表示组件刚刚被创建出来，并且组件的data和methods已经初始化好
   8. setup注意点
      1. 在执行setup函数的时候还没有执行created生命周期方法，所以在setup中无法使用data和methods
      2. 由于不能再setup中使用data和methods所以vue为了避免我们错误使用，他直接将setup函数中的this修改为undefined
      3. setup函数只能是同步的不能是异步的
   
5. 什么是reactive

   1. reactive是Vue3中提供的实现响应式数据的方法
   2. 在Vue2中响应式数据是通过defineProperty来实现的，而在Vue3中响应式数据是通过ES6的Proxy来实现的
   3. reactive注意点
      1. reactive参数必须是对象(json/arr)
      2. 如果给reactive传递了其他对象
         1. 默认情况下修改对象，界面不会自动更新
         2. 如果想更新，可以通过重新赋值的方式

6. 什么是ref

   1. ref和reactive一样，也是用来实现响应式数据的方法
   2. 由于reactive必须传递一个对象，所以导致在企业开发中如果我们只想让某个变量实现响应式的时候会非常麻烦，所以vue给我们提供了ref方法
   3. ref本质
      1. ref底层的本质其实还是reactive，系统会自动根据我们给ref传入的值将他转换成ref(xx) -> reactive({value: xx})
   4. ref注意点
      1. 在vue中使用ref的值不通过value获取
      2. 在js中使用ref的值必须通过value获取

7. ref和reactive的区别

   1. 如果在template里面使用ref类型的数据，vue会自动添加.value，reactive不会自动添加.value
   2. vue在解析数据之前会自动判断这个数据是否是ref类型的如果是就自动添加.value，反之不添加
   3. vue通过当前数据的__v_ref来判断是否是ref数据类型
   4. isRef,isReactive可以判断是否是_v_ref

8. 递归监听

   1. 默认情况下，无论是通过ref还是reactive都是递归监听
   2. 递归监听存在的问题
      1. 如果数据量比较大，非常消耗性能
   3. 非递归监听
      1. shallowReactive
      2. shallowRef
      3. shallowRef(10) -> shallowReactive({value: 10}) shallowRef是监听.value的变化
      4. 通过shallowRef创建的数据，那么Vue监听的是.value的变化，并不是第一层的变化
      5. triggerRef 根据传入的数据主动去更新界面
      6. Vue3 只提供了triggerRef的方法 没有 triggerReactive 如果是reactive类型的数据，那么是无法主动触发界面更新的
   4. 应用场景
      1. 一般情况下我们使用ref和reactive即可
      2. 只有在需要监听的数据量比较大的时候，我们才使用shallowRef/shallowReactive

9. ref和reactiv的数据类型特点

   1. 每次修改都会更新UI界面，非常消耗性能
   2. 如果有些操作不需要追踪，不需要更新UI界面
   3. toRow拿到原始数据，对原始数据进行修改，可以提高性能

10. 如果通过toRaw拿到ref的原始数据，那么必须明确告诉toRaw方法要获取的是.value的值，因为经过vue处理后，.value中保存的才是当初创建时传入的那个原始数据

11. markRaw 让数据无法被追踪

12. ref和toRef的区别

    1. ref->复制 修改响应式数据不会影响以前的数据
    2. toRef-> 引用 修改响应式数据会影响以前的数据
    3. ref-> 数据发生改变，界面也会自动更新
    4. toRef-> 数据发生改变，界面也不会自动更新
    5. toRef应用场景
       1. 如果想让响应式数据和以前的数据关联起来，并且更新响应式数据之后不想更新UI，可以使用toRef
    6. 如果利用ref将某一个对象的属性变成响应式的数据，修改响应式的数据是不会修改原始数据的
    7. 如果利用toRef将某一个对象中的属性变成响应式数据，我们修改响应式的数据是会影响到原始数据的，但是如果响应式的数据是通过toRef创建的修改了数据并不会触发UI界面的更新

13. toRefs 多个数据

14. customRef

    1. 返回一个ref对象，可以显示地控制以来追踪和触发响应

15. readonly 用于创建一个只读的是数据 ，并且是递归只读

16. shallowReadyonly  用于创建一个只读的数据，但不是递归只读

17. isReadonly 判断是否只读 返回布尔值

18. const 和 readyonly的区别

    1. const 赋值保护，不能重新赋值
    2. readyonly 属性保护，不能重新赋值

### 2020-11-05+

1. [课程组件](http://showcase.vikingship.xyz/)

2. [API](http://api.vikingship.xyz/public/swagger/index.html)

3. [项目](http://zhihu.vikingship.xyz/)

4. [参考文档](http://docs.vikingship.xyz/)

5. 编程语言类型

   1. 动态类型语言  Dynamically Typed Language
   2. 静态类型语言  Statically Typed Language

6. npm install -g ts-node

7. TypeScript

   1. JavaScript that scales 可扩赞的JS
   2. 静态类型风格的类型系统
   3. 支持es6~es10~es@next

8. Interface 接口

   1. 对对象的形状shape进行藐视
   2. Duck Typing(鸭子类型)

9. 类

   1. 类(class)： 定义了一切事物的抽象特点
   2. 对象(Object): 类的实例
   3. 面向对象(OOP)三大特性： 封装、继承、多态

10. TypeScript中的类

    1. public: 修饰的属性或方法是公有的
    2. private: 修饰的属性和方法是私有的
    3. protected: 修饰的属性或方法是受保护的

11. Implements  提高了类的灵活性

12. [TypeSearch](https://www.typescriptlang.org/dt/search?search=)

13. Mapping vue2 -> vue3

    beforeCreate -> use setup()

    Created ->  use setup()

    beforeMount ->  onBeforeMount

    mounted ->  onMounted

    beforeUpdate ->  onBeforeUpdate

    Updated ->  onUpdated

    beforeDestory ->  onBeforeUnmount

    destoryed ->   unmounted

    activated ->  onActivated

    Deactivated ->  onDeactivated

    errorCaptured ->  onErrorCaptured

    // add 

    onRenderTracked

    onRenderTriggered

14. 占位图  http://temp.im/640x640

15. [Dog API](https://dog.ceo/api/breeds/image/random)

16. [Cat API](https://api.thecatapi.com/v1/images/search?limit=1)

17. Tepeport 传送

18. Suspense 异步请求  内置组件 返回一个promise

19. ```
     <Suspense>
    	<template #default>
    		<div>  # 注意要包裹根节点
    			<async-show />
    			<dog-show></dog-show>
    		</div>
    	</template>
    	<template #fallback>
    		<div>
    			<h1>loading !!</h1>
    		</div>
    	</template>
    ```

20. 全局配置： Vue.config -> app.config

    1. config.productionTip 被删除
    2. confog.ignoredElements 改名为 config.isCustomElement
    3. config.keyCodes 被删除

21. 全局注册类API

    1. Vue.component -> app.component
    2. Vue.directive -> app.directive

22. 行为扩赞类

    1. Vue.mixin -> app.mixin
    2. Vue.use -> app.use
    
23. SPA

    1. 一种Web应用程序或网站(单页面)
    2. 在和用户交互的时候当前用户不会跳转到其他页面
    3. 由JS实现URL变换和动态变换HTML的内容
    4. 优点
       1. 速度快
       2. 体验好
       3. 前后端分离
    
24. 全局对象的弊端

    1. 数据不是响应式的
    2. 数据修改无法追踪
    3. 不符合组件开发的原则

25. 状态管理工具的基本原则

    1. 一个类似object的全局数据结构-称之为store
    2. 只能调用一些特殊的方法来实现数据修改
    3. Vuex的特点
       1. 状态储存是响应式的
       2. 不能直接改变store中的状态，唯一途径就是显示地提交(commit) mutation

26. RESTful API

    1. HTTP动词
       1. GET(select): 从服务器取出资源(一下或多项)
       2. POST(create): 在服务器新建一个资源
       3. PUT(update): 在服务器更新资源
       4. PATCH(update): 在服务器更新资源(需要传递全部)
       5. DELETE(delete): 从服务器删除资源(只需传递部分)
    2. 接口文档需要包括的点
       1. Endpoints 具体路径
       2. 使用什么样的method
       3. 发送请求的具体参数
       4. 请求返回数据的格式

27. ```
    <teleport to="#back">  可创建一个单独的空间 放置一些元素  不想放在<div id="app">中s
    ```

28. [JWT](https://www.jianshu.com/p/576dbf44b2ae)

29. [JWTIO](https://jwt.io/)

30. 生产环境和开发环境

    1. 开发环境
       1. 有尽量丰富的信息帮组程序员定位问题
       2. 使用本地的数据或者mock数据
       3. 开发服务器提供各种便利的功能
    2. 生产环境
       1. 尽量消除程序错误和调试信息
       2. 使用线上真实数据
       3. 访问速度是第一要务

31. [Vercel](https://vercel.com/)

### 2020-11-11+

1. 什么是对象

   1. 拥有属性
   2. 拥有行为
   3. 把很多东西，封装成一个整体

2. 面向对象和面向过程

   1. 都是解决问题的思路(思想)
   2. 面向过程
      1. 在解决问题的时候，关注的是解决问题需要的一个接着一个的过程
   3. 面向对象
      1. 在解决问题的时候，关注的是解决问题所需要的对象
      2. 是对面向过程的一个封装

3. 面向对象三大特性

   1. 封装
   2. 继承
   3. 嵌套

4. ``` 
   colorArr[_.random(0, colorArr.length-1)]
   
   _.random() 从第一个下标取到上标
   ```

5. [Underscore](https://underscorejs.net/)
   
6. 闭包

   1. 什么是闭包
      1. 闭包实际上是一种函数，所以闭包技术也是函数技术的一种，闭包能做的事情函数几乎都能做
      2. 当一个嵌套的内部函数引用了嵌套的外部函数的变量(函数)时，就产生了闭包
      3. 闭包是嵌套的函数
      4. 包含被引用变量(函数)的对象
      5. 闭包存在于嵌套的内部函数中
   2. 产生闭包的条件
      1. 函数嵌套
      2. 内部函数引用了外部函数的数据(变量/函数)
   3. 常见的闭包使用形式
      1. 将函数作为另一个函数的返回值
      2. 将函数的形参作为实参传递给另一个函数调用
   4. 闭包的作用
      1. 使用函数内部的变量在函数执行完后，仍然存在内存中(延长了局部变量的生命周期)
      2. 让函数外部可以操作(读写)到函数内部的数据(变量/函数)
      3. 问题
         1. 函数执行完成后，函数内部声明的局部变量是否还存在？
            1. 一般是不存在，存在于闭包中的变量才可能存在
         2. 在函数外部能直接使用函数内部的局部变量吗
            1. 不能，但是我们可以通过闭包让外部操作它
      4. 产生：在嵌套内部函数定义执行完成时就产生了(不是在调用)
      5. 死亡：在嵌套的内部函数成为垃圾对象时
   5. 闭包的缺点
      1. 函数执行完后，函数内的局部变量没有释放，占用时间会变长
      2. 容易照成内存泄漏
      3. 解决 
         1. 及时释放
   6. 内存溢出
      1. 程序运行出现的错误
      2. 当程序运行需要内存超过了剩余的内存时，就抛出内存溢出的错误
   7. 内存泄漏
      1. 占用的内存没有及时释放
      2. 内存泄漏积累多了容易导致内存溢出
      3. 常见的内存泄漏
         1. 占用内存很大的全局变量
         2. 没有及时清理定时器/计时器
         3. 闭包 

7. 实例属性和实例方法 都是绑定在使用构造函数创建出来的对象p上，最终使用的时候也是使用对象p来进行访问

8. 静态属性和静态方法，绑定在函数身上的属性和方法

9. 内置对象类型判断

   1. typeof
   2. toString
   3. xxx.constructor.name
   4. Object.prototype.toString.call(arr)

10. 'name' in p  判断一个对象是否拥有某个属性(如果对象身上没有回到原型对象里面查找)

11. p.hasOwnProperty('name') 只到对象自身查找

12. Person.isPrototypeOf(p)

13. Person.prototype.isPrototypeOf(p) 判断一个对象是否是某个实例的原型对象

14. p instanceof Person 判断一个对象是否在某个构造函数的原型链

15. 原型链检索规则

    1. 对象，属性的方法去访问属性的时候，先查找有没有对象的实例属性，如果有那么直接使用，如果没有，那么就去该对象的原型对象上面去找，如果有那么就直接使用，如果没有那么就接着查找原型对象，如果有，那么就直接使用，如果没有，那么就继续上面的检索过程，知道搜索到Object.prototype为止，如果还是没有就返回undefined或者报错
    2. 注意
       1. 原型链搜索路径越长，查询属性所花费的时间越多
       2. 原则：就近原则

16. 函数的prototype属性

    1. 每个函数都有一个prototype属性，他默认指向一个Object空对象(原型对象)，原型对象中有一个属性constructor，他指向函数对象
    2. 原型对象添加属性(方法)，函数的所有实例对象自动拥有原型中的属性(方法)

17. this

    1. This 总是指向一个对象
    2. 函数的调用方式
       1. 作为对象的方法来调用 this -> 当前对象
       2. 作为普通函数调用  this -> window
       3. 作为构造函数和new使用 this -> 构造函数内部新创建的对象
       4. 被call、apply调用(函数上下文调用) this -> 第一个参数
    
18. 进程--程序的一次执行，它占有一片独立的内存空间

19. 线程-- CUP的基本调查单位，是程序执行的一个完整流程

20. 线程与进程的关系

    1. 一个进程中一般至少有一个运行的线程：主线程
    2. 一个进程中也可以运行多个线程，这时程序就是多线程运行的
    3. 一个进程内的数据可以供其多个线程直接共享
    4. 多个进程之间的数据是不能直接共享的

### 2020-11-12+

1. V-for 中的key
   1. 跟踪每个节点的身份，从而重用和重新排序现有元素
   2. 理想的key值是每项都有的且唯一的id
2. Vue.set(classObj,"C",true)      datalist.splice(0,1,'cccc')
3. @input 输入触发  @change 失去焦点触发--blur
4. [fetch](https://github.com/camsong/fetch-ie8)
5. Ref
   1. ref放到标签上，拿到的是原生节点
   2. ref放在组件上，拿到的是组件对象
6. npm run lint 可以自动修复一些书写错误
7. 路由
   1. 声明式路由
   2. 动态路由
   3. 命名路由
8. v-touch 在npm中学习
9. nuxt
   1. npm i --save vue vue-server-renderer
   2. npm i -g create-nuxt-app
   3. npx create-nuxt-app myapp
   4. 反向代理
      1. npm i -S @nuxtjs/proxy

### 2020-11-27+

1. 可视化的实现方式
   1. 报表类
      1. Excel
      2. 水晶报表
   2. 商业智能BI
      1. Microsoft BI
      2. Power BI
   3. 编码类
      1. ECharts.js
      2. D3.js
   
2. [echarts官网](http://echarts.apache.org/zh/index.html)

3. [vue3 全局配置echarts](https://blog.csdn.net/qq_43574079/article/details/108821061)

4. WebSocket

   1. [w3cschool  socket.io](https://www.w3cschool.cn/socket/socket-odxe2egl.html)

   2. 后端

      1. npm i ws -S
   
      2. ```
         // 创建对象
         const WebSocket = require('ws')
         const wss = new WebSocket.Server({
         	port: 9998
         })
         
         // 监听事件
         //   连接事件
         wss.on('connection', client => {
         	console.log('有客户端连接...')
         })
         //   接收数据事件
         wss.on('connection', client => {
         	client.on('message', msg => {
         	   console.log('客户端发送数据过来了')
         	})
         })
         
         // 发送数据
      client.send('hello socket')
         ```

   3. 前端
   
      1. ```
         # 创建对象
         const ws = new WebSocket('ws://location:9998') // 前端不需要额外的包
         
         # 监听事件
         #   连接成功的事件
         wx.onopen
         
         #   接收数据事件
         wx.onmessage
         
         #   关闭连接事件
         wx.onclose
         
         # 发送数据
      wx.send
         ```
   
      2. 

### 2020-12-11+

1. 云开发

   1. 基础知识

      1. 数据库： 默认情况下，云开发的函数可以使用当前环境对应的数据库，你可以根据需要，使用不同的数据库。对应MySQL中的数据库
      2. 集合：数据库中多个纪录的集合。对应MySQL中的表
      3. 文档：数据库中的一条记录。对应MySQL中的行row
      4. 字段：数据库中特定记录的值。对应MySQL中的列col

   2. 数据库的操作

      1. 增加 add
         1. 上传一条新的数据
         2. 复制一条已有数据
         3. 导入已有数据
      2. 删除 delete
         1. 删除一条数据
         2. 删除多条数据
      3. 查询 query
         1. 查询所有数据
         2. 分页查询所有数据
         3. 瀑布流持续加载数据
         4. 下拉刷新数据
         5. 分类查询数据
      4. 修改 update
         1. 修改具体的数据字段
         2. 数据自增
         3. 数据累乘

   3. [Vant Weapp](https://vant-contrib.gitee.io/vant-weapp/#/intro)

   4. [weapp引入问题](https://blog.csdn.net/weixin_45252975/article/details/105790285)

   5. ```
      ### 添加
      
      小程序端API
      const db = cloud.database()
      const products = db.collection('products')
      products.add({
      	data: { xxx: xx }
      }).then(res => {})
      
      (云函数)服务端API
      const db = cloud.database()
      return await db.collectin('products').add({
      	data: { xxx: xx }
      }).then(res => {
      	return xxx
      })
      ```

   6. ```
      ### 查询
      
      小程序端API
      const db = cloud.database()
      const products = db.collection('products')
      products.get().then(res=> {})
      
      (云函数)服务端API
      const db = cloud.database()
      return await db.collection('products').get().then(res => {
      	return xxx
      })
      ```

   7. ```
      ### .inc(10) 加
      
      小程序端API
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('todos').doc('todo-id').update({
      	data: {
      		progress: _.inc(10)
      	}
      })
      
      (云函数)服务端API
      const db = wx.cloud.database()
      const _ = db.command
      return await db.collection('todos').doc('todo-id').update({
      	data: {
      		progress: _.inc(10)
      	}
      })
      ```

   8. ```
      ### 排序查询
      
      小程序端API
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('todos')
      	.orderBy('progress', 'desc')
      	.orderBy('description', 'asc')
      	.get()
      ```

   9. ```
      ### 计数
      
      小程序端API
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('todos').where({
      	_openid: 'xxx'
      }).count()
      
      (云函数)服务端API
      const db = wx.cloud.database()
      const _ = db.command
      return await db.collection('todos').where({
      	_openid: 'xxx'
      }).count()
      
      ```

   10. ```
       ### 字段查询
       
       小程序端API
       const db = wx.cloud.database()
       const _ = db.command
       db.collection('products').field({
       	description: true,
       	done: true,
       	progress: true
       }).get()
       
       (云函数)服务端API
       const db = wx.cloud.database()
       const _ = db.command
       return await db.collection('products').field({
       	description: true,
       	done: true,
       	progress: true
       }).get()
       ```

   11. ```
       ### 数据更新
       
       小程序端API
       const db = wx.cloud.database()
       const _ = db.command
       db.collection('products').doc('id').update({
       	data: { done: true }
       })
       .then(console.log())
       .catch(console.error())
       
       (云函数)服务端API
       const db = wx.cloud.database()
       const _ = db.command
       return await db.collection('products')
       .doc('id')
       .update({
       	data: { done: true }
       })
       ```

   12. ```
       ### 删除
       
       小程序端API
       const db = wx.cloud.database()
       const _ = db.command
       db.collection('products').doc('id').remove({
       	success: console.log(),
       	fail: console.error()
       })
       
       (云函数)服务端API
       const db = wx.cloud.database()
       const _ = db.command
       return await db.collection('products').doc('id').remove({
       	success: console.log(),
       	fail: console.error()
       })
       ```


### 2020-12-08+

1. [mpvue框架](http://mpvue.com/)
2. mpvue 配置less https://www.jianshu.com/p/466c59b8df26
3. less-loader 安装报错 https://blog.csdn.net/weixin_41582712/article/details/107596814
4. [高德地图](https://lbs.amap.com/api/wx/gettingstarted)
5. 旅梦开发团---B站
6. koa源码实现---B站

### 2020-12-15+

1. 模块化

   1. sea、require(CMD、AMD)
      1. 模块.js  define  require\exports\module
      2. 前台.html  use
   2. node.js
      1. Require\exports\module
      2. node_modules   ./
   3. ES6
      1. export\import
      2. Babel 编译ES6 
      3. Webpack 集成 一站式

2. 数据交互

   1. http协议

      1. 协议？ rfc http(文档)
      2. 无状态的协议
      3. 连接的过程 - 三次握手(连接、接受、发送请求)
      4. 头(header <= 32k 信息) - 体(body < = 1G 数据)
      5. http缓存
         1. 加数据书 ?t=xxxx
         2. Cache-Control   Date   Expries(有效期) 三个头来控制
      6. http 和 https
      7. https 安全 证书
      8. http 是有版本的  http1.0(短链接)/1.1(长连接 keep alive)/2.0...

   2. form

      1. Action 提交到的地址
      2. methods 
         1. GET 把数据放在URL中进行传输  数据量小、缓存、看得见
         2. POST 放在body里   数据量大、不会缓存、更安全、看不见
         3. PUT 发送东西
         4. DELETE  删除
         5. HEAD  让服务器只发送头回来(不需要内容)
      3. name 字段很重要
      4. enctype 字段
         1. application/x-www-form-urlencoded 名字=值&名字=值...    是默认值 适合发送小数据
         2. multipart/form-data  分块   文件上传、大数据
         3. ...

   3. ajax -- 不能跨域  单向

      1. XMLHttpRequest  不兼容IE6

      2. 用户体验好、性能高

      3. xhr.readyState

         0  初始状态  xhr刚刚创建完

         1  连接   连接到服务器

         2  发送请求 刚刚send() 完

         3  接收完成  头接收完

         4  接收完成  体接收完

      4. xhr.status  [http状态码](https://baike.baidu.com/item/HTTP%E7%8A%B6%E6%80%81%E7%A0%81/5053660)

         ​	1xx 消息

         ​	2xx 成功

         ​	3xx 重定向

         ​		301 永久重定向 —— 下次不会请求该服务器了

         ​		302 临时重定向 —— 下次依然会请求服务器

         ​		304  缓存 

         ​	4xx  请求错误 客户端

         ​	5xx  服务器端错误

         ​	6xx+  自定义

      5. xhr.response

      6. xhr.responseText  以文本方式返回数据

      7. xhr.responseURL

      8. xhr.responseXML  以XML数据返回

   4. json 跨域 破坏http安全性 不支持post

   5. Websocket 

      1. 双向
   2. HTML5的
      
      3. 用的很广
   4. socket.io  库   npm install socket.io
      5. websocket 基于 http
      6. sock.emit 发送
      7. sock.on 接收
   8. 
   
6. RESTful
   
      1. 一种习惯
      2. 简化后端接口
   3. 统一
   
   4. method + url —— 区分接口
      
   7. 安全
   
      1. 前台没安全性，后台才有问题(注入)
      2. xss 跨站脚本攻击
   
   8. 沙箱机制 —— 隔离出来的虚假系统
   
   9. decorator —— 装饰者模式  对象生成之后再给对象加东西
   
3. webpack

   1. 静态资源打包器
   
   2. 五个概念
      1. Entry 入口
      2. Output 输出
      3. Loader  处理费JavaScript文件
      4. Plugins 插件
      5. Mode 模式
         1. 开发模式  development
         2. 生产模式  production
      
   3. 降级webpack  先降webpack 然后webpack-cli ...
   
   4. ```
      # webpack5
      
      此版本重点关注以下内容:
      
      - 通过持久缓存提高构建性能.
      - 使用更好的算法和默认值来改善长期缓存.
      - 通过更好的树摇和代码生成来改善捆绑包大小.
      - 清除处于怪异状态的内部结构，同时在 v4 中实现功能而不引入任何重大更改.
      - 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用 v5.
      
      ## 下载
      
      - npm i webpack@next webpack-cli -D
      
      ## 自动删除 Node.js Polyfills
      
      早期，webpack 的目标是允许在浏览器中运行大多数 node.js 模块，但是模块格局发生了变化，许多模块用途现在主要是为前端目的而编写的。webpack <= 4 附带了许多 node.js 核心模块的 polyfill，一旦模块使用任何核心模块（即 crypto 模块），这些模块就会自动应用。
      
      尽管这使使用为 node.js 编写的模块变得容易，但它会将这些巨大的 polyfill 添加到包中。在许多情况下，这些 polyfill 是不必要的。
      
      webpack 5 会自动停止填充这些核心模块，并专注于与前端兼容的模块。
      
      迁移：
      
      - 尽可能尝试使用与前端兼容的模块。
      - 可以为 node.js 核心模块手动添加一个 polyfill。错误消息将提示如何实现该目标。
      
      ## Chunk 和模块 ID
      
      添加了用于长期缓存的新算法。在生产模式下默认情况下启用这些功能。
      
      `chunkIds: "deterministic", moduleIds: "deterministic"`
      
      ## Chunk ID
      
      你可以不用使用 `import(/* webpackChunkName: "name" */ "module")` 在开发环境来为 chunk 命名，生产环境还是有必要的
      
      webpack 内部有 chunk 命名规则，不再是以 id(0, 1, 2)命名了
      
      ## Tree Shaking
      
      1. webpack 现在能够处理对嵌套模块的 tree shaking
      
      ​```js
      // inner.js
      export const a = 1;
      export const b = 2;
      
      // module.js
      import * as inner from './inner';
      export { inner };
      
      // user.js
      import * as module from './module';
      console.log(module.inner.a);
      ​```
      
      在生产环境中, inner 模块暴露的 `b` 会被删除
      
      2. webpack 现在能够多个模块之前的关系
      
      ​```js
      import { something } from './something';
      
      function usingSomething() {
        return something;
      }
      
      export function test() {
        return usingSomething();
      }
      ​```
      
      当设置了`"sideEffects": false`时，一旦发现`test`方法没有使用，不但删除`test`，还会删除`"./something"`
      
      3. webpack 现在能处理对 Commonjs 的 tree shaking
      
      ## Output
      
      webpack 4 默认只能输出 ES5 代码
      
      webpack 5 开始新增一个属性 output.ecmaVersion, 可以生成 ES5 和 ES6 / ES2015 代码.
      
      如：`output.ecmaVersion: 2015`
      
      ## SplitChunk
      
      ​```js
      // webpack4
      minSize: 30000;
      ​```
      
      ​```js
      // webpack5
      minSize: {
        javascript: 30000,
        style: 50000,
      }
      ​```
      
      ## Caching
      
      ​```js
      // 配置缓存
      cache: {
        // 磁盘存储
        type: "filesystem",
        buildDependencies: {
          // 当配置修改时，缓存失效
          config: [__filename]
        }
      }
      ​```
      
      缓存将存储到 `node_modules/.cache/webpack`
      
      ## 监视输出文件
      
      之前 webpack 总是在第一次构建时输出全部文件，但是监视重新构建时会只更新修改的文件。
      
      此次更新在第一次构建时会找到输出文件看是否有变化，从而决定要不要输出全部文件。
      
      ## 默认值
      
      - `entry: "./src/index.js`
      - `output.path: path.resolve(__dirname, "dist")`
      - `output.filename: "[name].js"`
      
      ## 更多内容
      
      https://github.com/webpack/changelog-v5
      ```

### 2020-12-18+

1. [接口](https://www.showdoc.com.cn/128719739414963?page_id=2513235043485226)
2. Uni-app 跨平台 一套代码适用于多个平台
3. 运行配置 可以看官网
4. uni-app开发规范
   1. 页面文件遵循vue单文件组件(SFC)规范
   2. 组件标签靠近小程序规范，详见uni-app组件规范
   3. 接口能力(JS API)靠近微信小程序规范，但需要将前缀wx替换为uni,详见uni-app接口规范
   4. 数据绑定及事件处理同vue.js规范，同时补充了APP及页面的生命周期
   5. 为兼容多端运行，建议使用flex布局开发
5. live-server --port=3333

### 2020-12-22+

1. 性能优化
   1. 浏览器的渲染过程
      1. JavaScript (触发视觉变化)
      2. style (重新规划样式)
      3. layout (布局)
      4. paint (绘制)
      5. composite (合成 复合)
   2. 避免回流
   3. 避免Layout thrashing 布局抖动
   4. FastDom
   5. 减少重绘
   6. 高频事件处理函数 防抖
   7. RAIL测量模型
      1. Response 响应
         1. 处理时间应在50ms以内完成
      2. Animation 动画
         1. 每10ms产生一帧
      3. Idle 空闲
         1. 尽可能增加空闲时间
      4. Load 加载
         1. 在5s内完成所内容的加载并可以交互
   8. 性能测量工具
      1. Chrome DevTools 开发调试，性能评测
      2. Lighthouse 网站整体质量评估
         1. npm i -g lighthouse
         2. lighthouse url
      3. WebpageTest 多测试地点，全面性能报告
   9. Web标砖APIs
      1. 关键时间节点
      2. 网络状态
      3. 客户端服务端协商
   10. Code splitting 代码拆分、按需加载
   11. Tree shaking 代码减重
   12. 减少主线程工作量
       1. 避免长任务
       2. 避免超过1kb的行间脚本
       3. 使用rAF和rIC进行时间调度
   13. 函数的解析方式
       1. lazy parsing 懒解析 VS eager parsing 饥饿解析
       2. 利用Optimize.js 优化初次加载时间
   14. 对象优化
       1. 以相同顺序初始化对象成员，避免隐藏类的调整
       2. 实例化后避免添加新属性
       3. 尽量使用Array来代替array-like对象
       4. 避免读取超过数组的长度
       5. 避免元素类型转换
   15. HTML优化
       1. 减少iframes使用
       2. 压缩空白符
       3. 避免节点深层级嵌套
       4. 避免使用table布局
       5. 删除注释
       6. css\js尽量使用外链
       7. 删除元素默认属性
       8. 工具 html-minifier
   16. CSS优化
       1. 降低CSS对渲染的阻塞
       2. 利用GPU进行完成动画
       3. 使用contain属性
       4. 使用font-display属性
   17. 为什么要对资源进行压缩&合并
       1. 减少http请求数量
       2. 减少请求资源大小
       3. HTML压缩
          1. 使用在线工具进行压缩
          2. 使用html-minifier等npm工具
       4. CSS压缩
          1. 使用在线工具进行压缩
          2. 使用clean-css等npm工具
       5. JS压缩
          1. 使用在线工具进行压缩
          2. 使用webpack对js在构建时压缩
       6. CSS JS 合并
   18. 图片优化方案
       1. 图片格式
          1. JEG/JPEG  工具imagemin(压缩)
          2. PNG 工具imagemin-pngquant
          3. WebP 体积更小
       2. 图片加载优化
          1. 图片懒加载
             1. 原生的图片懒加载
             2. 插件实现懒加载
          2. 渐进式图片
          3. 使用响应式图片
             1. srcset属性
             2. sizes属性
             3. picture属性
   19. 字体优化
       1. Font-display属性
          1. auto
          2. swap
          3. optional
          4. fallback
          5. block
       2. AJAX + Base64
          1. 解决兼容性问题，但是有缓存问题
   20. webpack
       1. Tree shaking 去除上下文未用到的代码
       2. code splitting
21. Gzip
    
       1. 对传输资源进行体积压缩，可高达90%
   22. Keep Alive
       1. 一个持久的TCP连接，节省了连接创建时间
       2. 对TCP连接进行复用
       3. Header  Connection: keep-alive
   23. HTTP 资源缓存
       1. Cache-Control/Expires
       2. Last-Modified + If-Modified-Since
       3. Etag + If-None-Match
   24. Service Workers作用
       1. 加速重复访问
       2. 离线支持
   25. HTTP/2 提升
       1. 二进制传输
       2. 请求响应多路复用
       3. Server push
       4. 适用较高的请求量
   26. 服务端渲染SSR
       1. 加速首屏加载
       2. 更好的SEO
       3. 客户端渲染CSR
   
2. ```
   git分支工作操作
   
   1、git checkout -b zyz
   	这相当于
   	git branch zyz 创建分支
   	git checkout 切换分支
   
   2、git push origin zyz 把分支push到远程仓库
   
   3、 git add .
   		git commit -m "message"
   
   4、git checkout master 切换到主分支
   	git pull master 首先应该更新下一下master主分支，因为别的分支可能有修改的内容(防止出现问题)
   	git merge zyz 合并分支、这样就保证代码就是最新的了
   	git push 推送代码
   ```


### 2020-12-24+

1. CSR 客户端渲染

2. SSR 服务端渲染

3. 安装

   1. npm init -y
   2. npm i vue vue-server-renderer --save

4. nuxt框架

   1. npx create-nuxt-app myapp

5. 生命周期

   1. 服务器端的钩子拿不到客户端的对象
   2. nuxtServerInit
   3. middleware
      1. 中间件执行顺序  nuxt.config.js -> 匹配布局 -> 匹配页面
   4. validate 校验参数
      1. 校验失败，自动跳转到错误页面
   5. asyncData
   6. fetch
   7. beforeCreate  created也会运行在服务端(两端)
   8. CSR this 指向组件
   9. SSR this undefined

6. [资料](https://gitee.com/uncle9/ssr-nuxt-js)

7. 给子路由设置一个空的index.vue 代表有默认页，不会寻找其它 _详情.vue

8. 路由守卫

   1. 前置 依赖中间件 middleware | 插件
      1. 全局守卫  
         1. nuxt.config 指向middleware
         2. layouts定义中间件
      2. 组件独享守卫
         1. Middleware
      3. 插件全局前置守卫
   2. 后置 
      1. 使用vue的beforeRouteLeave钩子
      2. 插件全局后置守卫

9. 数据交互

   1. @nuxtjs/axios  i

   2. @nuxtjs/proxy  i

   3. ```
      nuxt.config.js
      
      // 跨域
        axios: {
          proxy: true, // 开启跨域行为
          // prefix: '/api', //baseUrl
        },
        proxy: { // 代理
          '/api/': {
            target: 'http://localhost:3001', //代理转发地址
            changeOrigin: true,
            pathRewrite: {
              // '^/api': ''
            }
          }
        },
      ```

10. 状态持久化 && token校验

    1. npm i cookie-universal-nuxt --save
    
11. scss

    1. Npm i node-sass sass-loader --save
    2. npm i @nuxtjs/style-resources --save 全局scss

12. ```
    相对路径 找到一些需要压缩资源 assets
    绝对路径 找到无需压缩的资源 static
    ~assets ~代表根
    @代表 src
    ```

13. 

