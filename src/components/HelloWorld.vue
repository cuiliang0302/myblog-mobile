<template>
  <h1>这是hello哦</h1>
</template>
<script setup>
import {ref} from "vue";

const activeIndex = ref('1');
const activeIndex2 = ref('1');
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>
