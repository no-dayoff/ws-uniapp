(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-td/u-td"],{"02df":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={name:"u-td",props:{width:{type:[Number,String],default:"auto"}},data:function(){return{tdStyle:{}}},created:function(){this.parent=!1},mounted:function(){if(this.parent=this.$u.$parent.call(this,"u-table"),this.parent){var t={};"auto"!=this.width&&(t.flex="0 0 ".concat(this.width)),t.textAlign=this.parent.align,t.fontSize=this.parent.fontSize+"rpx",t.padding=this.parent.padding,t.borderBottom="solid 1px ".concat(this.parent.borderColor),t.borderRight="solid 1px ".concat(this.parent.borderColor),t.color=this.parent.color,this.tdStyle=t}}};n.default=r},"07e6":function(t,n,e){"use strict";e.r(n);var r=e("c9eb"),i=e("d944");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("b70b");var o,u=e("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,"ce277154",null,!1,r["a"],o);n["default"]=c.exports},"42fb":function(t,n,e){},b70b:function(t,n,e){"use strict";var r=e("42fb"),i=e.n(r);i.a},c9eb:function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return r}));var i=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__get_style([t.tdStyle]));t.$mp.data=Object.assign({},{$root:{s0:e}})},a=[]},d944:function(t,n,e){"use strict";e.r(n);var r=e("02df"),i=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);n["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-td/u-td-create-component',
    {
        'uview-ui/components/u-td/u-td-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("07e6"))
        })
    },
    [['uview-ui/components/u-td/u-td-create-component']]
]);
