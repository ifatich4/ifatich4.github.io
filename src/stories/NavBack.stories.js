import NavBackNavigator from "../components/Navbar/NavBackNavigator.vue";

  export default {
    title: 'Components/Navigation/BackNavigation',
    component: NavBackNavigator,
    tags: ['autodocs'],
    args: {
      label: "Beli Tabungan Emas",
      action: function () {
        window.history.go(-1);
    },
    },
  };

  export const BackNavigation = {
  };






  
