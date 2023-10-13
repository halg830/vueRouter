<template>
  


  <q-btn label="Agregar" color="primary" @click="guardar()" />

  <div class="q-pa-md">
    <q-table title="Clientes" :rows="rows" :columns="columns" row-key="name" />
  </div>


  <q-dialog v-model="modal" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Your address</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Add address" v-close-popup />
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

async function obtenerClientes() {
  console.log("Esperando datos");
  const cliente = await axios.get(`cliente/all`)

  rows.value = cliente.data.cliente
};

obtenerClientes()

function guardar() {
  modal.value = true
}

</script>