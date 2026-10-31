<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const skill = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/skills.json')
    const skills = await response.json()
    skill.value = skills.find(s => s.id === route.params.skillId) || skills.find(s => s.name === route.params.skillId)
    loading.value = false
  } catch (err) {
    console.error('Failed to load skill:', err)
    loading.value = false
  }
})

const downloadSkill = () => {
  if (skill.value?.source) {
    window.open(skill.value.source, '_blank')
  }
}
</script>

<template>
  <div v-if="loading" class="min-h-screen bg-zarion-dark flex items-center justify-center pt-24">
    <div class="text-center">
      <div class="w-12 h-12 border-2 border-zarion-gold/30 border-t-zarion-gold rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-zarion-gray-400">Loading skill details...</p>
    </div>
  </div>
  
  <div v-else-if="!skill" class="min-h-screen bg-zarion-dark flex items-center justify-center pt-24">
    <div class="text-center py-20">
      <div class="w-20 h-20 rounded-full bg-zarion-surface border border-zarion-border flex items-center justify-center mx-auto mb-8">
        <svg class="w-10 h-10 text-zarion-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 9.75v6m-3 3l9-9m-3 3v6M9 9v6M6 9v6" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">Skill Not Found</h3>
      <p class="text-zarion-gray-400 mb-6">The requested skill could not be found.</p>
      <button @click="$router.push('/')" class="px-6 py-3 bg-zarion-gradient text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
        Browse All Skills
      </button>
    </div>
  </div>

  <div v-else class="min-h-screen bg-zarion-dark py-12 px-6 sm:px-10 lg:px-14 pt-24">
    <div class="max-w-4xl mx-auto">
      <button @click="$router.push('/browse')" class="text-zarion-gray-400 hover:text-zarion-gold mb-8 text-sm font-medium flex items-center gap-2 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to browse
      </button>

      <div class="bg-zarion-surface border border-zarion-border rounded-3xl p-8 sm:p-12 shadow-[0_20px_40px_rgba(59,130,246,0.1)] mb-8">
        <div class="flex items-start justify-between mb-6">
          <div class="w-12 h-12 rounded-xl bg-zarion-gradient flex items-center justify-center shadow-lg">
            <span class="text-white text-sm font-bold">{{ skill.name.charAt(0).toUpperCase() }}</span>
          </div>
          <div class="flex gap-2 flex-wrap">
            <span v-for="cat in skill.categories" :key="cat" class="px-3 py-1 bg-zarion-blue/10 text-zarion-blue text-xs rounded-full border border-zarion-blue/20">
              {{ cat }}
            </span>
          </div>
        </div>

        <h1 class="text-3xl sm:text-4xl font-bold text-white mb-4">{{ skill.name }}</h1>
        
        <div class="flex items-center gap-4 mb-8">
          <span class="text-zarion-gold text-sm font-medium">Source:</span>
          <a :href="skill.source" target="_blank" rel="noopener noreferrer" class="text-zarion-gray-400 hover:text-zarion-gold transition-colors text-sm truncate">
            {{ skill.source }}
          </a>
        </div>

        <div class="prose prose-zarion max-w-none">
          <p class="text-zarion-gray-300 text-lg leading-relaxed">{{ skill.description || 'No description available' }}</p>
        </div>

        <div class="mt-12 pt-8 border-t border-zarion-border flex gap-4">
          <button 
            @click="downloadSkill"
            class="px-8 py-3 bg-zarion-gradient text-white text-sm font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 hover:bg-zarion-gradient-hover"
          >
            Download Skill
          </button>
          <button class="px-8 py-3 bg-zarion-surface border border-zarion-border text-zarion-gray-300 rounded-xl text-sm font-medium hover:bg-zarion-surface-hover transition-colors">
            Share
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
