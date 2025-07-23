<template>
    <li class="p-4 rounded-md border border-gray-300 flex items-start justify-between gap-4 bg-white">
        <div>
            <p class="text-gray-600 text-sm">Pregunta {{ number }}:</p>
            <p class="text-gray-900 font-bold">{{ question }}</p>
            <p class="text-sm mt-1">
                <span class="text-gray-600">Tu respuesta: </span>
                <span class="text-gray-900 font-bold">{{ responseUser }}</span>
            </p>
            <p class="text-sm">
                <span class=" text-gray-600">Respuesta correcta: </span>
                <span class="text-gray-900 font-bold">{{ response }}</span>
            </p>
        </div>
        <div>
            <XCircleIcon v-if="isError" class="text-red-600" />
            <CheckCircle v-else class="text-green-600" />
        </div>
    </li>
</template>
<script setup lang="ts">
import { CheckCircle, XCircleIcon } from 'lucide-vue-next';

defineProps({
    isError:{
        type: Boolean,
        default: false
    },
    question: {
        type: String,
        default: 'pregunta'
    },
    number:{
        type : Number,
        default: 0
    },
    response:{
            type: String,
            default: ''
    },
    responseUser:{
        type:String,
        default: ''
    }
})

</script>