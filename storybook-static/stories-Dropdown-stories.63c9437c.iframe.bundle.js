"use strict";(self.webpackChunkkitvue=self.webpackChunkkitvue||[]).push([[544],{"./src/stories/Dropdown.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Dropdown:function(){return Dropdown},__namedExportsOrder:function(){return __namedExportsOrder}});var _components_Dropdown_InputDropdown_vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/Dropdown/InputDropdown.vue"),vue__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/vue@3.5.13_typescript@5.7.3/node_modules/vue/dist/vue.esm-bundler.js");__webpack_exports__.default={title:"Components/Dropdown/Default",component:_components_Dropdown_InputDropdown_vue__WEBPACK_IMPORTED_MODULE_0__.A,tags:["autodocs"],argTypes:{items:{control:"object"},modelValue:{control:"object"},color:{control:"select",options:["none","red","blue","green","orange"]}},args:{label:"Pilihan Anda",items:[{id:1,img:"beli_emas",nama:"Pilihan Pilihanb",link:"asa"},{id:2,img:"beli_emas",nama:"Pilihan 2",link:"b.html"},{id:3,img:"beli_emas",nama:"Pilihan 3",link:"c.html"},{id:4,img:"beli_emas",nama:"Pilihan 4",link:"d.html"},{id:5,img:"beli_emas",nama:"Pilihan 4",link:"d.html"},{id:6,img:"beli_emas",nama:"Pilihan 4",link:"d.html"},{id:7,img:"beli_emas",nama:"Pilihan 4",link:"d.html"},{id:8,img:"beli_emas",nama:"Pilihan 4",link:"d.html"},{id:9,img:"beli_emas",nama:"Pilihan 4",link:"d.html"},{id:10,img:"beli_emas",nama:"Pilihan 4",link:"d.html"},{id:11,img:"beli_emas",nama:"Pilihan 4",link:"d.html"}],itemValue:"id",itemText:"nama",placeholder:"Pengajuan kredit",error:null,color:"none",useBottomSheet:!1,disabled:!1,loading:!1}};const Dropdown={args:{modelValue:"modelValue"},render:args=>({components:{InputDropdown:_components_Dropdown_InputDropdown_vue__WEBPACK_IMPORTED_MODULE_0__.A},setup(){const choosenValue=(0,vue__WEBPACK_IMPORTED_MODULE_1__.KR)(null);return{args:args,choosenValue:choosenValue}},template:'\n        <InputDropdown \n          v-bind="args" \n          v-model="choosenValue"\n        />\n    '})},__namedExportsOrder=["Dropdown"];Dropdown.parameters={...Dropdown.parameters,docs:{...Dropdown.parameters?.docs,source:{originalSource:'{\n  args: {\n    modelValue: "modelValue"\n  },\n  render: args => ({\n    components: {\n      InputDropdown\n    },\n    setup() {\n      const choosenValue = ref(null);\n      return {\n        args,\n        choosenValue\n      };\n    },\n    template: `\n        <InputDropdown \n          v-bind="args" \n          v-model="choosenValue"\n        />\n    `\n  })\n}',...Dropdown.parameters?.docs?.source}}}}}]);