<template>
  <div>
    <q-layout view="hHh lpR fFf">

      <q-header elevated class="bg-primary text-white" height-hint="98">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="abrirLayout()" />

          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            Tiquetes
          </q-toolbar-title>
        </q-toolbar>

        <q-tabs align="left">
          <q-route-tab to="/clientes" label="Clientes" />
        </q-tabs>
      </q-header>

      <q-drawer v-model="layout" side="left" overlay behavior="mobile">
        <h3 class="text-center q-ma-lg">Registros</h3>
        <q-scroll-area class="fit">
          <q-list>

            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
              <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon"/>
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>

          </q-list>
        </q-scroll-area>

        <!-- <h1>h</h1> -->
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>

    </q-layout>
    <img :src="imgClientes" alt="">
  </div>
</template>

<script setup>
import { ref } from 'vue'
import imgClientes from "/src/assets/clientes.png"

const layout = ref(false)

const menuList = ref([{label:"Clientes", icon: imgClientes,  separator:true}])

function abrirLayout() {
  layout.value = !layout.value
}
</script>
