(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search/search"],{"724b":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return a}));var u=function(){var t=this,e=t.$createElement;t._self._c},c=[]},"8b6a":function(t,e,n){"use strict";(function(t){n("6e4e");a(n("66fd"));var e=a(n("ffba"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},c567:function(t,e,n){"use strict";n.r(e);var a=n("f1af"),u=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=u.a},f1af:function(t,e,n){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=function(){n.e("components/ay-search/ay-search-list").then(function(){return resolve(n("7e54"))}.bind(null,n)).catch(n.oe)},c={data:function(){return{defaultKw:"请输入您想查询的物品",searchKw:"",kw:"",kwList:[],hotKwList:[]}},components:{aSearchList:u},onLoad:function(){var e=this;t.request({url:"http://api.tianapi.com/txapi/hotlajifenlei/index",data:{key:"aae39f356173319d81b0ed08d5bb093e"},success:function(t){console.log(t);for(var n=t.data.newslist,a=0;a<20;a++)e.hotKwList.push({kw:n[a].name});console.log(e.hotKwList)}})},methods:{clearkwList:function(){this.kwList=[]},setListByMap:function(t){var e=this;a.callFunction({name:"searchList",data:{name:t}}).then((function(t){e.kwList=[];for(var n=t.result.data.length,a=0;a<n;a++){var u=t.result.data[a].name,c=t.result.data[a].category;e.kwList.push({kw:u,type:c})}}))},doSearch:function(t){t.kw;this.kw=t.kw,this.setListByMap(t.kw)}}};e.default=c}).call(this,n("543d")["default"],n("a9ff")["default"])},ffba:function(t,e,n){"use strict";n.r(e);var a=n("724b"),u=n("c567");for(var c in u)"default"!==c&&function(t){n.d(e,t,(function(){return u[t]}))}(c);var i,o=n("f0c5"),r=Object(o["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);e["default"]=r.exports}},[["8b6a","common/runtime","common/vendor"]]]);