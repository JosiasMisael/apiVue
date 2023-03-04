<template >
  <div class="d-grid gap-2 col-6 mx-auto">
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary position-relative" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Agregar nuevo alumno
    </button>
  </div>

  <!-- Modal -->
  <div class="modal fade lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Agregar Nuevo Alumno</h5>
          <button type="button" ref="close" class="btn-close" @click="cancelar()" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6">

                <div class="form-floating mb-3">
                  <input autocomplete="off" type="text" class="form-control" v-model="alumno.carnet" id="floatingInput"
                    placeholder="Carnet">
                  <label for="floatingInput">Carnet</label>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-floating mb-3">
                  <input autocomplete="off" type="text" class="form-control" v-model="alumno.nombre_alumno"
                    id="floatingPassword" placeholder="Nombre">
                  <label for="floatingPassword">Nombre del Alumno</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-floating mb-3">
                  <input autocomplete="off" type="text" class="form-control" v-model="alumno.nombre_padre
                  " id="floatingPassword" placeholder="Nombre del Padre">
                  <label for="floatingPassword">Nombre del Padre</label>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-floating mb-3">
                  <input autocomplete="off" type="text" class="form-control" v-model="alumno.nombre_madre"
                    id="floatingPassword" placeholder="Nombre de la Madre">
                  <label for="floatingPassword">Nombre de la Madre</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label for="">Grado</label>
                <select class="form-select form-select-lg mb-3" placeholder="Grado" v-model="alumno.grado_id"
                  aria-label="Default select example">
                  <option selected>Seleccione el grado</option>
                  <option v-for="grado in arrayGrado" :key="grado.id" :value="grado.id">{{ grado.name }}</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="">Sección</label>
                <select class="form-select form-select-lg mb-3" v-model="alumno.seccion_id"
                  aria-label="Default select example">
                  <option selected>Seleccione la sección</option>
                  <option v-for="seccion in arraySeccion" :key="seccion.id" :value="seccion.id">{{ seccion.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-4">
                <label for="">Fecha de Nacimiento</label>
                <VueDatePicker v-model="alumno.fecha_nacimiento" model-type="yyyy-MM-dd"></VueDatePicker>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" @click="cancelar()" class="btn btn-danger" data-bs-dismiss="modal"
            aria-label="Close">Cerrar</button>
          <p @click="validar()" class="btn btn-primary">Guardar</p>
          <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
        </div>
      </div>
    </div>
  </div>
  <div>
    <table ref="table" class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Carnet</th>
          <th scope="col">Nombre del Alumno</th>
          <th scope="col">Fecha de Nacimiento</th>
          <th scope="col">Nombre del Padre</th>
          <th scope="col">Nombre de la Madre</th>
          <th scope="col">Grado</th>
          <th scope="col">Sección</th>
          <!-- <th scope="col">Fecha de inscripcion</th> -->

        </tr>
      </thead>
      <tbody>
        <tr v-for="item, index in arrayAlumnos" :key="index">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.student_card }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.birthdate }}</td>
          <td>{{ item.father_name }}</td>
          <td>{{ item.mother_name }}</td>
          <td>{{ item.grados[0].name }}</td>
          <td>{{ item.secciones[0].name }}</td>
          <!-- <td>{{ item.alumnosgrados[0].fecha_ingreso }}</td> -->
        </tr>

      </tbody>
    </table>
  </div>
</template>


<script>
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      arrayAlumnos: [],
      arrayGrado: [],
      arraySeccion: [],
      alumno: {
        carnet: "",
        nombre_alumno: "",
        fecha_nacimiento: "",
        nombre_padre: "",
        nombre_madre: "",
        grado_id: "",
        seccion_id: ""
      }

    }
  },
  created(){
    this.getAlumnos();
    this.getGrados();
    this.getSeciones();
  },

  mounted() {
 
  },
  watch: {

  },

  methods: {
    cancelar() {
      this.alumno.carnet = '';
      this.alumno.fecha_nacimiento = '';
      this.alumno.nombre_alumno = '';
      this.alumno.nombre_padre = '';
      this.alumno.nombre_madre = '';
      this.alumno.grado_id = '';
      this.alumno.seccion_id = '';
    },
    validar() {
      const { carnet, fecha_nacimiento, nombre_alumno, nombre_padre, nombre_madre, grado_id, seccion_id } = this.alumno;
      if (carnet != '' && fecha_nacimiento != '' && nombre_alumno != '' && nombre_madre != '' && nombre_padre != '' && grado_id != '' && seccion_id != '') {
        this.save();
      } else {
        toast(`Aún hay campos vacios`, {
          transition: toast.TRANSITIONS.FLIP,
          position: toast.POSITION.TOP_RIGHT,

        });
      }

    },
    async save() {

      try {
        let url = 'http://127.0.0.1:8000/api/alumno/store';
        const response = await this.axios.post(url, {
          student_card: this.alumno.carnet,
          name: this.alumno.nombre_alumno,
          birthdate: this.alumno.fecha_nacimiento,
          father_name: this.alumno.nombre_padre,
          mother_name: this.alumno.nombre_madre,
          seccion_id: this.alumno.seccion_id,
          grado_id: this.alumno.grado_id
        });
        if (response.data.ok) {
          toast(`El Alumno ${this.alumno.nombre_alumno} se ha guardado`, {
            transition: toast.TRANSITIONS.FLIP,
            position: toast.POSITION.TOP_LEFT,
          });
        }
        this.$refs.close.click();
        this.getAlumnos();
      } catch (error) {
        toast.error(`${error.response.data.student_card[0]}`, {
        position: toast.POSITION.TOP_LEFT,
  });
    
      }
    },
    async getAlumnos() {
      try {
        let url = 'http://127.0.0.1:8000/api/alumno/get';
        const response = await this.axios.get(url);
        this.arrayAlumnos = response.data.ok;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getGrados() {
      try {
        let url = 'http://127.0.0.1:8000/api/grado/get';
        const response = await this.axios.get(url);
        this.arrayGrado = response.data.ok;;
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getSeciones() {
      try {
        let url = 'http://127.0.0.1:8000/api/seccion/get';
        const response = await this.axios.get(url);
        this.arraySeccion = response.data.ok;

      } catch (error) {
        console.log(error.response.data)
      }
    }

  },
  computed: {
  }

}
</script>

<style></style>