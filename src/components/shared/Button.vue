<script setup>
import { defineEmits, computed } from 'vue'

const props = defineProps({
  customClass: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false, required: false },
})

// Combine default classes with user-defined classes
const buttonClasses = computed(() => `${props.customClass}`)

const emit = defineEmits(['click'])
</script>

<template>
  <v-btn
    @click="emit('click')"
    height="44"
    width="100%"
    rounded="lg"
    :class="buttonClasses"
    :loading="loading"
    :disabled="disabled || loading"
  >
    <slot></slot>
  </v-btn>
</template>
