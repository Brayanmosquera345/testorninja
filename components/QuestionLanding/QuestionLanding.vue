<template>
  <li
    @click="changeOpen"
    class="p-4 rounded-md shadow bg-background w-full space-y-2 cursor-pointer"
  >
    <header class="flex gap-2 items-center justify-between w-full">
      <h3 class="font-medium">{{ question }}</h3>
      <button class="cursor-pointer">
        <Plus v-if="!isOpen" />
        <X v-else />
      </button>
    </header>

    <!-- Transición suave -->
    <Transition name="accordion" appear>
      <p v-show="isOpen" class="text-paragraph">
        {{ answer }}
      </p>
    </Transition>
  </li>
</template>

<script setup lang="ts">
import { Plus, X } from 'lucide-vue-next'

defineProps({
  question: { type: String, required: true },
  answer: { type: String, required: true },
})

const isOpen = ref(false)

const changeOpen = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
/* Transición tipo acordeón */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px; /* suficientemente grande para el texto */
  opacity: 1;
}
</style>
