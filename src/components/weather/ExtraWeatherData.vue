<script setup>
const props = defineProps({
  weatherData: {
    type: String,
    required: true,
  },
  weatherName: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <v-card color="transparent" variant="flat" class="d-flex flex-column align-center w-25">
    <span class="future-icon">
      <slot name="icon"></slot>
    </span>

    <div class="d-flex flex-column align-center ga-2">
      <span class="future-deg">{{ weatherData }}</span>
      <span class="future-time">{{ weatherName }}</span>
    </div>
  </v-card>
</template>

<style scoped>
.future-time {
  font-size: 10px;
  font-weight: medium;
  line-height: 12px;
  color: white;
}

.future-deg {
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  color: white;
}
</style>
