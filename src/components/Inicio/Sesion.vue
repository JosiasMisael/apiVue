<script >
//import axios from 'axios';
export default {

  data() {
    return {
      dataAlumnos:[],
    }

  },
  mounted(){
    
  },
  methods: {
 async ingresar(){
    try {
        let url ='http://127.0.0.1:8000/api/login'
        const response = await this.axios.post(url,{
        email:"misaels@gmail.com",
        password:"123456" 
        });
        this.axios.defaults.headers.common['Authorization']=`${response.data.token_type} ${response.data.token}`;
        localStorage.setItem('token', `${response.data.token_type} ${response.data.token}`)
        console.log(`${response.data.token_type} ${response.data.token}`);
        this.$router.push({ path: 'inicio' });
    } catch (error) {
       console.log(error.response.data); 
    }

  }
  }
};
</script>

<template>
<div class="d-grid gap-2 col-6 mx-auto position-relative">
    <div class="row">
        <div class="col-md-2">
            
        </div>
        <div class="col-md-8 d-grid gap-2 col-6 mx-auto">

            <button @click="ingresar()" class="btn btn-primary btn-lg" type="button">Iniciar Sesion</button>
        </div>
        <div class="col-md-2">

        </div>
    </div>
 
</div>
</template>

<style  scoped></style>