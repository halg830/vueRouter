<template>
  


  <q-btn label="Agregar" color="primary" @click="guardar()" />

  <div class="q-pa-md">
    <q-table title="Clientes" :rows="rows" :columns="columns" row-key="name" >
      <template>
        <h1>h</h1>
      </template>
    </q-table>
  </div>


  <q-dialog v-model="modal" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Nombre:</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="data.nombre" autofocus @keyup.enter="prompt = false" />
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Cedula:</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="data.cedula" autofocus @keyup.enter="prompt = false" />
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Email:</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="data.email" autofocus @keyup.enter="prompt = false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Guardar" @click="gestionarDatos()"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const columns = ref([
  {
    name: "Nombre",
    label: "Nombre",
    align: "left",
    field: (row) => row.nombre,
  },
  {
    name: "Cedula",
    label: "Cedula",
    field: (row) => row.cedula,
  },
  {
    name: "Email",
    label: "Email",
    field: (row) => row.email,
  },
  {
    name: "Estado",
    label: "Estado",
    field: (row) => row.estado,
  }
])

const rows = ref([])
const modal = ref(false)
const editar = ref(false)

async function obtenerClientes() {
  console.log("Esperando datos");
  const cliente = await axios.get(`cliente/all`)

  rows.value = cliente.data.cliente
};

obtenerClientes()

function guardar() {
  modal.value = true
  editar.value=false
}

const data = ref({
  nombre: "",
  cedula: "",
  email: ""
})

async function gestionarDatos(){
  const cliente = await axios.post(`cliente/guardar`, data.value)

  console.log(cliente);
}

async function des_activar(){
  const funciones = {
    activar: "/activar",
    desactivar: "/inactivar"
  }

  const cliente = await axios.put(`cliente${funciones}`)
}

</script>