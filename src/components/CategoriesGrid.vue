<script setup>
defineProps({
  skills: { type: Array, default: () => [] }
})
</script>

<template>
  <section class="py-12 px-6 sm:px-10 lg:px-14 bg-zarion-dark">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="(skill, index) in skills.slice(0, 12)"
        :key="skill.id || index"
        class="cursor-pointer bg-zarion-surface border border-zarion-border rounded-2xl p-6 hover:border-zarion-gold/30 hover:bg-zarion-surface-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] flex flex-col min-h-[280px]"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="w-8 h-8 rounded-lg bg-zarion-gradient flex items-center justify-center">
            <span class="text-white text-xs font-bold">{{ (skill.name || '')[0].toUpperCase() }}</span>
          </div>
          <div class="w-2 h-2 rounded-full bg-zarion-gold/20 group-hover:bg-zarion-gold transition-colors"></div>
        </div>
        
        <h3 class="text-lg font-bold text-white mb-2 group-hover:text-zarion-gold transition-colors line-clamp-1">
          {{ skill.name }}
        </h3>
        
        <p class="text-zarion-gray-400 text-sm leading-relaxed line-clamp-2 flex-grow">
          {{ skill.description || 'No description available' }}
        </p>
        
        <div class="flex items-center justify-between text-xs text-zarion-gray-500 mt-auto">
          <span class="truncate max-w-[80%]">
            {{ skill.source?.replace('https://clawskills.sh/skills/', '') || skill.id }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
