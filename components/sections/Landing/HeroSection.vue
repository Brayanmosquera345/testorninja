<template>
    <section id="hero" class="flex flex-col py-4 space-y-6 px-2">
        <div id="text" class="flex flex-col items-center justify-center gap-4">
            <h1 class="text-5xl font-bold text-title max-w-3xl text-center">Evalua tu conocimiento sin importar el tema</h1>
            <p class="text-paragraph max-w-3xl text-center">Crea cuestionarios de selección múltiple sobre cualquier tema, pon a prueba tus conocimientos y aprende de forma divertida.</p>
            <button @click="showChat" class="btn-primary-full btn-lg flex gap-2 items-center">
                Crear evaluación
                <ArrowRight />
            </button>
        </div>
        <div class="w-full bg-gradient-to-b from-background via-secondary to-background h-96 overflow-hidden relative">
            <div
                class="bg-gradient-to-t from-background via-transparent to-transparent w-full h-20 absolute bottom-0 z-10">
            </div>
            <img id="image1" class="absolute -rotate-12 top-5 left-[15%] md:left-[35%]"
                src="https://res.cloudinary.com/dlmhszrtv/image/upload/v1756745517/mokup-landing-1_beakcn.png"
                alt="Telefono con testor Ninja">
            <img id="image2" class="absolute rotate-12 top-5 left-[20%] md:left-[40%]"
                src="https://res.cloudinary.com/dlmhszrtv/image/upload/v1756745517/mokup-landing-2_m7tcu0.png"
                alt="Telefono con testor Ninja">
        </div>
    </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import { gsap } from 'gsap';


const animate = () => {
    gsap.from("#image1", {
        x: "-50%",
        y: "50%",
        rotate: 12,
        duration: 1,
        ease: "power1.inOut",
    });

    gsap.from("#image2", {
        x: "50%",
        y: "50%",
        rotate: -12,
        duration: 1,
        ease: "power1.inOut",
    });

    gsap.from("#text", {
        opacity: 0,
        y: "-50%",
        duration: 1,
        ease: "power1.inOut",
    });
}

const showChat = () => {
  navigateTo('/chat')
}


onMounted(() => {
    animate();
})

</script>