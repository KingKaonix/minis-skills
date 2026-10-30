<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const formData = ref({
  name: '',
  description: '',
  source: '',
  categories: []
})

const success = ref(false)
const error = ref(null)
const submitting = ref(false)

const allCategories = [
  'Coding Agents & IDEs', 'Web & Frontend Development', 'DevOps & Cloud', 
  'Search & Research', 'Browser & Automation', 'Productivity & Tasks', 
  'CLI Utilities', 'Image & Video Generation', 'AI & LLMs', 'Git & GitHub',
  'Data & Analytics', 'Security & Compliance', 'Testing & QA', 'Documentation',
  'Design & UX', 'Mobile Development', 'Game Development', 'Blockchain & Web3'
]

const submit = async () => {
  if (!formData.value.name.trim()) {
    error.value = 'Skill name is required'
    return
  }
  
  submitting.value = true
  error.value = null
  
  await new Promise(r => setTimeout(r, 1500))
  
  submitting.value = false
  success.value = true
  
  setTimeout(() => {
    success.value = false
    router.push('/')
  }, 2000)
}

const toggleCategory = (cat) => {
  if (formData.value.categories.includes(cat)) {
    formData.value.categories = formData.value.categories.filter(c => c !== cat)
  } else {
    formData.value.categories.push(cat)
  }
}
</script>

<template>
  <div class="min-h-screen bg-zarion-dark py-12 px-6 sm:px-10 lg:px-14 pt-24">
    <div class="max-w-2xl mx-auto">
      <button @click="$router.push('/')" class="text-zarion-gray-400 hover:text-zarion-gold mb-8 text-sm font-medium flex items-center gap-2 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to skills
      </button>
      
      <div class="bg-zarion-surface border border-zarion-border rounded-3xl p-8 sm:p-12 shadow-[0_20px_40px_rgba(59,130,246,0.1)]">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-xl bg-zarion-gradient flex items-center justify-center">
            <span class="text-white text-xs font-bold">+</span>
          </div>
          <h2 class="text-2xl font-bold text-white">Add a New Skill</h2>
        </div>
        
        <div v-if="success" class="bg-zarion-green/10 border border-zarion-green/20 rounded-xl p-6 mb-8 flex items-start gap-4">
          <div class="w-8 h-8 rounded-full bg-zarion-green flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 class="text-zarion-green font-bold mb-1">Skill Added</h4>
            <p class="text-zarion-gray-400 text-sm">Your new skill has been added to the repository.</p>
          </div>
        </div>
        
        <div v-if="error" class="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8 flex items-start gap-4">
          <div class="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <h4 class="text-red-400 font-bold mb-1">Error</h4>
            <p class="text-zarion-gray-400 text-sm">{{ error }}</p>
          </div>
        </div>
        
        <form @submit.prevent="submit" class="space-y-6">
          <div>
            <label class="block text-xs font-bold text-zarion-gray-400 uppercase tracking-wider mb-3">Skill Name</label>
            <input
              type="text"
              v-model="formData.name"
              placeholder="e.g. claude-code"
              required
              class="w-full px-5 py-4 rounded-2xl bg-zarion-dark border border-zarion-border text-white placeholder-zarion-gray-600 focus:outline-none focus:ring-2 focus:ring-zarion-gold/50 focus:border-zarion-gold transition-all"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-zarion-gray-400 uppercase tracking-wider mb-3">Description</label>
            <textarea
              v-model="formData.description"
              rows="3"
              placeholder="Describe what this skill does..."
              class="w-full px-5 py-4 rounded-2xl bg-zarion-dark border border-zarion-border text-white placeholder-zarion-gray-600 focus:outline-none focus:ring-2 focus:ring-zarion-gold/50 focus:border-zarion-gold resize-none transition-all"
            ></textarea>
          </div>

          <div>
            <label class="block text-xs font-bold text-zarion-gray-400 uppercase tracking-wider mb-3">Source URL</label>
            <input
              type="url"
              v-model="formData.source"
              placeholder="https://clawskills.sh/skills/author/skill-name"
              class="w-full px-5 py-4 rounded-2xl bg-zarion-dark border border-zarion-border text-white placeholder-zarion-gray-600 focus:outline-none focus:ring-2 focus:ring-zarion-gold/50 focus:border-zarion-gold transition-all"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-zarion-gray-400 uppercase tracking-wider mb-3">Categories</label>
            <div class="flex flex-wrap gap-3">
              <label v-for="cat in allCategories" :key="cat" class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  :value="cat"
                  :checked="formData.categories.includes(cat)"
                  @change="toggleCategory(cat)"
                  class="w-4 h-4 rounded border-zarion-border bg-zarion-dark focus:ring-zarion-gold/50 cursor-pointer"
                />
                <span class="text-sm text-zarion-gray-300">{{ cat }}</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            :disabled="submitting || !formData.name.trim()"
            class="w-full px-8 py-4 rounded-2xl text-white text-sm font-bold shadow-lg transition-all duration-300"
            :class="submitting || !formData.name.trim() 
              ? 'bg-zarion-gray-600 cursor-not-allowed' 
              : 'bg-zarion-gradient hover:bg-zarion-gradient-hover hover:scale-[1.02] active:scale-95'"
          >
            {{ submitting ? 'Adding...' : 'Add Skill to Repository' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
