<script setup>
defineProps({
  skillCount: { type: Number, default: 5143 },
  categoryCount: { type: Number, default: 31 }
})

defineEmits(['update:searchQuery'])
</script>

<template>
  <section class="relative py-32 sm:py-48 px-6 sm:px-10 lg:px-14 overflow-hidden bg-zarion-dark">
    <div class="absolute inset-0 -z-10">
      <div class="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-zarion-gradient/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-zarion-blue/10 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-5xl mx-auto text-center relative z-10">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zarion-surface/50 border border-zarion-border/50 mb-8 text-xs font-bold tracking-widest text-zarion-gold uppercase">
        <span class="w-2 h-2 rounded-full bg-zarion-gold animate-pulse"></span>
        {{ skillCount }} Skills · {{ categoryCount }} Categories
      </div>
      
      <h1 class="text-5xl sm:text-7xl font-bold tracking-tight leading-none text-white mb-8">
        Minis Skills
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-zarion-gold via-zarion-blue to-zarion-purple">Repository</span>
      </h1>
      
      <p class="text-zarion-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
        Browse, search, and download professional Minis skills. The largest collection of AI agent capabilities,
        converted to MinisSkills format and organized for instant discovery.
      </p>
      
      <div class="relative mx-auto w-full max-w-2xl">
        <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-zarion-gray-500 z-10">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search skills..."
          @input="$emit('update:searchQuery', $event.target.value)"
          class="w-full px-6 py-4 rounded-2xl bg-zarion-surface border border-zarion-border text-zarion-foreground placeholder-zarion-gray-500 focus:outline-none focus:ring-2 focus:ring-zarion-gold/50 focus:border-zarion-gold transition-all text-lg pl-11"
        />
      </div>
    </div>
  </section>
</template>

<style>
.text-zarion-foreground {
  color: #f9fafb;
}
</style>
