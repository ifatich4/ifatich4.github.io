"use strict";(self.webpackChunkkitvue=self.webpackChunkkitvue||[]).push([[3554],{"./node_modules/.pnpm/vue-loader@16.8.3_@vue+compiler-sfc@3.5.13_vue@3.5.13_typescript@5.7.3__webpack@5.98.0_@swc+core@1.10.17_esbuild@0.24.2_/node_modules/vue-loader/dist/exportHelper.js":function(__unused_webpack_module,exports){exports.A=(sfc,props)=>{const target=sfc.__vccOpts||sfc;for(const[key,val]of props)target[key]=val;return target}},"./src/stories/LabelDefault.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultLabel:function(){return DefaultLabel},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return LabelDefault_stories}});var vue_esm_bundler=__webpack_require__("./node_modules/.pnpm/vue@3.5.13_typescript@5.7.3/node_modules/vue/dist/vue.esm-bundler.js");const _hoisted_1=["src"];var LabelIconvue_type_script_lang_js={name:"LabelIcon",props:{text:{type:String,default:"Status"},variant:{type:String,default:"",Validator:function(value){return-1!==["blue","red","yellow"].indexOf(value)}},icon:{type:String,default:"/assets/images/icon-crown-green.svg"}},setup(props){return props=(0,vue_esm_bundler.Kh)(props),{classes:(0,vue_esm_bundler.EW)((()=>({[""+(props.variant?"default"===props.variant?"pgd-status":`pgd-status-${props.variant}`:"pgd-status")]:!0})))}}};const __exports__=(0,__webpack_require__("./node_modules/.pnpm/vue-loader@16.8.3_@vue+compiler-sfc@3.5.13_vue@3.5.13_typescript@5.7.3__webpack@5.98.0_@swc+core@1.10.17_esbuild@0.24.2_/node_modules/vue-loader/dist/exportHelper.js").A)(LabelIconvue_type_script_lang_js,[["render",function render(_ctx,_cache,$props,$setup,$data,$options){return(0,vue_esm_bundler.uX)(),(0,vue_esm_bundler.CE)("div",{class:(0,vue_esm_bundler.C4)([$setup.classes])},[(0,vue_esm_bundler.Lk)("img",{src:$props.icon,alt:""},null,8,_hoisted_1),(0,vue_esm_bundler.eW)((0,vue_esm_bundler.v_)($props.text),1)],2)}]]);var LabelIcon=__exports__;__exports__.__docgenInfo={displayName:"LabelIcon",exportName:"default",description:"",tags:{},props:[{name:"text",type:{name:"string"},defaultValue:{func:!1,value:'"Status"'}},{name:"variant",type:{name:"string"},defaultValue:{func:!1,value:'""'}},{name:"icon",type:{name:"string"},defaultValue:{func:!1,value:'"/assets/images/icon-crown-green.svg"'}}],sourceFiles:["/Users/lm/Documents/Design System/Bootstrap/pegadaian-ui-kit-vue/src/components/Label/LabelIcon.vue"]};var LabelDefault_stories={title:"Components/Label/WithIcon",component:LabelIcon,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","blue","green","yellow","red"]}},args:{text:"Status",variant:"default",icon:"\thttps://ifatich4.github.io/img/ico-image-upload.1e0a3166.svg"}};const DefaultLabel={},__namedExportsOrder=["DefaultLabel"];DefaultLabel.parameters={...DefaultLabel.parameters,docs:{...DefaultLabel.parameters?.docs,source:{originalSource:"{}",...DefaultLabel.parameters?.docs?.source}}}}}]);