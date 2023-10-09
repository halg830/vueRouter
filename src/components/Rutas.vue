<template>
  <div>
    <q-btn label="Añadir" color="primary" @click="agregar()" />
    <q-dialog v-model="toolbar">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
          </q-avatar>

          <q-toolbar-title>Agregar ruta</q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <label for="">Placa: </label><br />
          <select name="buses" id="" v-model="placa">
            <option :value="row.placa" v-for="(row, i) in databuses" :key="i">
              {{ row.placa }}
            </option>
          </select>
          <br />
          <label for="">Ciudad Destino: </label><br />
          <select name="ciudades" id="" v-model="ciudad_destino">
            <option :value="row.nombre" v-for="row in dataciudades">
              {{ row.nombre }}
            </option>
          </select>
          <br />
          <label for="">Ciudad Origen:</label><br />
          <select name="ciudades" id="" v-model="ciudad_origen">
            <option :value="row.nombre" v-for="row in dataciudades">
              {{ row.nombre }}
            </option>
          </select>
          <label for="">Fecha Salida: </label><br />
          <input type="date" v-model="fecha_salida" /><br />
          <label for="">Hora Salida: </label><br />
          <input type="time" v-model="hora_salida" /><br />
          <label for="">Valor: </label><br />
          <input type="number" v-model="valor" /><br />
          <button @click="agregarRuta()">Enviar</button>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="q-pa-md">
      <q-markup-table>
        <thead>
          <tr>
            <th><h4 class="q-ma-xs text-left">Rutas</h4></th>
          </tr>
          <tr>
            <th class="text-left"><b>Placa</b></th>
            <th class="text-right"><b>Ciudad destino</b></th>
            <th class="text-right"><b>Ciudad Origen</b></th>
            <th class="text-right"><b>Fecha Salida</b></th>
            <th class="text-right"><b>Hora Salida</b></th>
            <th class="text-right"><b>Valor</b></th>
            <th class="text-right"><b>Estado</b></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows">
            <td class="text-left">{{ row.bus.placa }}</td>
            <td class="text-right">{{ row.ciudad_destino.nombre }}</td>
            <td class="text-right">{{ row.ciudad_origen.nombre }}</td>
            <td class="text-right">{{ formatoFecha(row.fecha_salida) }}</td>
            <td class="text-right">{{ formatoHora(row.hora_salida) }}</td>
            <td class="text-right">{{ row.valor }}</td>
            <td class="text-right">{{ row.estado }}</td>
            <td class="text-right">
              <q-btn label="Editar" color="primary" @click="editar(row)" />
              <q-btn
                label="Activar"
                color="primary"
                @click="activar(row._id)"
                v-if="row.estado == 0"
              />
              <q-btn
                label="Desactivar"
                color="primary"
                @click="desactivar(row._id)"
                v-if="row.estado == 1"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";

export default {
  setup() {
    const rows = ref([]);
    const toolbar = ref(false);

    const id = ref("");
    const placa = ref("");
    const ciudad_destino = ref("");
    const ciudad_origen = ref("");
    const fecha_salida = ref("");
    const hora_salida = ref("");
    const valor = ref(0);

    async function obtenerRutas() {
      console.log("Esperando datos");
      const rutas = await axios.get(
        "https://transporte-el2a.onrender.com/api/ruta/cargar"
      );
      console.log(rutas);
      rows.value = rutas.data.rutasPopulate;
    }

    obtenerRutas();

    function formatoFecha(fecha) {
      const fechaHora = new Date(fecha);
      const opcionesDeFormato = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      return fechaHora.toLocaleDateString("es-ES", opcionesDeFormato);
    }

    function formatoHora(hora) {
      const fechaHora = new Date(hora);
      const opcionesDeFormato = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };

      return fechaHora.toLocaleTimeString("es-ES", opcionesDeFormato);
    }

    const dataciudades = ref([]);
    const databuses = ref([]);

    async function obtenerCiudadesBuses() {
      const ciudades = await axios.get(
        "https://transporte-el2a.onrender.com/api/ciudad/cargar"
      );
      const buses = await axios.get(
        "https://transporte-el2a.onrender.com/api/bus/all"
      );

      dataciudades.value = ciudades.data;
      databuses.value = buses.data.bus;
      console.log(dataciudades.value, databuses.value);
    }

    onMounted(() => {
      obtenerCiudadesBuses();
    });

    const cambiar = ref(false);
    const agregarRuta = async () => {
      const buscarbus = databuses.value.find((b) => b.placa == placa.value);
      const buscarciudaddestino = dataciudades.value.find(
        (c) => c.nombre == ciudad_destino.value
      );
      const buscarciudadorigen = dataciudades.value.find(
        (c) => c.nombre == ciudad_origen.value
      );
      const fecha = new Date(`${fecha_salida.value + "T" + hora_salida.value}`);

      const data = {
        id: id.value,
        bus: buscarbus._id,
        ciudad_destino: buscarciudaddestino._id,
        ciudad_origen: buscarciudadorigen._id,
        fecha_salida: fecha_salida.value,
        hora_salida: fecha,
        valor: valor.value,
      };

      if (cambiar.value == false) {
        const ruta = await axios.post(
          "https://transporte-el2a.onrender.com/api/ruta/nuevo",
          data
        );
        console.log(ruta);
        rows.value.push(ruta.data.rutasPopulate);
      } else {
        const buscar = rows.value.findIndex((r) => r._id == id.value);
        const ruta = await axios.put(
          "https://transporte-el2a.onrender.com/api/ruta/editar",
          data
        );
        console.log(ruta);
        rows.value.splice(buscar, 1, ruta.data.rutasPopulate);
      }

      toolbar.value = false;
    };

    const agregar = () => {
      toolbar.value = true;
      cambiar.value = false;
      placa.value = "";
      ciudad_destino.value = "";
      ciudad_origen.value = "";
      fecha_salida.value = "";
      hora_salida.value = "";
      valor.value = "";
    };

    function formatDateToYYYYMMDD(fecha) {
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, "0");
      const day = String(fecha.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }

    const editar = (row) => {
      cambiar.value = true;
      const fecha = new Date(row.fecha_salida);

      console.log(row);
      console.log(fecha);
      toolbar.value = true;
      id.value = row._id;
      placa.value = row.bus.placa;
      ciudad_destino.value = row.ciudad_destino.nombre;
      ciudad_origen.value = row.ciudad_origen.nombre;
      fecha_salida.value = formatDateToYYYYMMDD(fecha);
      hora_salida.value = formatoHora(row.hora_salida);
      valor.value = row.valor;
    };

    const activar = async (id) => {
      const ruta = await axios.put(
        `https://transporte-el2a.onrender.com/api/ruta/activar/${id}`
      );
      console.log(ruta);
      if (ruta == null) {
        return;
      } else {
        const buscar = rows.value.findIndex((r) => r._id == id);
        rows.value.splice(buscar, 1, ruta.data.rutasPopulate);
      }
    };

    const desactivar = async (id) => {
      const ruta = await axios.put(
        `https://transporte-el2a.onrender.com/api/ruta/inactivar/${id}`
      );
      console.log(ruta);
      if (ruta == null) {
        return;
      } else {
        const buscar = rows.value.findIndex((r) => r._id == id);
        rows.value.splice(buscar, 1, ruta.data.rutasPopulate);
      }
    };
    return {
      rows,
      toolbar,
      formatoFecha,
      formatoHora,
      dataciudades,
      databuses,
      agregar,
      agregarRuta,
      editar,
      placa,
      ciudad_destino,
      ciudad_origen,
      fecha_salida,
      hora_salida,
      valor,
      activar,
      desactivar,
    };
  },
};
</script>
