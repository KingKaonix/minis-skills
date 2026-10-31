<script setup>
import { ref, computed, provide } from 'vue'
import { useRouter } from 'vue-router'
import Hero from '../components/Hero.vue'
import Stats from '../components/Stats.vue'
import CategoriesGrid from '../components/CategoriesGrid.vue'

const router = useRouter()
const searchQuery = ref('')

provide('searchQuery', searchQuery)

const browseSkills = () => {
  router.push('/browse')
}
</script>

<template>
  <div class="min-h-screen bg-zarion-dark">
    <Hero 
      :skillCount="5143" 
      :categoryCount="31"
      @update:searchQuery="browseSkills"
    />

    <section class="py-20 px-6 sm:px-10 lg:px-14 bg-zarion-dark">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Browse by Category
          </h2>
          <p class="text-zarion-gray-400 text-sm max-w-2xl mx-auto">
            All categories are carefully organized to help you discover the most relevant skills for your needs.
          </p>
        </div>
        
        <CategoriesGrid />
      </div>
    </section>
  </div>
</template>
