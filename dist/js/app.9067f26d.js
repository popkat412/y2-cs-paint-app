(function(e){function t(t){for(var n,i,s=t[0],c=t[1],u=t[2],h=0,p=[];h<s.length;h++)i=s[h],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&p.push(o[i][0]),o[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(p.length)p.shift()();return a.push.apply(a,u||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,s=1;s<r.length;s++){const c=r[s];0!==o[c]&&(n=!1)}n&&(a.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},o={app:0},a=[];function i(t){if(n[t])return n[t].exports;const r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;const r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(const n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){const t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";let s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(let u=0;u<s.length;u++)t(s[u]);var l=c;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("cd49")},"11bf":function(e,t,r){},"169b":function(e,t,r){"use strict";r("11bf")},"1ae9":function(e,t,r){},5448:function(e,t,r){"use strict";r("1ae9")},a347:function(e,t,r){},cd49:function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");let n,o=r("2b0e"),a=function(){const e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"},on:{mousemove:e.updateMousePos}},[e.showingSizeIndicator?r("div",{style:{width:e.$store.currentTool.options.size.value+"px",height:e.$store.currentTool.options.size.value+"px",top:e.mousePos.y-e.$store.currentTool.options.size.value/2+"px",left:e.mousePos.x-e.$store.currentTool.options.size.value/2+"px"},attrs:{id:"tool-size-indicator"}}):e._e(),r("main",[r("div",{staticClass:"sidebar left"},[r("h2",[e._v("Tools")]),r("div",{attrs:{id:"tools"}},e._l(e.$store.tools,(function(t,n){return r("button",{key:n,class:{selectedTool:n==e.$store.currentToolIdx},on:{click:function(t){return e.changeTool(n)}}},[e._v(" "+e._s(t.name)+" ")])})),0),r("h2",[e._v("Options")]),r("div",{attrs:{id:"tool-options"}},e._l(e.$store.currentTool.options,(function(t,n){return r("div",{key:n,staticStyle:{"text-align":"left"}},[r("label",[e._v(e._s(e.titleCase(n)))]),r("br"),"number"==t.type?r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.value,expression:"option.value",modifiers:{number:!0}}],attrs:{min:"1",type:"number"},domProps:{value:t.value},on:{input:function(r){r.target.composing||e.$set(t,"value",e._n(r.target.value))},blur:function(t){return e.$forceUpdate()}}}):"color"==t.type?r("chrome-picker",{staticClass:"color-picker",attrs:{value:t.value},on:{input:function(t){return e.$store.currentTool.options.color.value=t.hex8}}}):e._e()],1)})),0)]),r("div",[r("Canvas",{on:{mouseover:function(t){e.showingSizeIndicator=!0},mouseleave:function(t){e.showingSizeIndicator=!1}}})],1),r("div",{staticClass:"sidebar right"},[r("h2",[e._v("Layers")]),r("draggable",{model:{value:e.$store.layers,callback:function(t){e.$set(e.$store,"layers",t)},expression:"$store.layers"}},[r("transition-group",e._l(e.$store.layers,(function(t,n){return r("div",{key:t.name,staticClass:"layer",class:{selectedLayer:n==e.$store.currentLayerIdx},on:{click:function(t){return e.clickedLayer(n)}}},[e._v(" "+e._s(t.name)+" ")])})),0)],1),r("button",{on:{click:e.addLayer}},[e._v("Add Layer")]),r("p",[e._v(e._s(e.$store.currentPrefixedShortcutKey))]),r("h2",[e._v("Actions")]),r("button",{on:{click:e.clearLayer}},[e._v("Clear Layer")]),r("button",{on:{click:e.saveCanvas}},[e._v("Save as Image")])],1)])])},i=[],s=r("d4ec"),c=r("bee2"),u=r("262e"),l=r("2caf"),h=r("9ab4"),p=r("1b40"),f=function(){const e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"canvas"},on:{mouseover:function(t){return e.$emit("mouseover")},mouseleave:function(t){return e.$emit("mouseleave")}}})},v=[],d=r("b85c"),y=r("3425"),b=r.n(y);r("b0c0");(function(e){e[e["Pen"]=0]="Pen",e[e["Eraser"]=1]="Eraser",e[e["Spray"]=2]="Spray"})(n||(n={}));const g=function e(){Object(s["a"])(this,e)},m=function(e){Object(u["a"])(r,e);const t=Object(l["a"])(r);function r(e,o){let a;return Object(s["a"])(this,r),a=t.call(this),a.type=n.Pen,a.name="Pen",a.options={size:{type:"number",value:null!==e&&void 0!==e?e:3},color:{type:"color",value:null!==o&&void 0!==o?o:"white"}},a}return r}(g),O=function(e){Object(u["a"])(r,e);const t=Object(l["a"])(r);function r(e){let o;return Object(s["a"])(this,r),o=t.call(this),o.type=n.Eraser,o.name="Eraser",o.options={size:{type:"number",value:null!==e&&void 0!==e?e:10}},o}return r}(g),$=function(e){Object(u["a"])(r,e);const t=Object(l["a"])(r);function r(e,o){let a;return Object(s["a"])(this,r),a=t.call(this),a.type=n.Spray,a.name="Spray",a.options={size:{type:"number",value:null!==e&&void 0!==e?e:3},color:{type:"color",value:null!==o&&void 0!==o?o:"white"}},a}return r}(g),j=function e(){Object(s["a"])(this,e)},k=function(e){Object(u["a"])(r,e);const t=Object(l["a"])(r);function r(e,n,o){let a;return Object(s["a"])(this,r),a=t.call(this),a.points=e,a.tool=n,a.options=o,a}return r}(j),w=function(e){Object(u["a"])(r,e);const t=Object(l["a"])(r);function r(e,n){let o;return Object(s["a"])(this,r),o=t.call(this),o.tool=e,o.options=n,o}return r}(j),x="black",S=r("53ca");function P(e){let t;if(null==e||"object"!=Object(S["a"])(e))return e;if(e instanceof Date)return t=new Date,t.setTime(e.getTime()),t;if(e instanceof Array){t=[];for(let r=0,n=e.length;r<n;r++)t[r]=P(e[r]);return t}if(e instanceof Object){for(const o in t={},e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=P(e[o]));return t}throw new Error("Unable to copy obj! Its type isn't supported.")}const _=function(){function e(t,r){Object(s["a"])(this,e),this.graphics=t.createGraphics(t.width,t.height),this.width=t.width,this.height=t.height,this.name=r,this.shapes=[],this.currentShapeIdx=null}return Object(c["a"])(e,[{key:"update",value:function(e){this.graphics.clear();let t,r=Object(d["a"])(this.shapes);try{for(r.s();!(t=r.n()).done;){const o=t.value;if(o instanceof k){var a;this.graphics.noFill(),this.graphics.stroke(o.tool==n.Pen&&"color"in o.options?o.options.color.value:null!==(a=e.backgroundColor)&&void 0!==a?a:x),this.graphics.beginShape(),this.graphics.strokeWeight(o.options.size.value);var i,s=Object(d["a"])(o.points);try{for(s.s();!(i=s.n()).done;){const c=i.value;this.graphics.vertex(c.x,c.y)}}catch(u){s.e(u)}finally{s.f()}this.graphics.endShape()}else if(o instanceof w)throw"Not Implemented"}}catch(u){r.e(u)}finally{r.f()}}},{key:"mouseDragged",value:function(e,t){const r=e.createVector(e.mouseX,e.mouseY);(t instanceof m||t instanceof O)&&(null==this.currentShapeIdx?(this.currentShapeIdx=this.shapes.length,this.shapes.push(new k([r],t.type,P(t.options)))):this.currentShape instanceof k&&this.currentShape.points.push(r))}},{key:"mouseReleased",value:function(){this.currentShapeIdx=null}},{key:"clear",value:function(){this.shapes=[],this.currentShapeIdx=null}},{key:"currentShape",get:function(){return null==this.currentShapeIdx?null:this.shapes[this.currentShapeIdx]}}]),e}(),C={createLayer:"createLayer",saveCanvas:"saveCanvas"},I=C;function T(e,t){return Object.hasOwnProperty.call(e,t)}let L=function(e){Object(u["a"])(r,e);const t=Object(l["a"])(r);function r(){return Object(s["a"])(this,r),t.apply(this,arguments)}return Object(c["a"])(r,[{key:"mounted",value:function(){const e=this,t=function(t){let r;e.$root.$on(I.createLayer,(function(){e.$store.layers.push(new _(t,"Layer ".concat(e.$store.layers.length+1))),e.$store.currentLayerIdx=e.$store.layers.length-1})),e.$root.$on(I.saveCanvas,(function(){if(null==r)alert("Sorry, the canvas hasn't loaded yet");else{let e,n=null===(e=prompt("File format (png|jpg)","png"))||void 0===e?void 0:e.toLowerCase();"png"!=n&&"jpg"!=n?alert("Invalid format, can only be 'png' or 'jpg'"):t.save(r,"sketch.".concat(n))}})),t.setup=function(){r=t.createCanvas(.5*window.innerWidth,window.innerHeight),e.$store.layers=[new _(t,"Layer 1")],console.log(e.$store)},t.draw=function(){let r;t.background(null!==(r=e.$store.backgroundColor)&&void 0!==r?r:t.color(0));let n,o=Object(d["a"])(e.$store.layers);try{for(o.s();!(n=o.n()).done;){const a=n.value;a.update(e.$store)}}catch(u){o.e(u)}finally{o.f()}let i,s=Object(d["a"])(e.$store.layers);try{for(s.s();!(i=s.n()).done;){const c=i.value;t.image(c.graphics,0,0)}}catch(u){s.e(u)}finally{s.f()}},t.mouseDragged=function(){let r;null===(r=e.$store.currentLayer)||void 0===r||r.mouseDragged(t,e.$store.currentTool)},t.mouseReleased=function(){let t;null===(t=e.$store.currentLayer)||void 0===t||t.mouseReleased()},t.keyPressed=function(){const r=function(t){if(e.$store.currentPrefixedShortcutKey==e.$config.changeColorShortcutPrefix){if(T(e.$store.currentTool.options,"color")){const r=e.$config.changeColorShortcutMap[t];r?(console.log("Changing color to ".concat(r,"...")),e.$store.currentTool.options.color.value=r):console.log("Invalid color: ".concat(t))}e.$store.currentPrefixedShortcutKey=null}};switch(t.key){case"b":r("b");break;case"c":e.$store.currentPrefixedShortcutKey="c",setTimeout((function(){e.$store.currentPrefixedShortcutKey=null}),1e3);break;case"e":console.log("E key pressed"),e.$store.setCurrentTool(n.Eraser);break;case"p":e.$store.setCurrentTool(n.Pen);break;case"w":r("w");break;default:r(t.key);break}}};new b.a(t,document.getElementById("canvas"))}}]),r}(p["b"]);L=Object(h["a"])([p["a"]],L);let z=L,E=z,M=(r("5448"),r("2877")),D=Object(M["a"])(E,f,v,!1,null,"1144b118",null),K=D.exports,A=r("b76a"),R=r.n(A),U=r("c345"),B=function(e){Object(u["a"])(r,e);const t=Object(l["a"])(r);function r(){let e;return Object(s["a"])(this,r),e=t.apply(this,arguments),e.showingSizeIndicator=!1,e.mousePos={x:0,y:0},e}return Object(c["a"])(r,[{key:"updateMousePos",value:function(e){this.mousePos.x=e.pageX,this.mousePos.y=e.pageY}},{key:"addLayer",value:function(){this.$root.$emit(I.createLayer)}},{key:"changeTool",value:function(e){this.$store.currentToolIdx=e}},{key:"clearLayer",value:function(){this.$store.currentLayer.clear()}},{key:"updateOption",value:function(e){console.log(e)}},{key:"clickedLayer",value:function(e){this.$store.currentLayerIdx=e}},{key:"saveCanvas",value:function(){this.$root.$emit(I.saveCanvas)}}]),r}(p["b"]);B=Object(h["a"])([Object(p["a"])({components:{Canvas:K,draggable:R.a,"chrome-picker":U["Chrome"]}})],B);const F=B,J=F,N=(r("169b"),Object(M["a"])(J,a,i,!1,null,"15f91297",null)),W=N.exports,X=(r("c740"),function(){function e(){Object(s["a"])(this,e),this.backgroundColor="black",this.currentPrefixedShortcutKey=null,this.layers=[],this.currentLayerIdx=0,this.tools=[new m,new O,new $],this.currentToolIdx=0}return Object(c["a"])(e,[{key:"currentTool",get:function(){return this.tools[this.currentToolIdx]}},{key:"setCurrentTool",value:function(e){this.currentToolIdx=this.tools.findIndex((function(t){return t.type==e}))}},{key:"currentLayer",get:function(){return this.layers[this.currentLayerIdx]}}]),e}()),Y=(r("a347"),function e(){Object(s["a"])(this,e),this.changeColorShortcutPrefix="c",this.prefixShortcutDuration=1e3,this.changeColorShortcutMap={b:"blue",w:"white",g:"green",r:"red",y:"yellow",B:"black"}});r("ac1f"),r("5319");function G(e){return e.replace(/([A-Z])/g,(function(e){return" ".concat(e)})).replace(/^./,(function(e){return e.toUpperCase()}))}o["a"].config.productionTip=!1,o["a"].prototype.$store=o["a"].observable(new X),o["a"].prototype.$config=o["a"].observable(new Y),o["a"].mixin({methods:{titleCase:G}}),new o["a"]({render:function(e){return e(W)}}).$mount("#app")}});
//# sourceMappingURL=app.9067f26d.js.map