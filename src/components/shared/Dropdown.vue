<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  lastItem: {
    type: Boolean,
    default: false,
  },
  customMenuClass: {
    type: String,
    default: '',
  },
  customBtnClass: {
    type: String,
    default: '',
  },
})

const menuClasses = computed(() => `${props.customMenuClass}`)
</script>

<template>
  <v-menu transition="scale-transition" :class="menuClasses">
    <template v-slot:activator="{ props }">
      <v-btn color="transparent" class="dropdown-btn ps-0" v-bind="props">
        <slot name="button"></slot>
      </v-btn>
    </template>

    <v-list bg-color="#212121">
      <v-list-item v-for="(item, i) in items" :key="i" :value="i">
        <v-list-item-title>{{ item }}</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="lastItem" style="padding: 0">
        <v-list-item-title>
          <slot name="last-item"></slot>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style lang="css" scoped>
.dropdown {
  position: relative;
}

.dropdown-btn {
  width: fit-content;
  height: fit-content;
  box-shadow: none;
}
</style>
