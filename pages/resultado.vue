<template>
  <section
    class="flex flex-col lg:flex-row justify-center gap-4 min-h-screen lg:h-screen p-4 bg-gradient-to-r from-blue-100 via-orange-100 to-blue-100">
    <!-- Panel izquierdo -->
    <section
      class="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white border border-gray-300 rounded-md py-4 px-4 lg:px-6 space-y-4">
      <header class="text-center flex flex-col items-center gap-2 text-gray-900">
        <Logo :size="80" />
        <h1 class="font-bold text-2xl text-gray-900">¡Has completado la prueba!</h1>
      </header>

      <!-- Puntaje -->
      <div class="text-center">
        <p class="text-gray-700">
          Obtuviste
          <span class="text-gray-900 font-bold">{{ totalCorrect }}/{{ totalQuestions }}</span>
          respuestas correctas
        </p>
      </div>

      <!-- Feedback -->
      <section v-if="isLoading"
        class="bg-gray-200 rounded-md border border-gray-300 text-gray-700 w-full text-center animate-pulse min-h-[7rem] flex items-center justify-center px-2">
        <p>Estamos generando una recomendación para ti...</p>
      </section>
      <section v-else class="p-4 bg-gray-100 rounded-md border border-gray-300 text-gray-700 w-full text-center">
        <p>{{ store.feedback }}</p>
      </section>

      <!-- Botones -->
      <footer class="space-x-2 pt-4">
        <button @click="navigateTo('/')" class="btn-primary btn-md">
          Volver al inicio
        </button>
      </footer>
    </section>

    <!-- Panel derecho -->
    <section class="w-full lg:w-1/2 rounded-md h-full">
      <ul class="space-y-4 h-full  overflow-auto ">
        <result-item v-for="(q, i) in store.questions" :key="i" :number="i + 1" :is-error="!isAnswerCorrect(i)"
          :question="q.statement" :response="getCorrectResponse(q)" :response-user="getUserResponse(i)" />
      </ul>
    </section>
  </section>
</template>


<script lang="ts" setup>
import type { Question } from '~/types/Question'
import { useQuestionStore } from '~/store/QuestionStore'
import { getFeedback } from '~/service/AgentService'
//componentes
import Logo from '~/components/Icons/Logo.vue'
import ResultItem from '~/components/ResultItem/ResultItem.vue'

const store = useQuestionStore()

// Total de preguntas
const totalQuestions = store.questions.length
//feedback de la IA
const isLoading = ref(false)

// Calcular cuántas son correctas
const totalCorrect = computed(() => {
  return store.questions.reduce((acc, q, index) => {
    const userIndex = store.userAnswers[index]
    if (userIndex !== null && q.responses[userIndex]?.isCorrect) {
      acc++
    }
    return acc
  }, 0)
})

// Función: ¿la respuesta del usuario es correcta?
const isAnswerCorrect = (index: number) => {
  const userIndex = store.userAnswers[index]
  return userIndex !== null && store.questions[index].responses[userIndex]?.isCorrect === true
}

// Función: obtener texto de la respuesta correcta
const getCorrectResponse = (q: Question) => {
  const correct = q.responses.find(r => r.isCorrect)
  return correct ? correct.response : ''
}

// Función: obtener texto de la respuesta del usuario
const getUserResponse = (index: number) => {
  const userIndex = store.userAnswers[index]
  if (userIndex === null) return 'Sin respuesta'
  return store.questions[index].responses[userIndex]?.response ?? 'Sin respuesta'
}

const feedbackData = store.questions.map((q, i) => {
  const userIndex = store.userAnswers[i]
  const correct = q.responses.find(r => r.isCorrect)?.response || ''
  const user = userIndex !== null ? q.responses[userIndex]?.response : 'Sin respuesta'

  return {
    statement: q.statement,
    userAnswer: user,
    correctAnswer: correct
  }
})

const getFeedbackLocal = async () => {
  try {
    isLoading.value = true
    const response = await getFeedback(store.topic, feedbackData)
    store.feedback = response?.result
  } catch (error) {
    console.error(error)

  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (store.topic !== '' && store.feedback === '') {
    getFeedbackLocal()
  }
})

</script>
