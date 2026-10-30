<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const scrolled = ref(false)

onMounted(() => {
  const handleScroll = () => {
    scrolled.value = window.scrollY > 40
  }
  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav 
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="scrolled ? 'bg-zarion-dark/95 backdrop-blur-xl border-b border-zarion-border/50' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
      <div class="flex items-center gap-3 cursor-pointer">
        <div class="w-9 h-9 rounded-xl bg-zarion-gradient flex items-center justify-center shadow-lg">
          <span class="text-xs font-bold tracking-widest text-white">M</span>
        </div>
        <span class="text-2xl font-bold tracking-tight text-zarion-gold">Minis<span class="text-zarion-gray-300">Skills</span></span>
      </div>
      
      <div class="hidden lg:flex items-center gap-8">
        <RouterLink to="/" class="text-zarion-gray-400 hover:text-zarion-gold transition-colors font-medium text-sm">Home</RouterLink>
        <RouterLink to="/browse" class="text-zarion-gray-400 hover:text-zarion-gold transition-colors font-medium text-sm">Skills</RouterLink>
        <RouterLink to="/add-skill" class="text-zarion-gray-400 hover:text-zarion-gold transition-colors font-medium text-sm">Add Skill</RouterLink>
      </div>

      <div class="flex items-center gap-3">
        <button class="px-5 py-2.5 rounded-xl bg-zarion-gradient text-white text-xs font-bold shadow-zarion transform hover:scale-105 transition-all duration-200">
          Download All
        </button>
      </div>
    </div>
  </nav>
</template>
