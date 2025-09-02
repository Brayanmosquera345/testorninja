<template>
    <footer class="bg-primary">
      <div class=" z-10 flex flex-col md:flex-row justify-between px-8 py-4 gap-4">
        <div class="flex flex-col md:flex-row gap-2 text-background items-center">
            <Logo :size="40" />
            <h1 class="text-background font-semibold">Testor Ninja</h1>
        </div>

        <div class="flex flex-col items-center gap-3 text-background">
          <h2 class="font-semibold">Links</h2>
          <div class="flex items-center gap-4 ">
            <a
              href="https://www.linkedin.com/in/brayan-david-mosquera-medina/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1 hover:text-accent transition"
            >
              <Linkedin :size="20" />
              <span class="text-sm"> Linkedin </span>
            </a>
          </div>
        </div>

        <div class="text-center md:text-start text-background">
          <h2 class="font-semibold">Desarrollado por</h2>
          <a
            href="https://porfolio-lemon-ten.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-accent transition-colors text-center font-light"
          >
            Brayan David Mosquera Medina
          </a>
        </div>
      </div>

      <div class="relative z-10 border-t border-divider/50 mt-6 py-4 text-center text-sm text-paragraph">
        © {{new Date().getFullYear()}} Dedicatorias. Todos los derechos reservados.
      </div>
    </footer>
</template>
<script setup lang="ts">
import Logo from '../Icons/Logo.vue';
import { Linkedin } from 'lucide-vue-next';
</script>