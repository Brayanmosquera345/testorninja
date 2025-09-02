<template>
  <main class="bg-background">
    <NavBar />
    <HeroSection />
    <CharacteristicSection />
    <QuestionsSection />
    <Footer />
  </main>
</template>

<script lang="ts" setup>
import HeroSection from '~/components/sections/Landing/HeroSection.vue';
import CharacteristicSection from '~/components/sections/Landing/CharacteristicSection.vue';
import QuestionsSection from '~/components/sections/Landing/QuestionsSection.vue';
import Footer from '~/components/Footer/Footer.vue';
import NavBar from '~/components/NavBar/NavBar.vue';
</script>

<style>

</style>