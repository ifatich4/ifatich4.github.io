// import CardAccount from "@/components/Card/CardAccount.vue";
// import CardArticle from "@/components/Card/CardArticle.vue";
// import CardArticleHighlight from "@/components/Card/CardArticleHighlight.vue";
// import CardContent from "@/components/Card/CardContent.vue";
// import CardEvent from "@/components/Card/CardEvent.vue";
// import CardFile from "@/components/Card/CardFile.vue";
import CardArticle from "../components/Card/CardArticle.vue";
import CardProduct from "../components/Card/CardProduct.vue";
// import CardProductKonvensional from "../components/Card/CardProductKonvensional.vue";
// import CardProductSyariah from "@/components/Card/CardProductSyariah.vue";
// import CardPromo from "@/components/Card/CardPromo.vue";
// import CardPromoCode from "@/components/Card/CardPromoCode.vue";
import CardVoucher from "../components/Card/CardVoucher.vue";


// CardVoucher
// CardPromoCode
// CardPromo
// CardProductSyariah
// CardProductKonvensional
// CardProduct
// CardFile
// CardEvent
// CardContent
// CardArticleHighlight
// CardArticle
// CardAccount

 
 export default {
    title: 'Components/Card',
    component: CardProduct,
    tags: ['autodocs'],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // argTypes: {
    //   header: {
    //     control: "text"
    //   },
    //   active: {
    //     control: 'boolean',
    //   },
    //   id: {
    //     control: 'text',
    //   },
    // },
    // args: {
    //   header: "AccordionItem",
    //   active: true,
    //   id: "default",
    // },
  };

  export const CardProductKonven = {
    args: {
      header: "Hellow",
      text: "Hellooooooo",
      active: true,
      id: "#default",
    },
    render: (args) => ({
      components: { CardArticle,CardVoucher},
      setup() {
        return { args };
      },
      template: `
      <div class="card">
        <CardVoucher image="../src/assets/images/pattern1.png"/>
      </  div>
      `,
    }),
}
