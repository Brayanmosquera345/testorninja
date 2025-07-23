<template>
  <div class="w-full flex flex-col justify-center items-center text-center text-gray-700 space-y-4">
    <div class="relative">
      <Logo :size="80" class="animate-pulse" />
      <circle-dashed 
        :size="100" 
        class="animate-spin absolute -top-[10px] -left-[10px] text-gray-800" 
      />
    </div>
    <h2 class="text-3xl font-bold text-gray-950">Generando tu evaluación…</h2>
    <p class="text-gray-600">
      Estamos preparando tus preguntas.  
      <span class="font-medium text-gray-800">¡Aprovecha para repasar lo que sabes!</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { CircleDashed } from 'lucide-vue-next';
import Logo from '../Icons/Logo.vue';
</script>
