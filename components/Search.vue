<template>
  <div class="flex items-center mb-5">
    <input v-model="searchTerm" type="text" placeholder="Шукати за імʼям" class="mr-2 p-2 border border-gray-300 rounded">
    <select v-model="selectedGenre" class="mr-2 p-2 border border-gray-300 rounded">
      <option value="">Всі жанри</option>
      <option v-for="(genre, index) in genres" :key="index" :value="index">{{ genre }}</option>
    </select>
    <button @click="search" class="p-2 bg-green-500 text-white rounded cursor-pointer">Пошук</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const searchTerm = ref('');
const selectedGenre = ref('');
const genres = [
  'ACTION',
  'ADVENTURES',
  'COMEDY',
  'DRAMA',
  'HORROR',
  'WESTERNS'
];

const emit = defineEmits(['search']);

function search() {
  // Emit event to parent component with search criteria
  const searchCriteria = {
    name: searchTerm.value,
    genres: selectedGenre.value !== '' ? parseInt(selectedGenre.value) : '',
  };
  emit('search', searchCriteria);
}
</script>
