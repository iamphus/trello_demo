<!-- App.vue -->
<template>
  <div id="app" class="m-0 p-0">
    <MyHeader />
    <MyBoard />
  </div>
</template>

<script>
import MyBoard from './components/MyBoard.vue';
import MyHeader from './components/MyHeader.vue';

export default {
  components: {
    MyBoard,
    MyHeader
  }
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  /* background-color: azure; */
  /* margin-top: 60px; */
}
</style>
