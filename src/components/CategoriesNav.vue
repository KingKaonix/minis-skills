<script setup>
defineProps({
  categories: { type: Array, default: () => [] },
  active: { type: String, default: 'all' }
})
defineEmits(['update:category'])
</script>

<template>
  <div class="flex flex-wrap gap-3 mb-8">
    <button
      @click="$emit('update:category', 'all')"
      :class="active === 'all' ? 'bg-zarion-gold text-zarion-dark' : 'bg-zarion-surface text-zarion-gray-400'"
      class="px-4 py-2 rounded-xl text-sm font-medium transition-all"
    >
      All Categories
    </button>
    <button
      v-for="cat in categories"
      :key="cat"
      @click="$emit('update:category', cat.toLowerCase())"
      :class="active === cat.toLowerCase() ? 'bg-zarion-gold text-zarion-dark' : 'bg-zarion-surface text-zarion-gray-400'"
      class="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-zarion-gold hover:text-zarion-dark"
    >
      {{ cat }}
    </button>
  </div>
</template>
