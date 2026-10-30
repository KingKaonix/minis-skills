<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  skills: { type: Array, default: () => [] }
})

const router = useRouter()

const viewSkill = (skillId) => {
  router.push(`/skill/${skillId}`)
}
</script>

<template>
  <div v-if="skills.length === 0" class="py-20 text-center">
    <div class="w-20 h-20 rounded-full bg-zarion-surface border border-zarion-border flex items-center justify-center mx-auto mb-6">
      <svg class="w-8 h-8 text-zarion-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M20 12H4" />
      </svg>
    </div>
    <h3 class="text-xl font-medium text-white mb-2">No skills found</h3>
    <p class="text-zarion-gray-500">Try adjusting your search or category filter.</p>
  </div>
  
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <div
      v-for="skill in skills"
      :key="skill.id"
      class="group cursor-pointer bg-zarion-surface border border-zarion-border rounded-2xl p-6 hover:border-zarion-gold/30 hover:bg-zarion-surface-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(59,130,246,0.10)]"
      @click="viewSkill(skill.id)"
    >
      <div class="flex items-start justify-between mb-4">
        <div class="w-8 h-8 rounded-lg bg-zarion-gradient flex items-center justify-center">
          <span class="text-white text-xs font-bold">{{ skill.name.charAt(0).toUpperCase() }}</span>
        </div>
        <div class="w-2 h-2 rounded-full bg-zarion-gold/20 group-hover:bg-zarion-gold transition-colors"></div>
      </div>
      
      <h3 class="text-lg font-bold text-white mb-2 group-hover:text-zarion-gold transition-colors">
        {{ skill.name }}
      </h3>
      
      <p class="text-zarion-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
        {{ skill.description || 'No description available' }}
      </p>
      
      <div class="flex items-center justify-between text-xs text-zarion-gray-500">
        <span class="truncate max-w-[70%]">
          {{ skill.source?.replace('https://clawskills.sh/skills/', '') || skill.id }}
        </span>
        <button class="text-zarion-blue hover:text-zarion-gold flex items-center gap-1">
          View
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
