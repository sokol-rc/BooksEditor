<template>
  <div id="app">
    <HeaderComponent />
    <main class="content">
      <div class="layout-container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import '@/main.scss'

export default {
  components: {
    HeaderComponent,
  },
}
</script>

<style scoped>
body {
  background-color: #f6f6f6;
  color: #333;
  font-family: PT Sans, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.25;
}

.content {
  max-width: 100%;
  display: flex;
}
</style>
