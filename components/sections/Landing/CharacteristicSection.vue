<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { BookOpenText, Gauge, MessageSquare, Sparkles } from 'lucide-vue-next';

const listCharacteristics = [
  {
    icon: Sparkles,
    title: 'Pruebas generadas con IA',
    description: 'Crea tests instantáneos sobre cualquier tema, sin límites ni restricciones.',
  },
  {
    icon: Gauge,
    title: 'Niveles de dificultad',
    description: 'Elige entre Básico, Medio y Experto para adaptar la prueba a tu nivel de conocimiento.',
  },
  {
    icon: MessageSquare,
    title: 'Retroalimentación inmediata',
    description: 'Recibe un análisis al final de cada prueba para saber qué temas necesitas reforzar.',
  },
  {
    icon: BookOpenText,
    title: 'Análisis detallado de preguntas',
    description: 'Revisa tus respuestas para entender tus errores y mejorar de forma efectiva.',
  }
];

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

let observer: IntersectionObserver | null = null
let ctx: ReturnType<typeof gsap.context> | null = null
let tl: gsap.core.Timeline | null = null

const createTimeline = (sectionEl: HTMLElement) => {
  // selecciona nodos dentro de la sección (scoped)
  const header = sectionEl.querySelector('header')
  const items = Array.from(sectionEl.querySelectorAll<HTMLElement>('.characteristic-item'))

  const timeline = gsap.timeline({ defaults: { duration: 0.6, ease: 'power3.out' } })

  if (header) {
    timeline.from(header, { y: 20, opacity: 0 })
  }

  if (items.length) {
    timeline.from(items, { y: 30, opacity: 0, stagger: 0.12 }, header ? '-=0.15' : undefined)
  }

  return timeline
}

onMounted(async () => {
  await nextTick()

  // Fallback si IntersectionObserver no está disponible
  if (!('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.target === sectionRef.value) {
          isVisible.value = entry.isIntersecting
        }
      }
    },
    {
      threshold: 0.2, // 20% visible dispara
      root: null,
      // rootMargin: '0px 0px -10% 0px' // ajusta cuando quieres disparar
    }
  )

  if (sectionRef.value) observer.observe(sectionRef.value)
})

watch(isVisible, (visible) => {
  if (!sectionRef.value) return

  // scope para facilitar revert y no atacar elementos fuera del componente
  ctx?.revert()
  ctx = gsap.context(() => {
    // limpia timeline previa
    tl?.kill()

    if (visible) {
      tl = createTimeline(sectionRef.value!)
      // si quieres que se ejecute solo una vez y luego deje de observar:
      // observer?.disconnect()
    } else {
      // si quieres que al salir se revierta:
      tl?.reverse()
    }
    observer?.disconnect()
  }, sectionRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  ctx?.revert()
  tl?.kill()
})
</script>

<template>
  <section id="characteristics" ref="sectionRef" class="w-full flex justify-center py-10 px-2">
    <section class="max-w-3xl space-y-4">
      <header class="space-y-2 text-center">
        <h2 class="text-4xl font-bold text-title">Descubre las ventajas de usar Testor Ninja</h2>
        <p class="text-paragraph">Crea evaluaciones personalizadas y optimiza tu aprendizaje con nuestras funciones
          clave.</p>
      </header>

      <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li v-for="item in listCharacteristics" :key="item.title"
          class="characteristic-item p-4 border border-divider rounded-md text-title">
          <component :is="item.icon" :size="40" :strokeWidth="1" />
          <h3 class="font-semibold">{{ item.title }}</h3>
          <p class="text-paragraph">{{ item.description }}</p>
        </li>
      </ul>
    </section>
  </section>
</template>
