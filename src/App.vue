<script>
import axios from "axios"
import { ref } from "vue"

const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: row=>row.nombre
  },
  /* {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },

  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) } */
]

const rows = ref([])
const data = ref(false)

async function obtenerClientes() {
  console.log("Esperando datos");
  const clientes = await axios.get("https://transporte-cpc8.onrender.com/api/cliente/all")
  rows.value = clientes
  data.value = true
  console.log(clientes);
}


export default {
  setup () {
    return {
      columns,
      rows, data
    }
  }
}

obtenerClientes()
</script>


<template>
  <div>
    <!-- <nav class="navbar navbar-expand-lg bg-body-tertiary">

      <div>
        <div class="btn-group" aria-label="Basic mixed styles example">
          <button type="button" class="btn btn-danger me-2"><router-link to="/"
              class="text-white">Login</router-link></button>
          <button type="button" class="btn btn-warning me-2"><router-link to="/compras"
              class="text-white">Compras</router-link></button>
          <button type="button" class="btn btn-success me-2"><router-link to="/home"
              class="text-white">Home</router-link></button>
        </div>
      </div>
    </nav>
    <router-view></router-view> -->

    <div class="q-pa-md" v-if="data">
      <q-table title="Treats" :rows="rows" :columns="columns" row-key="name" />
    </div>
  </div>
</template>


