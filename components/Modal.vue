<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg">
      <div class="flex justify-between items-center border-b p-4">
        <slot name="header"></slot>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">X</button>
      </div>
      <div class="p-4">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
