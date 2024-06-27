<template>
  <div class="p-8">
    <Search @search="searchMovies" />
    <div v-if="movies" class="grid grid-cols-1 gap-8 py-8">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" :sessions="sessions[movie.id]" />
    </div>
    <p v-if="!movies && !error">Завантаження...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCinemaAPI } from '~/composables/useCinemaAPI';
import type { ApiResponse } from '~/types/ApiResponce';
import type { Movie } from '~/types/Movie';
import type {Session} from "~/types/Session";

const movies = ref<null | Movie[]>(null)
const sessions = ref<null | object>(null)
const error = ref<string | null>(null)

async function fetchMovies(url: string) {
  try {
    const { data } = await useCinemaAPI(url)
    const moviesRes = <ApiResponse<Movie[]>>JSON.parse(data?.value.toString())
    movies.value = moviesRes.data;
  } catch (err) {
    error.value = 'Помилка при завантаженні';
  }
}
async function fetchSessions() {
  try {
    const { data } = await useCinemaAPI('/movieShows')
    const sessionsRes = <ApiResponse<Session[]>>JSON.parse(data?.value.toString())
    sessions.value = sessionsRes.data;
  } catch (err) {
    error.value = 'Помилка при завантаженні';
  }
}
function searchMovies(searchCriteria: { name: string, genres?: number }) {
  let query = '/movies?';
  if (searchCriteria.name) query += `name=${encodeURIComponent(searchCriteria.name)}&`;
  if (searchCriteria.genres) query += `genres=${searchCriteria.genres}&`;
  query = query.slice(0, -1);
  fetchMovies(query);
}

fetchMovies('/movies')
await fetchSessions();
console.log(sessions.value);
</script>
