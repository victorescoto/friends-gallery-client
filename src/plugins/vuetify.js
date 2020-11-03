import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#f2be6b',
            secondary: '#cfb49f',
            accent: '#ffe3b7',
            error: '#b71c1c',
          },
        },
      },
});