(function(t){function e(e){for(var a,r,i=e[0],l=e[1],u=e[2],p=0,d=[];p<i.length;p++)r=i[p],s[r]&&d.push(s[r][0]),s[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);c&&c(e);while(d.length)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,i=1;i<n.length;i++){var l=n[i];0!==s[l]&&(a=!1)}a&&(o.splice(e--,1),t=r(r.s=n[0]))}return t}var a={},s={app:0},o=[];function r(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=a,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/jemo/admin/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var c=l;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},1:function(t,e){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),s=n("28dd"),o=n("bb71");n("da64");a["a"].use(o["a"],{iconfont:"md"});var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("navbar"),n("v-content",{staticClass:"mx-4 mb-4"},[n("keep-alive",[n("router-view")],1)],1)],1)},i=[],l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-toolbar",{staticClass:"indigo",attrs:{app:"",dark:""}},[n("v-toolbar-title",{staticClass:"headline text-uppercase"},[n("span",[t._v("Eclipse Jemo")]),n("span",{staticClass:"font-weight-light mx-2"},[t._v("Monitor UI")])]),n("v-spacer"),n("v-btn",{attrs:{flat:"",href:"https://www.eclipse.org/jemo/",target:"_blank"}},[n("span",{staticClass:"mr-8"},[t._v("Project page")])])],1)},u=[],c=n("2877"),p=n("6544"),d=n.n(p),f=n("8336"),v=n("9910"),m=n("71d9"),g=n("2a7f"),h={},b=Object(c["a"])(h,l,u,!1,null,null,null),_=b.exports;d()(b,{VBtn:f["a"],VSpacer:v["a"],VToolbar:m["a"],VToolbarTitle:g["a"]});var x={name:"App",components:{Navbar:_}},w=x,y=n("7496"),k=n("549c"),j=Object(c["a"])(w,r,i,!1,null,null,null),V=j.exports;d()(j,{VApp:y["a"],VContent:k["a"]});var P=n("8c4f"),C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.plugins?n("div",[n("v-spacer"),n("div",{staticClass:"d-flex justify-between align-center mb-3"},[n("v-btn",{attrs:{color:"primary"},on:{click:t.getPlugins}},[t._v("Refresh")]),n("v-btn",{attrs:{color:"secondary"},on:{click:t.expandAll}},[t._v("Expand All")]),n("v-btn",{attrs:{color:"green"},on:{click:t.colapseAll}},[t._v("Collapse All")])],1),n("v-expansion-panel",{attrs:{expand:""},model:{value:t.expand,callback:function(e){t.expand=e},expression:"expand"}},t._l(t.plugins,function(e,a){return n("v-expansion-panel-content",{key:a,scopedSlots:t._u([{key:"header",fn:function(){return[n("div",[n("strong",[t._v("id:")]),t._v(" "+t._s(e.pluginInfo.id))]),n("div",[n("strong",[t._v("name:")]),t._v(" "+t._s(e.pluginInfo.name))]),n("div",[n("strong",[t._v("version:")]),t._v(" "+t._s(e.pluginInfo.version))]),n("v-btn",{attrs:{color:"primary",flat:""},on:{click:function(n){return n.stopPropagation(),t.changePluginVersionStatus(e.pluginInfo.id,e.pluginInfo.version,e.metaData.enabled)}}},[t._v(t._s(e.metaData.enabled?"Deactivate":"Activate")+"\n                    ")]),n("v-btn",{attrs:{color:"red",flat:""},on:{click:function(n){return n.stopPropagation(),t.deletePluginVersion(e,a)}}},[t._v("Delete")])]},proxy:!0}],null,!0)},[n("v-data-table",{staticClass:"elevation-1",attrs:{headers:[{text:"Endpoints",align:"left",sortable:!1,value:"endpoint"}],items:Object.keys(e.metaData.endpoints),"hide-actions":""},scopedSlots:t._u([{key:"items",fn:function(a){return[n("td",[t._v(t._s(a.item))]),n("td",[t._v(t._s(e.metaData.endpoints[a.item]))])]}}],null,!0)}),n("v-data-table",{staticClass:"elevation-1",attrs:{headers:[{text:"Batches",align:"left",sortable:!1,value:"batch"}],items:e.metaData.batches,"hide-actions":""},scopedSlots:t._u([{key:"items",fn:function(e){return[n("td",[t._v(t._s(e.item))])]}}],null,!0)}),n("v-data-table",{staticClass:"elevation-1",attrs:{headers:[{text:"Events",align:"left",sortable:!1,value:"event"}],items:e.metaData.events,"hide-actions":""},scopedSlots:t._u([{key:"items",fn:function(e){return[n("td",[t._v(t._s(e.item))])]}}],null,!0)}),n("v-data-table",{staticClass:"elevation-1",attrs:{headers:[{text:"Fixed Processes",align:"left",sortable:!1,value:"event"}],items:e.metaData.fixed,"hide-actions":""},scopedSlots:t._u([{key:"items",fn:function(e){return[n("td",[t._v(t._s(e.item))])]}}],null,!0)})],1)}),1)],1):n("v-form",[n("v-container",[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:"",sm6:"",md3:""}},[n("v-text-field",{attrs:{label:"Jemo username"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}})],1),n("v-flex",{attrs:{xs12:"",sm6:"",md3:""}},[n("v-text-field",{attrs:{label:"Jemo password",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),n("v-btn",{staticClass:"mx-4",attrs:{color:"primary"},on:{click:t.getPlugins}},[t._v("\n          Submit\n      ")])],1)],1)],1)],1)},S=[],O=(n("ac6a"),n("75fc")),A={data:function(){return{expand:[],plugins:null,username:"system.administrator@jemo.eclipse.org",password:null}},created:function(){},methods:{getPlugins:function(){var t=this,e={Authorization:"Basic "+window.btoa(this.username+":"+this.password)};this.$http.get("/jemo/admin/plugins",{headers:e}).then(function(e){console.log(e),t.plugins=e.data},function(t){console.log(t),alert(t.data?t.data:"Wrong username or password.")})},expandAll:function(){this.expand=Object(O["a"])(Array(this.plugins.length).keys()).map(function(){return!0})},colapseAll:function(){this.expand=[]},changePluginVersionStatus:function(t,e,n){var a=this,s={Authorization:"Basic "+window.btoa(this.username+":"+this.password)},o={enabled:!n};this.$http.patch("/jemo/admin/plugins/"+t+"/"+e,o,{headers:s}).then(function(t){console.log(t),200===t.status&&(a.plugins=a.plugins.map(function(e){return e.metaData.id===t.data.metaData.id?t.data:e}))},function(t){alert(t.data),console.log(t)})},deletePluginVersion:function(t,e){var n=this,a={Authorization:"Basic "+window.btoa(this.username+":"+this.password)};this.$http.delete("/jemo/admin/plugins/"+t.pluginInfo.id+"/"+t.pluginInfo.version,{headers:a}).then(function(t){console.log(t),204===t.status&&n.plugins.splice(e,1)},function(t){alert(t.data)})}}},D=A,E=n("a523"),I=n("8fea"),T=n("cd55"),$=n("49e2"),B=n("0e8f"),J=n("4bd4"),M=n("a722"),F=n("2677"),z=Object(c["a"])(D,C,S,!1,null,null,null),L=z.exports;d()(z,{VBtn:f["a"],VContainer:E["a"],VDataTable:I["a"],VExpansionPanel:T["a"],VExpansionPanelContent:$["a"],VFlex:B["a"],VForm:J["a"],VLayout:M["a"],VSpacer:v["a"],VTextField:F["a"]}),a["a"].use(P["a"]);var N=new P["a"]({routes:[{path:"/plugins",name:"plugins",component:L},{path:"*",redirect:{name:"plugins"}}]});a["a"].config.productionTip=!1,a["a"].use(s["a"]),new a["a"]({router:N,render:function(t){return t(V)}}).$mount("#app")}});
//# sourceMappingURL=app.554b3598.js.map