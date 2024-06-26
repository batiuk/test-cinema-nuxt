<!-- components/MovieCard.vue -->

<template>
  <div class="movie-card h-[320px] bg-white shadow-md rounded-lg overflow-hidden flex">
    <img :src="movie.image" alt="Movie Poster" class="w-auto h-full">
    <div class="flex flex-col justify-between flex-1 p-4">
      <div>
        <h2 class="text-xl font-bold mb-2">{{ movie.name }}</h2>
        <p class="text-gray-700 line-clamp-6" v-html="movie.description" />
      </div>
      <button class="w-full border-gray-600 border-2 rounded-sm p-2">Детальніше</button>
<!--      <p class="text-gray-600">{{ movie.additional }}</p>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {Movie} from "~/types/Movie";
defineProps<{
  movie: Movie
}>()
</script>
