<template>
  <header id="navbar" class="sticky top-4 z-20 mb-4 mx-4">
    <!-- Header desktop -->
    <header
      v-if="!isMobileMenuOpen"
      id="menu-desktop"
      class="bg-white items-center border border-divider/50 py-2 px-4  rounded-full shadow-md"
    >
      <nav class="flex items-center justify-between w-full">
        <a href="#hero" class="text-xl font-bold flex items-center gap-2">
          <Logo :size="40" />
          Testor Ninja
        </a>

        <ul class="hidden md:flex gap-4 text-paragraph transition-colors duration-200">
          <li>
            <a
              href="#hero"
              class="link"
              :class="activeSection === 'hero' ? 'link-active' : 'link-inactive'"
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#characteristics"
              class="link"
              :class="activeSection === 'characteristics' ? 'link-active' : 'link-inactive'"
            >
              Características
            </a>
          </li>
          <li>
            <a
              href="#questions"
              class="link"
              :class="activeSection === 'questions' ? 'link-active' : 'link-inactive'"
            >
              Preguntas frecuentes
            </a>
          </li>
        </ul>

        <button @click="openMenu" class="md:hidden">
          <Menu :size="24" />
        </button>

        <div class="hidden md:block">
          <button @click="showChat" class="btn-primary-full btn-md">Crear prueba</button>
        </div>
      </nav>
    </header>

    <!-- Header móvil -->
    <header
      v-else
      id="mobile-menu"
      class="sticky top-4 z-10 bg-white items-center border py-2 px-4 m-4 rounded-2xl shadow-md md:hidden"
    >
      <nav class="w-full">
        <div class="flex items-center justify-between w-full">
          <a href="#hero" class="text-xl font-bold">BM</a>
          <button @click="closeMenu">
            <X :size="24" />
          </button>
        </div>

        <div class="w-full flex flex-col gap-4 justify-center mt-4">
          <ul class="w-full space-y-2">
            <li>
              <a
                href="#hero"
                class="link"
                :class="activeSection === 'hero' ? 'link-active' : 'link-inactive'"
                @click="closeMenu"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#characteristics"
                class="link"
                :class="activeSection === 'characteristics' ? 'link-active' : 'link-inactive'"
                @click="closeMenu"
              >
                Características
              </a>
            </li>
            <li>
              <a
                href="#questions"
                class="link"
                :class="activeSection === 'questions' ? 'link-active' : 'link-inactive'"
                @click="closeMenu"
              >
                Preguntas frecuentes
              </a>
            </li>
          </ul>

          <button @click="showChat" class="btn-primary btn-md">Crear prueba</button>
        </div>
      </nav>
    </header>
  </header>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { Menu, X } from "lucide-vue-next";
import Logo from "../Icons/Logo.vue";

const isMobileMenuOpen = ref(false);
const activeSection = ref<string>("hero");

const openMenu = () => {
  isMobileMenuOpen.value = true;
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
};

const showChat = () => {
  navigateTo('/chat')
}

const animateMenu = () => {
  gsap.from("#navbar", {
    y: "-100%",
    duration: 1,
    ease: "power1.inOut",
  });
};

const isActiveNavbar = () => {
  const sections = document.querySelectorAll<HTMLElement>(
    "#hero, #characteristics, #questions"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      }
    },
    { threshold: 0.5 } // se activa cuando el 50% de la sección es visible
  );

  sections.forEach((section) => observer.observe(section));

  onBeforeUnmount(() => {
    sections.forEach((section) => observer.unobserve(section));
  });
};

// Detectar la sección activa con IntersectionObserver
onMounted(() => {
    isActiveNavbar();
    animateMenu();
});
</script>
