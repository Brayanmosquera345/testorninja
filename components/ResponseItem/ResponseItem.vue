<template>
    <div class="flex justify-between items-center p-4 w-full border  rounded-md bg-white cursor-pointer hover:border-gray-900 transition-colors duration-200"
        :class="selected ? 'border-gray-900 shadow-sm' : 'border-gray-300'">
        <p>{{ response }}</p>
        <button class="p-2 border border-gray-900 rounded-full" :class="{ 'bg-gray-900': selected }">
        </button>
    </div>
</template>
<script setup lang="ts">

defineProps({
    response: {
        type: String,
        default: ''
    },
    selected: {
        type: Boolean,
        default: false
    }
})

</script>