(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-news-news"],{"199c":function(t,i,e){"use strict";var n;e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return o})),e.d(i,"a",(function(){return n}));var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-text",{staticClass:"u-link",style:{color:t.color,fontSize:t.fontSize+"rpx",borderBottom:t.underLine?"1px solid "+(t.lineColor?t.lineColor:t.color):"none",paddingBottom:t.underLine?"0rpx":"0"},on:{click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.openLink.apply(void 0,arguments)}}},[t._t("default")],2)},o=[]},"331a":function(t,i,e){"use strict";e.r(i);var n=e("199c"),a=e("d1af");for(var o in a)"default"!==o&&function(t){e.d(i,t,(function(){return a[t]}))}(o);e("bf07");var r,l=e("f0c5"),s=Object(l["a"])(a["default"],n["b"],n["c"],!1,null,"4a220922",null,!1,n["a"],r);i["default"]=s.exports},"336d":function(t,i,e){"use strict";(function(t){var n=e("4ea4");e("a4d3"),e("e01a"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=n(e("54a6")),o={data:function(){return{OneTabbar:a.default,newsList:[],content:"",show:!1,detailList:[],urlList:[],urlLink:""}},onLoad:function(){this.getList()},methods:{getList:function(){var i=this;uni.request({url:"https://api.tianapi.com/lajifenleinews/index",data:{key:"aae39f356173319d81b0ed08d5bb093e"},success:function(e){t.log(e),i.newsList=e.data.newslist;for(var n=0;n<i.newsList.length;n++)i.detailList.push(e.data.newslist[n].description),i.urlList.push(e.data.newslist[n].url)}})},showDetail:function(t){this.show=!0,this.content=this.detailList[t]+"············",this.urlLink=this.urlList[t]},goBanner:function(){uni.navigateTo({url:"../banner/banner"})}}};i.default=o}).call(this,e("5a52")["default"])},"414d":function(t,i,e){"use strict";e.r(i);var n=e("336d"),a=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(i,t,(function(){return n[t]}))}(o);i["default"]=a.a},4418:function(t,i,e){"use strict";var n=e("c777"),a=e.n(n);a.a},"48cf":function(t,i,e){var n=e("86fe");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=e("4f06").default;a("a51ccbd2",n,!0,{sourceMap:!1,shadowMode:!1})},"4e00":function(t,i,e){"use strict";e("a9e3"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={name:"u-link",props:{color:{type:String,default:"#2979ff"},fontSize:{type:[String,Number],default:28},underLine:{type:Boolean,default:!1},href:{type:String,default:""},mpTips:{type:String,default:"链接已复制，请在浏览器打开"},lineColor:{type:String,default:""}},methods:{openLink:function(){window.open(this.href)}}};i.default=n},"5ad8":function(t,i,e){"use strict";e.r(i);var n=e("c714"),a=e("414d");for(var o in a)"default"!==o&&function(t){e.d(i,t,(function(){return a[t]}))}(o);e("4418");var r,l=e("f0c5"),s=Object(l["a"])(a["default"],n["b"],n["c"],!1,null,"3a3fb7d8",null,!1,n["a"],r);i["default"]=s.exports},"86fe":function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-link[data-v-4a220922]{line-height:1}',""]),t.exports=i},bf07:function(t,i,e){"use strict";var n=e("48cf"),a=e.n(n);a.a},c714:function(t,i,e){"use strict";e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return o})),e.d(i,"a",(function(){return n}));var n={uModal:e("668e").default,uLink:e("331a").default,uTabbar:e("4144").default},a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("u-modal",{staticClass:"modal",attrs:{content:t.content,title:"新闻简述"},model:{value:t.show,callback:function(i){t.show=i},expression:"show"}},[e("v-uni-view",{staticClass:"slot-content"},[e("v-uni-rich-text",{attrs:{nodes:t.content}}),e("v-uni-view",{staticClass:"tips-link"},[e("u-link",{attrs:{href:t.urlLink,"under-line":!0}},[t._v("点此链接，查看原文")])],1)],1)],1),e("v-uni-view",{staticClass:"banner",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goBanner.apply(void 0,arguments)}}},[e("v-uni-image",{staticClass:"banner-img",attrs:{src:"http://china.cnr.cn/gdgg/20181107/W020181107382611227870.jpg"}}),e("v-uni-view",{staticClass:"banner-title"},[t._v("这些年，总书记牵挂的民生事：垃圾分类 正成时尚")])],1),e("v-uni-view",{staticClass:"uni-list"},[t._l(t.newsList,(function(i,n){return e("v-uni-view",{key:n,staticClass:"uni-list-cell",attrs:{"hover-class":"uni-list-cell-hover"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.showDetail(n)}}},[e("v-uni-view",{staticClass:"uni-media-list"},[e("v-uni-image",{staticClass:"uni-media-list-logo",attrs:{src:i.picUrl}}),e("v-uni-view",{staticClass:"uni-media-list-body"},[e("v-uni-view",{staticClass:"uni-media-list-text-top"},[t._v(t._s(i.title))]),e("v-uni-view",{staticClass:"uni-media-list-text-bottom"},[e("v-uni-text",[t._v(t._s(i.source))]),e("v-uni-text",[t._v(t._s(i.ctime))])],1)],1)],1)],1)})),e("u-tabbar",{attrs:{list:t.OneTabbar,"mid-button":!0,"active-color":"#5098FF"}})],2)],1)},o=[]},c777:function(t,i,e){var n=e("fd34");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=e("4f06").default;a("61ae8680",n,!0,{sourceMap:!1,shadowMode:!1})},d1af:function(t,i,e){"use strict";e.r(i);var n=e("4e00"),a=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(i,t,(function(){return n[t]}))}(o);i["default"]=a.a},fd34:function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,'.modal[data-v-3a3fb7d8]{line-height:25px}.tips-link[data-v-3a3fb7d8]{text-align:center;font-size:%?50?%}.banner[data-v-3a3fb7d8]{height:%?360?%;overflow:hidden;position:relative;background-color:#ccc}.banner-img[data-v-3a3fb7d8]{width:100%}.banner-title[data-v-3a3fb7d8]{max-height:%?84?%;overflow:hidden;position:absolute;left:%?30?%;bottom:%?30?%;width:90%;font-size:%?32?%;font-weight:400;line-height:%?42?%;color:#fff;z-index:11}.uni-list[data-v-3a3fb7d8]{background-color:#fff;position:relative;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-list[data-v-3a3fb7d8]:after{position:absolute;z-index:10;right:0;bottom:0;left:0;height:1px;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.uni-list[data-v-3a3fb7d8]::before{position:absolute;z-index:10;right:0;top:0;left:0;height:1px;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.uni-list-cell[data-v-3a3fb7d8]{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.uni-list-cell-hover[data-v-3a3fb7d8]{background-color:#eee}.uni-list-cell[data-v-3a3fb7d8]::after{position:absolute;z-index:3;right:0;bottom:0;left:%?30?%;height:1px;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.uni-list .uni-list-cell[data-v-3a3fb7d8]:last-child::after{height:%?0?%}\n/* 图文列表 */.uni-media-list[data-v-3a3fb7d8]{padding:%?22?% %?30?%;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;width:100%;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.uni-navigate-right.uni-media-list[data-v-3a3fb7d8]{padding-right:%?74?%}.uni-pull-right[data-v-3a3fb7d8]{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;flex-direction:row-reverse}.uni-pull-right>.uni-media-list-logo[data-v-3a3fb7d8]{margin-right:%?0?%;margin-left:%?20?%}.uni-media-list-logo uni-image[data-v-3a3fb7d8]{height:100%;width:100%\n\t/* background-repeat: round; */}.uni-media-list-text-bottom[data-v-3a3fb7d8]{width:100%;line-height:%?30?%;font-size:%?26?%;color:#8f8f94}.uni-media-list-logo[data-v-3a3fb7d8]{width:%?180?%;height:%?140?%;margin-right:%?20?%}.uni-media-list-body[data-v-3a3fb7d8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;overflow:hidden;height:auto}.uni-media-list-text-top[data-v-3a3fb7d8]{width:100%;line-height:%?36?%;font-size:%?30?%;height:%?74?%;font-size:%?28?%;overflow:hidden}.uni-media-list-text-bottom[data-v-3a3fb7d8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}',""]),t.exports=i}}]);