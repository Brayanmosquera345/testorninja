<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-100 via-orange-100 to-blue-100">
    <!-- Header -->
    <header class="w-full md:w-4/5 lg:w-2/3 py-4 px-4 space-y-2">
      <h1 class="text-gray-700">Responde a las preguntas</h1>
      <div class="h-4 w-full bg-white border-gray-950 rounded-full overflow-hidden">
        <div
          class="bg-gray-900 h-full transition-all duration-300"
          :style="{ width: progressBarWidth }"></div>
      </div>
    </header>

    <!-- Main -->
    <main class="flex-1 w-full flex justify-center items-center px-4">
      <section v-if="currentQuestion" class="w-full md:w-4/5 lg:w-2/3 space-y-4">
        <header>
          <h2 class="text-gray-700">
            Pregunta {{ currentIndex + 1 }}/{{ storeQuestion.questions.length }}
          </h2>
          <p class="text-gray-900 font-bold text-md">
            {{ currentQuestion.statement }}
          </p>
        </header>
        <section class="py-4 space-y-2">
          <ResponseItem
            v-for="(response, index) in currentQuestion.responses"
            :key="index"
            :response="response.response"
            :selected="selectedResponse === index"
            @click="selectResponse(index)"
          />
        </section>
      </section>
    </main>

    <!-- Footer -->
    <footer class="w-full px-4 py-2 bg-white flex gap-2 justify-end items-center">
      <button
        class="btn-secondary"
        @click="cancelTest"
      >
        {{currentIndex > 0 ? 'Atrás' : 'Cancelar'}}
      </button>
      <button
        class="btn-primary"
        @click="nextQuestion"
        :disabled="currentIndex >= storeQuestion.questions.length" >
        {{ currentIndex >= storeQuestion.questions.length ? 'Finalizar' : 'Siguiente' }}
      </button>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { useQuestionStore } from '~/store/QuestionStore'
import ResponseItem from '~/components/ResponseItem/ResponseItem.vue'

const storeQuestion = useQuestionStore()

// índice actual
const currentIndex = ref(0)
// respuesta seleccionada (por si quieres marcar algo)
const selectedResponse = ref<number | null>(null)

// obtener la pregunta actual
const currentQuestion = computed(() => {
  return storeQuestion.questions[currentIndex.value] ?? null
})

// ancho de la barra de progreso
const progressBarWidth = computed(() => {
  if (storeQuestion.questions.length === 0) return '0%'
  const progress = ((currentIndex.value + 1) / storeQuestion.questions.length) * 100
  return `${progress}%`
})

// seleccionar respuesta
const selectResponse = (index: number) => {
  selectedResponse.value = index
  storeQuestion.setUserAnswer(currentIndex.value, index)
}

// ir a la siguiente pregunta
const nextQuestion = () => {
  if (currentIndex.value < storeQuestion.questions.length - 1) {
    currentIndex.value++
    selectedResponse.value = null
  } else {
    // aquí podrías navegar a la vista de resultados
    navigateTo('/resultado')
  }
}

// cancelar (puedes redirigir o resetear)
const cancelTest = () => {
  if (currentIndex.value > 0) {
    currentIndex.value --
    selectedResponse.value = null
  }else {
    navigateTo('/')
  }
}
</script>
