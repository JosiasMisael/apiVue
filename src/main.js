import { createApp} from 'vue'
import App from './App.vue';
import router from './routes';
import VueAxios from 'vue-axios';
import axios from 'axios';
import VueDatePicker from '@vuepic/vue-datepicker';
//import { toast } from 'vue3-toastify';
import '@vuepic/vue-datepicker/dist/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/js/bootstrap';
import 'vue3-toastify/dist/index.css';
import 'bootstrap/dist/js/bootstrap.bundle';

let token = localStorage.getItem('token');
if (token){
    axios.defaults.headers.common['Authorization']= token;
}
 createApp(App).component('VueDatePicker', VueDatePicker).use(VueAxios, axios).use(router).mount('#app')

