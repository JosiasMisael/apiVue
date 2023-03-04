<template>
    <h1>seccion</h1>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-8">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="seccion in arraySeccion" :key="seccion.id">
                            <th scope="row">{{ seccion.id }}</th>
                            <td>{{ seccion.name }}</td>               
                        </tr>
                       
                    </tbody>
                </table>
            </div>
            <div class="col-md-2">

            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            arraySeccion:[]   
        }
    },
    created(){
        this.getSeciones();
    },
    beforeMount(){
    },
    methods:{
       async getSeciones(){
        try {
            let url = 'http://127.0.0.1:8000/api/seccion/get';
            const response = await this.axios.get(url);
            this.arraySeccion = response.data.ok;
            console.log(response.data);
        } catch (error) {
             console.log(error.response.data)
        }
        }
    }

}
</script>
  
<style></style>