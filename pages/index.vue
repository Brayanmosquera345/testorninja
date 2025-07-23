<template>
    <BaseLayout>
        <main class="flex items-center justify-center min-h-full">
            <LoaderTest v-if="isLoading" />
            <section v-else class="text-center space-y-4 flex flex-col items-center">
                <Logo :size="80" />
                <h1 class="text-3xl font-bold">Bienvenido a testorninja</h1>
                <p class="text-gray-700 w-full md:w-2/3">
                    ¡Pon a prueba lo que sabes! Escribe el tema que quieres evaluar, elige el nivel y recibe al instante una prueba de 10 preguntas.
                </p>
                <section v-if="isError" class="p-2 bg-red-100 rounded-md border border-red-300 text-red-700 w-full">
                    <p class="text-red-700">
                        <span class="font-bold">¡Error!</span> {{ errorMessage }}
                    </p>
                </section>
                <div class="p-2 border bg-white border-gray-300 rounded-md shadow-md w-full">
                    <div class="flex w-full">
                        <input v-model="prompt" class="p-2 w-full outline-none text-gray-700"
                            placeholder="Escribe el tema de la evaluación" type="text">
                        <button @click="generateTestLocal" class="flex items-center justify-center btn-primary-full"
                            :disabled="prompt === ''">
                            <Loader v-if="isLoading" class="animate-spin" />
                            <ArrowUp v-else />
                        </button>
                    </div>
                    <div class="flex gap-2">
                        <ButtonLevel text="Basico" :selected="level === 'basic'" @click="level = 'basic'" />
                        <ButtonLevel text="Medio" :selected="level === 'medium'" @click="level = 'medium'" />
                        <ButtonLevel text="Experto" :selected="level === 'expert'" @click="level = 'expert'" />
                    </div>
                </div>
            </section>
        </main>
    </BaseLayout>
</template>

<script setup lang="ts">
import type { Question } from '~/types/Question';
import { ArrowUp, Loader } from 'lucide-vue-next';
import { generateTest } from '~/service/AgentService';
import ButtonLevel from '~/components/ButtonLevel/ButtonLevel.vue';
import Logo from '~/components/Icons/Logo.vue';
import LoaderTest from '~/components/LoaderTest/LoaderTest.vue';
import { useQuestionStore } from '~/store/QuestionStore';
import BaseLayout from '~/layouts/BaseLayout.vue';

const isLoading = ref(false)
const isError = ref(false)
const errorMessage = ref('')
const prompt = ref('')
const level = ref('basic')

const storeQuestion = useQuestionStore()

const generateTestLocal = async () => {
    try {
        isLoading.value = true;
        isError.value = false
        const response = await generateTest(prompt.value, level.value);
        const questions: Question[] = JSON.parse(response?.result)
        if (response?.result !== '0') {
            storeQuestion.questions = questions
            storeQuestion.topic = prompt.value
            storeQuestion.level = level.value
            navigateTo('/prueba')
        } else {
            isError.value = true
            errorMessage.value = 'No se pudo generar la prueba. Por favor, revisa el tema que escribiste y vuelve a intentarlo.'
        }
    } catch (error) {
        console.log(error);
        isError.value = true
        errorMessage.value = 'Lo sentimos, hubo un error interno. Por favor, vuelve a intentarlo más tarde.'
    } finally {
        isLoading.value = false
    }
}

</script>