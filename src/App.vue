<template>
  <div id="app">
    <header>
      <div class="logo">Олнайн библиотека</div>
    </header>
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

export default {
  components: {
    BooksList,
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

.layout-container {
  width: 100%;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 960px) {
  .layout-container {
    max-width: 900px;
  }
}
@media (min-width: 1264px) {
  .layout-container {
    max-width: 1185px;
  }
}
</style>
