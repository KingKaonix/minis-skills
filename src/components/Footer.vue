<script setup>
const skillCount = '5,143'
const categoryCount = '31'
</script>

<template>
  <footer class="border-t border-zarion-border bg-zarion-surface py-12 px-6 sm:px-10 lg:px-14">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-xl bg-zarion-gradient flex items-center justify-center">
          <span class="text-white text-xs font-bold">M</span>
        </div>
        <span class="text-xl font-bold tracking-tight text-zarion-gold">Minis<span class="text-zarion-gray-300">Skills</span></span>
      </div>
      
      <div class="text-zarion-gray-500 text-sm font-medium text-center">
        <p class="mb-2">{{ skillCount }} Skills · {{ categoryCount }} Categories</p>
        <p>MinisSkills Repository · Open Source</p>
      </div>
      
      <div class="flex items-center gap-6 text-zarion-gray-400 text-sm">
        <a href="#" class="hover:text-zarion-gold transition-colors">GitHub</a>
        <a href="#" class="hover:text-zarion-gold transition-colors">Documentation</a>
        <a href="/add-skill" class="hover:text-zarion-gold transition-colors">Add Skill</a>
      </div>
    </div>
  </footer>
</template>
