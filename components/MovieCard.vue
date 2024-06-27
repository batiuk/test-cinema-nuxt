<!-- components/MovieCard.vue -->

<template>
  <div class="movie-card min-h-[320px] bg-white shadow-md rounded-lg overflow-hidden flex">
    <img :src="movie.image" alt="Movie Poster" class="min-w-[260px] max-w-[260px] h-fit">
    <div class="grid w-full grid-cols-2 flex-3 p-4 gap-3">
      <div class="flex flex-col justify-between">
        <div>
          <h2 class="text-xl font-bold mb-2">{{ movie.name }}</h2>
          <p class="text-gray-700 line-clamp-8" v-html="movie.description" />
        </div>
        <NuxtLink :href="`/movies/${movie.id}`">
          <button class="w-full border-gray-600 border-2 rounded-sm p-2 mb-4">Забронювати / Дізнатись більше</button>
        </NuxtLink>
      </div>
      <div>
        <h2 class="text-lg font-bold mb-2">Доступні сеанси:</h2>
        <div v-for="session in sessions" class="mb-1">
          <p class="text-xs font-bold">{{session.showdate}}:</p>
          <span class="text-xs">{{session.daytime.split(';').join(' | ')}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {Movie} from "~/types/Movie";
import type {Session} from "~/types/Session";
defineProps<{
  movie: Movie
  sessions: Session[]
}>()
</script>
