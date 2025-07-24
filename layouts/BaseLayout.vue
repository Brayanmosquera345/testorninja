<template>
    <main class="h-screen bg-gradient-to-r from-blue-100 via-orange-100 to-blue-100 px-4 flex flex-col">
        <div class="flex-1">
            <slot></slot>
        </div>
        <footer class="flex justify-center items-center p-4">
            <p class="text-center text-gray-700">Hecho con 💗 por <a  href="https://www.linkedin.com/in/brayan-david-mosquera-medina-143970253/" target="_blank">Brayan Mosquera</a></p>
        </footer>
    </main>
</template>