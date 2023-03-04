import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../components/Inicio/Inicio.vue'
import GradosVue from '../components/informacion/Grados.vue';
import SeccionVue from '../components/informacion/Seccion.vue';
import LoginVue from '../components/informacion/Login.vue';
import MasVue from '../components/informacion/Mas.vue';
import Sesion from '../components/Inicio/Sesion.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Sesion,
      name:'sesion',
    },
    {
      path: '/inicio',
      component: Inicio,
      name:'inicio',
      children:[
        {
          path:'',
          component: LoginVue,
          name:'login'
        },
        {
          path:'grados',
          component: GradosVue,
          name:'grados'
        },
        {
          path:'secciones',
          component: SeccionVue,
          name:'secciones'
        },

        {
          path:'mas/:codigo',
          component: MasVue,
          name:'mas'
        }
      ]
    },
  
  ]
})