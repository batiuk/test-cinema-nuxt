<template>
  <div class="mx-8 mt-8">
    <NuxtLink href="/" class="text-blue-500 hover:text-blue-700 px-6 py-2 rounded-2xl border-2">На головну</NuxtLink>
  </div>
  <div class="p-8">
    <div v-if="loading" class="text-center text-lg font-semibold">Завантаження...</div>
    <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
    <div v-if="movie" class="movie-details bg-white rounded-lg shadow-md p-6">
      <div class="flex flex-col md:flex-row">
        <img :src="movie.image" alt="Movie Poster" class="movie-poster h-full rounded-lg mb-6 md:mb-0 md:mr-6">
        <div class="flex-1">
          <h1 class="text-4xl font-extrabold mb-4">{{ movie.name }}</h1>
          <p class="text-gray-700 mb-4" v-html="movie.description"></p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <p class="text-gray-600" v-html="movie.additional"></p>
        <div v-if="sessions && sessions.length" class="sessions">
          <h2 class="text-2xl font-semibold mb-4">Забронювати:</h2>
          <ul class="space-y-2">
            <li v-for="session in sessions" :key="session.daytime" class="session-item">
              <p class="font-medium">{{ session.showdate }}:</p>
              <div class="flex flex-wrap space-x-2 mt-2">
                <span v-for="time in session.daytime.split(';')" :key="time" class="font-bold cursor-pointer text-blue-600 hover:text-blue-800" @click="checkPlaces(session)">{{ time }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <Modal v-if="showModal" @close="showModal = false">
    <template v-slot:header>
      <h2 class="text-2xl font-semibold">Доступні місця</h2>
    </template>
    <template v-slot:body>
      <div v-if="freePlaces.length">
        <div v-for="(row, rowIndex) in freePlaces" :key="rowIndex" class="flex mb-2">
          <span class="font-bold mr-4 text-xs w-6">Р{{ rowIndex + 1 }}:</span>
          <div class="flex space-x-0.5">
            <span v-for="seat in row[1]" :key="seat.seat" :class="seat.is_free ? 'bg-green-500' : 'bg-red-500'" class="w-5 h-5 text-xs rounded flex items-center justify-center cursor-pointer">
              {{ seat.seat }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>



<script setup lang="ts">
import {ref} from 'vue'
import {useCinemaAPI} from '~/composables/useCinemaAPI'
import type {Movie} from '~/types/Movie'
import type {Session} from '~/types/Session'

const movie = ref<Movie | null>(null)
const sessions = ref<Session[] | null>(null)
const loading = ref<boolean>(true)
const error = ref<string | null>(null)
const route = useRoute()
const movieId = route.params.id as string

interface Seat {
  seat: number;
  is_free: boolean;
}

interface Row {
  row: number;
  seats: Seat[];
}
const freePlaces = ref<any[]>([]);
const showModal = ref(false);
async function fetchMovie(id: string) {
  try {
    const {data} = await useCinemaAPI(`/movies/?movie_id=${id}`)
    const movieRes = JSON.parse(data?.value.toString())
    movie.value = movieRes.data[0]
  } catch (err) {
    error.value = 'Помилка при завантаженні'
  } finally {
    loading.value = false
  }
}

async function fetchSessions(id: string) {
  try {
    const {data} = await useCinemaAPI(`/movieShows?movie_id=${id}`)
    const sessionsRes = JSON.parse(data?.value.toString())
    sessions.value = sessionsRes.data[movieId]
    console.log(sessionsRes.data);
  } catch (err) {
    error.value = 'Помилка при завантаженні сеансів'
  }
}

async function checkPlaces(session: Session) {
  if (!session) return;
  loading.value = true;
  try {
    const { data } = await useCinemaAPI(
        `/showPlaces?movie_id=${movieId}&daytime=${session.daytime}&showdate=${session.showdate}`
    );
    freePlaces.value = JSON.parse(data?.value.toString())?.data || [];
    showModal.value = true;
  } catch (err) {
    error.value = 'Помилка при перевірці місць';
  } finally {
    loading.value = false;
  }
}

await fetchMovie(movieId)
await fetchSessions(movieId)
</script>

<style scoped>
.movie-poster {
  max-height: 400px;
  object-fit: cover;
}
</style>
