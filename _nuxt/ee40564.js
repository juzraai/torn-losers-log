(window.webpackJsonp=window.webpackJsonp||[]).push([[24,6,18],{416:function(t,e,n){"use strict";n.r(e);var l=n(57),component=Object(l.a)({},(function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"border-0 card shadow"},[t._t("default")],2)}),[],!1,null,null,null);e.default=component.exports},417:function(t,e,n){var content=n(419);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(154).default)("08d58d36",content,!0,{sourceMap:!1})},418:function(t,e,n){"use strict";n(417)},419:function(t,e,n){var l=n(153)(!1);l.push([t.i,"@media print{.container>.row>.col[data-v-29e00fd0]{flex:1;max-width:100%;width:100%}}",""]),t.exports=l},420:function(t,e,n){"use strict";n.r(e);var l={props:{backLabel:{type:String,default:"What is TLL?"},backTo:{type:String,default:"/"},showBack:{type:Boolean,default:!1},title:{type:String,default:""}}},r=(n(418),n(57)),component=Object(r.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col col-md-10 col-lg-8 col-xl-7 mx-auto"},[n("Card",[t.showBack?n("div",{staticClass:"card-header d-print-none py-1"},[n("b-button",{staticClass:"border-0",attrs:{size:"sm",to:t.backTo,variant:"link"}},[n("i",{staticClass:"fas fa-long-arrow-alt-left mr-1"}),t._v("\n\t\t\t\t\t\t"+t._s(t.backLabel)+"\n\t\t\t\t\t")])],1):t._e(),t._v(" "),n("div",{staticClass:"card-body"},[t.title?n("h2",{staticClass:"card-title mb-4",domProps:{textContent:t._s(t.title)}}):t._e(),t._v(" "),t._t("default")],2),t._v(" "),n("div",{staticClass:"card-footer d-flex d-print-none justify-content-between"},[t._t("footer")],2)])],1)])])}),[],!1,null,"29e00fd0",null);e.default=component.exports;installComponents(component,{Card:n(416).default})},481:function(t,e,n){"use strict";n.r(e);var l={data:function(){return{features:[{icons:["fas fa-list","far fa-chart-bar"],texts:["list, filter, group,","count, plot,"]},{icons:["fas fa-tag","fas fa-check"],texts:["store price","and paid status"]},{icons:["fas fa-receipt","fas fa-download"],texts:["generate and",'<strong>export invoices</strong><span class="badge badge-success ml-2">NEW!</span>']},{icons:["fas fa-skull","fas fa-running"],texts:["of losses",'<strong>and escapes</strong><span class="badge badge-success ml-2">NEW!</span>']},{icons:["fas fa-crosshairs","fas fa-shield-alt"],texts:["you made",'<strong>or received!</strong><span class="badge badge-success ml-2">NEW!</span>']}]}},head:{title:"Welcome!"}},r=n(57),component=Object(r.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Screen",{attrs:{title:"Welcome to TLL!"},scopedSlots:t._u([{key:"footer",fn:function(){return[n("b-button",{attrs:{href:"https://github.com/juzraai/torn-losers-log/blob/main/README.md",target:"_blank",variant:"link"}},[t._v("\n\t\t\tRead more\n\t\t")]),t._v(" "),n("b-button",{attrs:{to:"/migrate",variant:"primary"}},[t._v("\n\t\t\tStart\n\t\t\t"),n("i",{staticClass:"fas fa-sign-in-alt fa-fw ml-1"})])]},proxy:!0}])},[n("p",[n("strong",[t._v("TLL")]),t._v(" aims to help you with loss selling or buying. It can")]),t._v(" "),n("ul",{staticClass:"list-unstyled mb-md-4 ml-3"},t._l(t.features,(function(e){return n("li",{key:e.texts[0],staticClass:"d-flex align-items-center mb-sm-3"},[n("div",[n("i",{staticClass:"fa-fw mr-2",class:e.icons[0]}),t._v(" "),n("br",{staticClass:"d-sm-none"}),t._v(" "),n("i",{staticClass:"fa-fw mr-3",class:e.icons[1]})]),t._v(" "),n("div",[n("span",{domProps:{innerHTML:t._s(e.texts[0])}}),t._v(" "),n("br",{staticClass:"d-sm-none"}),t._v(" "),n("span",{domProps:{innerHTML:t._s(e.texts[1])}})])])})),0)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Screen:n(420).default})}}]);