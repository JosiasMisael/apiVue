<script >
import axios from 'axios';
export default {

  data() {
    return {
      dataAlumnos:[],
    }

  },
  mounted(){
    
  },
  methods: {
   async cerrarSesion(){
    try {
      let url ='http://127.0.0.1:8000/api/logout'
    const response =await this.axios.post(url);
     if (response.data.msg) {
      this.$router.push({  name:'sesion'});
      localStorage.removeItem('token');

     }
      
    } catch (error) {
      console.log(error.response.data);
    }
   }
  }
};
</script>

<template>
  <div class="d-grid gap-3 col-12 mx-auto">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="link" :to="{ name: 'login' }">General</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">Edición</a>
          </li>
        </ul>
        <!-- Example single danger button -->
        <div class="btn-group">
          <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Acción
          </button>
          <ul class="dropdown-menu">
            <router-link class="link" :to="{ name: 'grados' }">Grados</router-link><br>
            <router-link class="link" :to="{ name: 'secciones' }">Secciones</router-link><br>
            <router-link class="link" :to="{ name: 'mas', params:{'codigo': 30} }">Mas</router-link>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
  <button class="btn btn-primary" @click="cerrarSesion()" type="button">Salir </button>
</div>
  <div>
    <router-view></router-view>
  </div>
</template>

<style  scoped></style>