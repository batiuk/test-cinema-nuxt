<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Movies</h1>
    <Search @search="searchMovies" />
    <div v-if="movies" class="grid grid-cols-2 p-16 gap-8">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie />
    </div>
    <p v-if="!movies && !error">Loading...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useCinemaAPI} from "~/composables/useCinemaAPI";
import type {ApiResponse} from "~/types/ApiResponce";
import type {Movie} from "~/types/Movie";

const movies = <Ref<null | Movie[]>>ref(null)
const error = ref(null)
const {data} = await useCinemaAPI('/movies')
const moviesRes = <ApiResponse<Movie[]>>JSON.parse(data?.value.toString())
movies.value = moviesRes.data;
function searchMovies(v) {
  console.log(v);
}
</script>
