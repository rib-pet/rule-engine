<template>
  <div id="app">
    <main-layout>
      <router-view />
    </main-layout>
  </div>
</template>

<script>
import MainLayout from "./components/layout/Main";
export default {
  components: {
    MainLayout
  }
};
</script>
