<template>
  <div id="app">
    <HeaderComponent />
    <main class="content">
      <div class="layout-container">
        <BooksList />
      </div>
    </main>
  </div>
</template>

<script>
import "@/main.scss";
import BooksList from "@/components/BooksList/BooksList.vue";
import HeaderComponent from "@/components/Header/HeaderComponent.vue";

export default {
  components: {
    BooksList,
    HeaderComponent,
  },
};
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
