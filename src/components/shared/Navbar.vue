<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../../../utils/supabase'
import Button from './Button.vue'
import Dropdown from './Dropdown.vue'
import Cookies from 'js-cookie'
import { useQueryClient } from '@tanstack/vue-query'

const route = useRoute()
const router = useRouter()

const queryClient = useQueryClient()

async function signOut() {
  await supabase.auth.signOut()

  queryClient.clear()
  Cookies.remove('access_token')
  router.replace('/login')
}
</script>

<template>
  <header class="header">
    <nav class="container nav">
      <RouterLink to="/" class="home-link" exact> Ultimate Weather </RouterLink>

      <Dropdown v-if="route.path === '/weather'" :items="[]" :last-item="true">
        <template #button>
          <v-img
            :width="40"
            :height="40"
            rounded="circle"
            aspect-ratio="1/1"
            cover
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          ></v-img>
        </template>

        <template #last-item>
          <Button @click="signOut">Logout</Button>
        </template>
      </Dropdown>
    </nav>
  </header>
</template>

<style scoped>
.header {
  height: 4rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ffffff33;
}

.home-link {
  font-family: 'Italianno', cursive;
  font-size: 2rem;
  color: #ffffffcc;
  text-decoration: none;
  transition: color 0.3s;
}

.home-link:hover,
.home-link:focus {
  color: #ffffff;
  text-decoration: underline;
  outline: none;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
