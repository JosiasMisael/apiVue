<template>
    <h1>Grados</h1>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-8">
                <table class="table table-sm table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="grado in arrayGrados" :key="grado.id">
                            <th scope="row">{{ grado.id }}</th>
                            <td>{{ grado.name }}</td>               
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
               arrayGrados:[],
        }
    },
    created(){
        this.getGrados();

    },
    beforeMount(){
    },
    methods:{
       async getGrados(){
        try {
            let url = 'http://127.0.0.1:8000/api/grado/get';
            const response = await this.axios.get(url);
            this.arrayGrados = response.data.ok;
            console.log(response.data);
        } catch (error) {
             console.log(error.response.data)
        }
        }
    }
}
</script>

<style></style>