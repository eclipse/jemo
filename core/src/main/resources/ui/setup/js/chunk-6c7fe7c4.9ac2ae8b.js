(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c7fe7c4"],{"0a49":function(t,e,i){var a=i("9b43"),n=i("626a"),r=i("4bf8"),o=i("9def"),s=i("cd1c");t.exports=function(t,e){var i=1==t,l=2==t,c=3==t,u=4==t,d=6==t,h=5==t||d,v=e||s;return function(e,s,f){for(var p,m,y=r(e),g=n(y),b=a(s,f,3),w=o(g.length),x=0,k=i?v(e,w):l?v(e,0):void 0;w>x;x++)if((h||x in g)&&(p=g[x],m=b(p,x,y),t))if(i)k[x]=m;else if(m)switch(t){case 3:return!0;case 5:return p;case 6:return x;case 2:k.push(p)}else if(u)return!1;return d?-1:c||u?u:k}}},1169:function(t,e,i){var a=i("2d95");t.exports=Array.isArray||function(t){return"Array"==a(t)}},"169a":function(t,e,i){"use strict";i("6ec0");var a=i("c69d"),n=i("30d4"),r=(i("f7dc"),i("80d2")),o=i("2b0e"),s=o["a"].extend().extend({name:"overlayable",props:{hideOverlay:Boolean},data:function(){return{overlay:null,overlayOffset:0,overlayTimeout:void 0,overlayTransitionDuration:650}},watch:{hideOverlay:function(t){t?this.removeOverlay():this.genOverlay()}},beforeDestroy:function(){this.removeOverlay()},methods:{genOverlay:function(){var t=this;if(!this.isActive||this.hideOverlay||this.isActive&&this.overlayTimeout||this.overlay)return clearTimeout(this.overlayTimeout),this.overlay&&this.overlay.classList.add("v-overlay--active");this.overlay=document.createElement("div"),this.overlay.className="v-overlay",this.absolute&&(this.overlay.className+=" v-overlay--absolute"),this.hideScroll();var e=this.absolute?this.$el.parentNode:document.querySelector("[data-app]");return e&&e.insertBefore(this.overlay,e.firstChild),this.overlay.clientHeight,requestAnimationFrame(function(){t.overlay&&(t.overlay.className+=" v-overlay--active",void 0!==t.activeZIndex&&(t.overlay.style.zIndex=String(t.activeZIndex-1)))}),!0},removeOverlay:function(){var t=this,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if(!this.overlay)return e&&this.showScroll();this.overlay.classList.remove("v-overlay--active"),this.overlayTimeout=window.setTimeout(function(){try{t.overlay&&t.overlay.parentNode&&t.overlay.parentNode.removeChild(t.overlay),t.overlay=null,e&&t.showScroll()}catch(i){console.log(i)}clearTimeout(t.overlayTimeout),t.overlayTimeout=void 0},this.overlayTransitionDuration)},scrollListener:function(t){if("keydown"===t.type){if(["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||t.target.isContentEditable)return;var e=[r["p"].up,r["p"].pageup],i=[r["p"].down,r["p"].pagedown];if(e.includes(t.keyCode))t.deltaY=-1;else{if(!i.includes(t.keyCode))return;t.deltaY=1}}(t.target===this.overlay||"keydown"!==t.type&&t.target===document.body||this.checkPath(t))&&t.preventDefault()},hasScrollbar:function(t){if(!t||t.nodeType!==Node.ELEMENT_NODE)return!1;var e=window.getComputedStyle(t);return["auto","scroll"].includes(e.overflowY)&&t.scrollHeight>t.clientHeight},shouldScroll:function(t,e){return 0===t.scrollTop&&e<0||t.scrollTop+t.clientHeight===t.scrollHeight&&e>0},isInside:function(t,e){return t===e||null!==t&&t!==document.body&&this.isInside(t.parentNode,e)},checkPath:function(t){var e=t.path||this.composedPath(t),i=t.deltaY;if("keydown"===t.type&&e[0]===document.body){var a=this.$refs.dialog,n=window.getSelection().anchorNode;return!(a&&this.hasScrollbar(a)&&this.isInside(n,a))||this.shouldScroll(a,i)}for(var r=0;r<e.length;r++){var o=e[r];if(o===document)return!0;if(o===document.documentElement)return!0;if(o===this.$refs.content)return!0;if(this.hasScrollbar(o))return this.shouldScroll(o,i)}return!0},composedPath:function(t){if(t.composedPath)return t.composedPath();var e=[],i=t.target;while(i){if(e.push(i),"HTML"===i.tagName)return e.push(document),e.push(window),e;i=i.parentElement}return e},hideScroll:function(){this.$vuetify.breakpoint.smAndDown?document.documentElement.classList.add("overflow-y-hidden"):(Object(r["a"])(window,"wheel",this.scrollListener,{passive:!1}),window.addEventListener("keydown",this.scrollListener))},showScroll:function(){document.documentElement.classList.remove("overflow-y-hidden"),window.removeEventListener("wheel",this.scrollListener),window.removeEventListener("keydown",this.scrollListener)}}}),l=i("e949"),c=i("261e"),u=i("98a1"),d=i("c584"),h=i("bfc5"),v=i("d9bd"),f=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t};function p(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}e["a"]={name:"v-dialog",directives:{ClickOutside:d["a"]},mixins:[a["a"],n["a"],s,l["a"],c["a"],u["a"]],props:{disabled:Boolean,persistent:Boolean,fullscreen:Boolean,fullWidth:Boolean,noClickAnimation:Boolean,light:Boolean,dark:Boolean,maxWidth:{type:[String,Number],default:"none"},origin:{type:String,default:"center center"},width:{type:[String,Number],default:"auto"},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"}},data:function(){return{animate:!1,animateTimeout:null,stackClass:"v-dialog__content--active",stackMinZIndex:200}},computed:{classes:function(){var t;return t={},p(t,("v-dialog "+this.contentClass).trim(),!0),p(t,"v-dialog--active",this.isActive),p(t,"v-dialog--persistent",this.persistent),p(t,"v-dialog--fullscreen",this.fullscreen),p(t,"v-dialog--scrollable",this.scrollable),p(t,"v-dialog--animated",this.animate),t},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind())},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},beforeMount:function(){var t=this;this.$nextTick(function(){t.isBooted=t.isActive,t.isActive&&t.show()})},mounted:function(){"v-slot"===Object(r["l"])(this,"activator",!0)&&Object(v["a"])("v-dialog's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},beforeDestroy:function(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick(function(){t.animate=!0,clearTimeout(t.animateTimeout),t.animateTimeout=setTimeout(function(){return t.animate=!1},150)})},closeConditional:function(t){return!(!this.isActive||this.$refs.content.contains(t.target))&&(this.persistent?(this.noClickAnimation||this.overlay!==t.target||this.animateClick(),!1):this.activeZIndex>=this.getMaxZIndex())},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):s.options.methods.hideScroll.call(this)},show:function(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$refs.content.focus(),this.bind()},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onKeydown:function(t){if(t.keyCode===r["p"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var e=this.getActivator();this.$nextTick(function(){return e&&e.focus()})}this.$emit("keydown",t)},onFocusin:function(t){var e=event,i=e.target;if(![document,this.$refs.content].includes(i)&&!this.$refs.content.contains(i)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some(function(t){return t.contains(i)})){var a=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');a.length&&a[0].focus()}},getActivator:function(t){if(this.$refs.activator)return this.$refs.activator.children.length>0?this.$refs.activator.children[0]:this.$refs.activator;if(t&&(this.activatedBy=t.currentTarget||t.target),this.activatedBy)return this.activatedBy;if(this.activatorNode){var e=Array.isArray(this.activatorNode)?this.activatorNode[0]:this.activatorNode,i=e&&e.elm;if(i)return i}return null},genActivator:function(){var t=this;if(!this.hasActivator)return null;var e=this.disabled?{}:{click:function(e){e.stopPropagation(),t.getActivator(e),t.disabled||(t.isActive=!t.isActive)}};if("scoped"===Object(r["l"])(this,"activator")){var i=this.$scopedSlots.activator({on:e});return this.activatorNode=i,i}return this.$createElement("div",{staticClass:"v-dialog__activator",class:{"v-dialog__activator--disabled":this.disabled},ref:"activator",on:e},this.$slots.activator)}},render:function(t){var e=this,i=[],a={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:function(){e.isActive=!1},args:{closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],on:{click:function(t){t.stopPropagation()}}};this.fullscreen||(a.style={maxWidth:"none"===this.maxWidth?void 0:Object(r["c"])(this.maxWidth),width:"auto"===this.width?void 0:Object(r["c"])(this.width)}),i.push(this.genActivator());var n=t("div",a,this.showLazyContent(this.$slots.default));return this.transition&&(n=t("transition",{props:{name:this.transition,origin:this.origin}},[n])),i.push(t("div",{class:this.contentClasses,attrs:f({tabIndex:"-1"},this.getScopeIdAttrs()),on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.$createElement(h["a"],{props:{root:!0,light:this.light,dark:this.dark}},[n])])),t("div",{staticClass:"v-dialog__container",style:{display:!this.hasActivator||this.fullWidth?"block":"inline-block"}},i)}}},2677:function(t,e,i){"use strict";var a=i("8654"),n=(i("7e63"),i("d9bd")),r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},o={name:"v-textarea",extends:a["a"],props:{autoGrow:Boolean,noResize:Boolean,outline:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return r({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},a["a"].options.computed.classes.call(this,null))},dynamicHeight:function(){return this.autoGrow?this.inputHeight:"auto"},isEnclosed:function(){return this.textarea||a["a"].options.computed.isEnclosed.call(this)},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){!this.internalChange&&this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout(function(){t.autoGrow&&t.calculateInputHeight()},0),this.autoGrow&&this.noResize&&Object(n["b"])('"no-resize" is now implied when using "auto-grow", and can be removed',this)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height=0;var e=t.scrollHeight,i=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(i,e)+"px"}},genInput:function(){var t=a["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){a["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.internalChange=!0,this.$emit("keydown",t)}}},s=i("7cf7"),l=i("ab6d");i.d(e,"a",function(){return c});var c={functional:!0,$_wrapperFor:a["a"],props:{textarea:Boolean,multiLine:Boolean},render:function(t,e){var i=e.props,r=e.data,u=e.slots,d=e.parent;Object(l["a"])(r);var h=Object(s["a"])(u(),t);return i.textarea&&Object(n["d"])("<v-text-field textarea>","<v-textarea outline>",c,d),i.multiLine&&Object(n["d"])("<v-text-field multi-line>","<v-textarea>",c,d),i.textarea||i.multiLine?(r.attrs.outline=i.textarea,t(o,r,h)):t(a["a"],r,h)}}},"2f21":function(t,e,i){"use strict";var a=i("79e5");t.exports=function(t,e){return!!t&&a(function(){e?t.call(null,function(){},1):t.call(null)})}},"2fdb":function(t,e,i){"use strict";var a=i("5ca1"),n=i("d2c8"),r="includes";a(a.P+a.F*i("5147")(r),"String",{includes:function(t){return!!~n(this,t,r).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},"456d":function(t,e,i){var a=i("4bf8"),n=i("0d58");i("5eda")("keys",function(){return function(t){return n(a(t))}})},"4f37":function(t,e,i){"use strict";i("aa77")("trim",function(t){return function(){return t(this,3)}})},5147:function(t,e,i){var a=i("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(i){try{return e[a]=!1,!"/./"[t](e)}catch(n){}}return!0}},"5eda":function(t,e,i){var a=i("5ca1"),n=i("8378"),r=i("79e5");t.exports=function(t,e){var i=(n.Object||{})[t]||Object[t],o={};o[t]=e(i),a(a.S+a.F*r(function(){i(1)}),"Object",o)}},6762:function(t,e,i){"use strict";var a=i("5ca1"),n=i("c366")(!0);a(a.P,"Array",{includes:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),i("9c6c")("includes")},"6d67":function(t,e,i){"use strict";var a=i("5ca1"),n=i("0a49")(1);a(a.P+a.F*!i("2f21")([].map,!0),"Array",{map:function(t){return n(this,t,arguments[1])}})},"6ec0":function(t,e,i){},7514:function(t,e,i){"use strict";var a=i("5ca1"),n=i("0a49")(5),r="find",o=!0;r in[]&&Array(1)[r](function(){o=!1}),a(a.P+a.F*o,"Array",{find:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),i("9c6c")(r)},"7e63":function(t,e,i){},aa77:function(t,e,i){var a=i("5ca1"),n=i("be13"),r=i("79e5"),o=i("fdef"),s="["+o+"]",l="​",c=RegExp("^"+s+s+"*"),u=RegExp(s+s+"*$"),d=function(t,e,i){var n={},s=r(function(){return!!o[t]()||l[t]()!=l}),c=n[t]=s?e(h):o[t];i&&(n[i]=c),a(a.P+a.F*s,"String",n)},h=d.trim=function(t,e){return t=String(n(t)),1&e&&(t=t.replace(c,"")),2&e&&(t=t.replace(u,"")),t};t.exports=d},aae3:function(t,e,i){var a=i("d3f4"),n=i("2d95"),r=i("2b4c")("match");t.exports=function(t){var e;return a(t)&&(void 0!==(e=t[r])?!!e:"RegExp"==n(t))}},ac6a:function(t,e,i){for(var a=i("cadf"),n=i("0d58"),r=i("2aba"),o=i("7726"),s=i("32e9"),l=i("84f2"),c=i("2b4c"),u=c("iterator"),d=c("toStringTag"),h=l.Array,v={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},f=n(v),p=0;p<f.length;p++){var m,y=f[p],g=v[y],b=o[y],w=b&&b.prototype;if(w&&(w[u]||s(w,u,h),w[d]||s(w,d,y),l[y]=h,g))for(m in a)w[m]||r(w,m,a[m],!0)}},cd1c:function(t,e,i){var a=i("e853");t.exports=function(t,e){return new(a(t))(e)}},d2c8:function(t,e,i){var a=i("aae3"),n=i("be13");t.exports=function(t,e,i){if(a(e))throw TypeError("String#"+i+" doesn't accept regex!");return String(n(t))}},e853:function(t,e,i){var a=i("d3f4"),n=i("1169"),r=i("2b4c")("species");t.exports=function(t){var e;return n(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!n(e.prototype)||(e=void 0),a(e)&&(e=e[r],null===e&&(e=void 0))),void 0===e?Array:e}},f3e2:function(t,e,i){"use strict";var a=i("5ca1"),n=i("0a49")(0),r=i("2f21")([].forEach,!0);a(a.P+a.F*!r,"Array",{forEach:function(t){return n(this,t,arguments[1])}})},f4c7:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.params?i("v-container",{attrs:{"grid-list-md":""}},[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-card",{staticClass:"text-md-center ma-3"},[i("v-card-title",{attrs:{"primary-title":""}},[i("div",[i("h3",{staticClass:"headline mb-0"},[t._v("\n                        Please review cluster parameter values\n                    ")])])]),i("v-divider"),i("v-subheader",[t._v("Cluster master parameters")]),i("v-card-text",t._l(t.params.master,function(e){return i("div",{key:e.name},[e.range?i("v-select",{attrs:{items:e.range,label:t.createLabel(e)},model:{value:e.value,callback:function(i){t.$set(e,"value",i)},expression:"param.value"}}):i("v-text-field",{attrs:{label:t.createLabel(e),required:""},model:{value:e.value,callback:function(i){t.$set(e,"value",i)},expression:"param.value"}})],1)}),0),i("v-divider"),i("v-subheader",[t._v("Cluster nodes parameters")]),i("v-card-text",t._l(t.params.nodes,function(e){return i("div",{key:e.name},[e.range?i("v-select",{attrs:{items:e.range,label:t.createLabel(e)},model:{value:e.value,callback:function(i){t.$set(e,"value",i)},expression:"param.value"}}):i("v-text-field",{attrs:{label:t.createLabel(e),required:""},model:{value:e.value,callback:function(i){t.$set(e,"value",i)},expression:"param.value"}})],1)}),0),t.policies?i("div",[i("v-divider"),i("v-subheader",[t._v("Policy to attach to cluster and worker nodes")]),i("v-card-text",[i("v-select",{attrs:{items:t.policies,label:"Existing Policies"},on:{input:function(e){return t.changeRoute()}},model:{value:t.selectedPolicy,callback:function(e){t.selectedPolicy=e},expression:"selectedPolicy"}})],1)],1):t._e(),t.params.network.length>0?i("div",[i("v-divider"),i("v-subheader",[t._v("Network parameters")]),t.existingNetworks?i("v-card-text",[i("v-select",{attrs:{items:t.existingNetworks,label:"Existing Networks"},model:{value:t.selectedNetwork,callback:function(e){t.selectedNetwork=e},expression:"selectedNetwork"}}),i("v-btn",{attrs:{color:"primary"},on:{click:function(e){t.existingNetworks=null}}},[t._v("Or Select new network")])],1):i("v-card-text",[t._l(t.params.network,function(e){return i("div",{key:e.name},[i("v-text-field",{attrs:{label:t.createLabel(e),required:""},model:{value:e.value,callback:function(i){t.$set(e,"value",i)},expression:"param.value"}})],1)}),i("v-btn",{attrs:{color:"primary"},on:{click:t.getExistingNetworks}},[t._v("Or Select existing network")])],2)],1):t._e(),i("v-divider"),i("v-subheader",[t._v("Map containers to parameter sets")]),i("v-card-text",t._l(t.instanceParamSets,function(e,a){return i("v-text-field",{key:a,attrs:{label:t.createReplicasLabel(a),required:""},model:{value:t.instanceParamSets[a],callback:function(e){t.$set(t.instanceParamSets,a,e)},expression:"instanceParamSets[key]"}})}),1),i("v-card-actions",[i("v-layout",{attrs:{row:"","justify-center":""}},[i("v-dialog",{staticClass:"mx-1",attrs:{persistent:"","max-width":"600px"},model:{value:t.permissions_error_dialog,callback:function(e){t.permissions_error_dialog=e},expression:"permissions_error_dialog"}},[i("v-btn",{attrs:{slot:"activator",color:"primary",dark:""},slot:"activator"},[t._v("Create Cluster")]),i("v-card",[i("v-card-title",[i("span",{staticClass:"headline"},[t._v("Terraform user credentials")])]),i("v-card-text",[i("v-container",{attrs:{"grid-list-md":""}},[i("v-layout",{attrs:{wrap:""}},t._l(t.csp.requiredCredentials,function(e){return i("v-flex",{key:e,attrs:{xs12:""}},[i("v-text-field",{attrs:{label:e},model:{value:t.credentialParameters[e],callback:function(i){t.$set(t.credentialParameters,e,i)},expression:"credentialParameters[credential]"}})],1)}),1)],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:function(e){t.permissions_error_dialog=!1}}},[t._v("Cancel")]),i("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:t.validateCredentials}},[t._v("OK")])],1)],1)],1),i("v-btn",{attrs:{color:"secondary"},on:{click:function(e){return t.deployCluster(!0)}}},[t._v("Download Terraform Templates")])],1)],1)],1),t.clusterCreated?i("div",[i("h3",[t._v("Cluster created")]),t._v("\n            Great job! The cluster is created. Terraform has created the following resources:\n            "),i("br"),i("div",[i("pre",[t._v(t._s(t._f("pretty")(t.terraformResult)))])])]):t._e()],1),i("v-dialog",{attrs:{persistent:"","max-width":"600"},model:{value:t.policyValidationErrorDialog,callback:function(e){t.policyValidationErrorDialog=e},expression:"policyValidationErrorDialog"}},[i("v-card",[i("v-card-title",{staticClass:"headline"},[t._v("Policy '"+t._s(t.selectedPolicy)+"' does not have the required permissions\n            ")]),i("v-card-text",[t._v("Please select another policy or add to '"+t._s(t.selectedPolicy)+"' the following permissions:\n            ")]),i("v-list",{attrs:{dense:""}},t._l(t.policyValidationError,function(e){return i("v-list-tile",{key:e},[i("v-list-tile-content",[i("v-list-tile-title",{domProps:{textContent:t._s(e)}})],1)],1)}),1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"green darken-1",flat:""},on:{click:function(e){t.policyValidationErrorDialog=!1}}},[t._v("Close")])],1)],1)],1)],1):t._e()},n=[],r=(i("f3e2"),i("6762"),i("2fdb"),i("4f37"),i("7514"),i("ac6a"),i("456d"),i("6d67"),i("7f7f"),{data:function(){return{csp:this.$route.params.csp,paramSets:this.$route.params.paramSets,valid:!0,clusterCreated:!1,terraformResult:null,permissions_error_dialog:!1,existingNetworks:null,selectedNetwork:null,policies:null,selectedPolicy:null,policyValidationErrorDialog:!1,policyValidationError:[],credentialParameters:{},params:null,instanceParamSets:{}}},methods:{createLabel:function(t){return t.name+" ("+t.description+")"},createReplicasLabel:function(t){return"Number of containers using "+t},getExistingNetworks:function(){var t=this;this.$http.get("networks/"+this.csp.name).then(function(e){console.log(e),t.existingNetworks=e.data},function(t){console.log(t),alert(t.data)})},validateCredentials:function(){var t=this;this.credentialParameters["region"]=this.csp.region;var e={csp:this.csp.name,parameters:this.credentialParameters};console.log(e),this.$http.post("credentials",e).then(function(e){console.log(e),t.permissions_error_dialog=!1,t.deployCluster(!1)},function(t){console.log(t),alert(t.data)})},changeRoute:function(){var t=this;console.log(this.selectedPolicy);var e={csp:this.csp.name,parameters:{policy:this.selectedPolicy}};this.$http.post("policy/validate",e).then(function(e){console.log(e.data),e.data.notAllowedActions.length>0&&(t.policyValidationErrorDialog=!0,t.policyValidationError=e.data.notAllowedActions)},function(t){alert(t.data)})},deployCluster:function(t){var e=this,i={};for(var a in this.params.master){var n=this.params.master[a];i[n.name]=n.value}for(var r in this.params.nodes){var o=this.params.nodes[r];i[o.name]=o.value}if(this.selectedNetwork)i["existing-network-name"]=this.selectedNetwork;else for(var s in this.params.network){var l=this.params.network[s];i[l.name]=l.value}var c=Object.keys(this.instanceParamSets).map(function(t){return t+":"+e.instanceParamSets[t]}).join(",");i["containersPerParamSet"]=c,this.selectedPolicy&&(i["jemo-policy-name"]=this.selectedPolicy),this.$router.push({name:"create-cluster",params:{csp:this.csp,parameters:i,downloadFormsOnly:t}})},init:function(){var t=this;this.$http.get("cluster/params/"+this.csp.name).then(function(e){console.log(e),t.params=e.data;var i=t.params.master.find(function(t){return"workstation-external-cidr"===t.name});i&&t.$http.get("https://ipv4.icanhazip.com").then(function(t){console.log(t),i.value=t.data.trim()+"/32"},function(t){console.log("Can not find local ip"),console.log(t)})},function(t){console.log(t)}),this.$http.get("policy/"+this.csp.name).then(function(e){console.log(e),t.policies=e.data,t.policies&&t.policies.includes("jemo-policy")&&(t.selectedPolicy="jemo-policy")},function(t){console.log(t)}),this.paramSets.forEach(function(e){return t.instanceParamSets[e.name]=0})}},created:function(){this.init()},watch:{$route:function(t){var e=this;"prod-conf"===t.name&&(this.csp=t.params.csp?t.params.csp:this.csp,this.paramSets=t.params.paramSets?t.params.paramSets:this.paramSets,t.params.csp.name!==this.csp.name?this.init():this.paramSets.forEach(function(t){return e.instanceParamSets[t.name]=0}))}}}),o=r,s=i("2877"),l=i("6544"),c=i.n(l),u=i("8336"),d=i("b0af"),h=i("99d9"),v=i("12b2"),f=i("a523"),p=i("169a"),m=i("ce7e"),y=i("0e8f"),g=i("a722"),b=i("8860"),w=i("ba95"),x=i("5d23"),k=i("b56d"),S=i("9910"),C=i("e0c7"),L=i("2677"),_=Object(s["a"])(o,a,n,!1,null,null,null);e["default"]=_.exports;c()(_,{VBtn:u["a"],VCard:d["a"],VCardActions:h["a"],VCardText:h["b"],VCardTitle:v["a"],VContainer:f["a"],VDialog:p["a"],VDivider:m["a"],VFlex:y["a"],VLayout:g["a"],VList:b["a"],VListTile:w["a"],VListTileContent:x["a"],VListTileTitle:x["b"],VSelect:k["a"],VSpacer:S["a"],VSubheader:C["a"],VTextField:L["a"]})},f7dc:function(t,e,i){},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-6c7fe7c4.9ac2ae8b.js.map