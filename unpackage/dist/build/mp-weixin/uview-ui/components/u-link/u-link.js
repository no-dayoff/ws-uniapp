(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-link/u-link"],{"09d2":function(t,n,e){"use strict";var u=e("9f74"),a=e.n(u);a.a},1453:function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return u}));var a=function(){var t=this,n=t.$createElement;t._self._c},i=[]},"331a":function(t,n,e){"use strict";e.r(n);var u=e("1453"),a=e("d1af");for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e("09d2");var f,r=e("f0c5"),o=Object(r["a"])(a["default"],u["b"],u["c"],!1,null,"e94f7372",null,!1,u["a"],f);n["default"]=o.exports},"9f74":function(t,n,e){},ade8:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"u-link",props:{color:{type:String,default:"#2979ff"},fontSize:{type:[String,Number],default:28},underLine:{type:Boolean,default:!1},href:{type:String,default:""},mpTips:{type:String,default:"链接已复制，请在浏览器打开"},lineColor:{type:String,default:""}},methods:{openLink:function(){var n=this;t.setClipboardData({data:this.href,success:function(){t.hideToast(),n.$nextTick((function(){n.$u.toast(n.mpTips)}))}})}}};n.default=e}).call(this,e("543d")["default"])},d1af:function(t,n,e){"use strict";e.r(n);var u=e("ade8"),a=e.n(u);for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);n["default"]=a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-link/u-link-create-component',
    {
        'uview-ui/components/u-link/u-link-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("331a"))
        })
    },
    [['uview-ui/components/u-link/u-link-create-component']]
]);
