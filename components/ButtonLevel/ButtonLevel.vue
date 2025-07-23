<template>
  <button
    class="p-1  rounded-full px-4 text-sm cursor-pointer border hover:bg-white hover:text-gray-700 hover:border-gray-700 transition-colors duration-200"
    :class="selected ? 'bg-white text-gray-700 border-gray-700' : 'bg-gray-100 text-gray-500 border-gray-300'">
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
defineProps({
  selected: Boolean,
  text: String
})
</script>