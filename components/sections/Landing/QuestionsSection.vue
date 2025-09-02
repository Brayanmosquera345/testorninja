<template>
  <section
    id="questions"
    ref="sectionRef"
    class="w-full flex justify-center bg-gradient-to-b from-background via-background to-secondary py-10 px-2"
  >
    <section class="w-3xl space-y-4">
      <header class="questions-header space-y-2 text-center">
        <h2 class="text-4xl font-bold text-title">
          Resuelve tus dudas: Preguntas frecuentes sobre Testor Ninja
        </h2>
        <p class="text-paragraph">
          Todo lo que necesitas saber para empezar a crear pruebas de conocimientos ilimitadas y personalizadas con Testor Ninja.
        </p>
      </header>

      <ul class="space-y-2 w-full">
        <question-landing
          v-for="item in listQuestions"
          :key="item.question"
          :question="item.question"
          :answer="item.answer"
          class="question-item"
        />
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import QuestionLanding from '~/components/QuestionLanding/QuestionLanding.vue'
import { gsap } from 'gsap'

const listQuestions = [
  {
    question: '¿Para qué sirve Testor Ninja?',
    answer:
      'Testor Ninja es la herramienta perfecta para generar tests de cualquier tema de forma automática y rápida. Es ideal para estudiantes, profesores y cualquier persona que quiera autoevaluarse y aprender de una forma lúdica y eficaz.',
  },
  {
    question: '¿Testor Ninja es gratis?',
    answer:
      '¡Sí, completamente! Testor Ninja es un generador de tests gratuito. Puedes crear tus pruebas de conocimientos sin pagar nada.',
  },
  {
    question: '¿Hay un límite de pruebas que puedo crear?',
    answer:
      'No hay límites. Puedes generar cientos o miles de pruebas de 10 preguntas cada una, en cualquier tema que te interese. ¡Aprovecha la herramienta para estudiar sin restricciones!',
  },
  {
    question: '¿Cómo elijo la dificultad de las preguntas?',
    answer:
      'Testor Ninja ofrece tres niveles de dificultad: Básico, Medio y Experto. Elige el nivel que mejor se adapte a tu preparación y disfruta de una experiencia de aprendizaje personalizada.',
  },
]

const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
let tl: gsap.core.Timeline | null = null

onMounted(() => {
  if (!sectionRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        // Animación: primero el header, luego preguntas
        tl = gsap.timeline()
        tl.from('.questions-header', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        tl.from(
          '.question-item',
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.2,
          },
          '-=0.3'
        )

        // solo una vez
        observer?.disconnect()
      }
    },
    { threshold: 0.2 }
  )

  observer.observe(sectionRef.value)
})

onUnmounted(() => {
  tl?.kill()
  observer?.disconnect()
})
</script>
