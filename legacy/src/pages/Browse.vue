<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SkillsGrid from '../components/SkillsGrid.vue'
import CategoriesNav from '../components/CategoriesNav.vue'

const router = useRouter()
const route = useRoute()
const searchQuery = ref('')
const categoryFilter = ref('all')
const skills = ref([])
const categories = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const [skillsRes, categoriesRes] = await Promise.all([
      fetch('/skills.json'),
      fetch('/categories.json')
    ])
    
    skills.value = await skillsRes.json()
    const categoriesData = await categoriesRes.json()
    categories.value = Object.keys(categoriesData)
    loading.value = false
  } catch (err) {
    console.error('Failed to load skills:', err)
    error.value = err.message
    loading.value = false
  }
  
  if (route.params.category) {
    categoryFilter.value = route.params.category
  }
})

const filteredSkills = computed(() => {
  if (!skills.value) return []
  return skills.value.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesCat = categoryFilter.value === 'all' || 
      (s.categories && s.categories.some(c => c.toLowerCase() === categoryFilter.value.toLowerCase()))
    return matchesSearch && matchesCat
  })
})

const updateCategory = (cat) => {
  categoryFilter.value = cat
  router.push({
    name: 'browse-category',
    params: cat === 'all' ? {} : { category: cat.toLowerCase() }
  })
}
</script>

<template>
  <div class="min-h-screen bg-zarion-dark">
    <section class="py-12 px-6 sm:px-10 lg:px-14">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Browse Skills
            </h2>
            <p class="text-zarion-gray-400 text-sm">
              {{ filteredSkills.length }} of {{ skills.length }} skills available
            </p>
          </div>
          
          <div class="relative inline-block w-full lg:w-72">
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zarion-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search skills..."
              v-model="searchQuery"
              class="w-full px-4 py-3 rounded-2xl bg-zarion-surface border border-zarion-border text-zarion-gray-100 placeholder-zarion-gray-500 focus:outline-none focus:ring-2 focus:ring-zarion-gold/50 focus:border-zarion-gold pl-11"
            />
          </div>
        </div>
      </div>
    </section>
    
    <section class="px-6 sm:px-10 lg:px-14 pb-12">
      <div class="max-w-7xl mx-auto">
        <CategoriesNav 
          :categories="categories" 
          :active="categoryFilter"
          @update:category="updateCategory"
        />
        <SkillsGrid :skills="filteredSkills" />
      </div>
    </section>
  </div>
</template>
