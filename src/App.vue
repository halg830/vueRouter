<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">

      <div>
        <div class="btn-group" aria-label="Basic mixed styles example">
          <button type="button" class="btn btn-warning me-2"><router-link to="/"
            class="text-black">Login</router-link></button>
          <button type="button" class="btn btn-warning me-2"><router-link to="/clientes"
            class="text-black">Clientes</router-link></button>
          <button type="button" class="btn btn-success me-2"><router-link to="/rutas"
              class="text-black">Rutas</router-link></button>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>
