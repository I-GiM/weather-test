<script setup>
import { ref } from 'vue'
import Button from '../shared/Button.vue'
import { supabase } from '../../../utils/supabase'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'

const router = useRouter()

const formDetails = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
})

const formRules = {
  valid: true,
  emailRules: [
    (value) => {
      if (value) return true

      return 'E-mail is required.'
    },
    (value) => {
      if (/.+@.+\..+/.test(value)) return true

      return 'E-mail must be valid.'
    },
  ],
  passwordRules: [
    (value) => {
      if (value) return true

      return 'Password is required.'
    },
  ],
}

const { mutate: loginMutate, isPending: loginPending } = useMutation({
  mutationKey: ['login'],
  mutationFn: async () => {
    try {
      const { data } = await supabase.auth.signInWithPassword({
        email: formDetails.value.email,
        password: formDetails.value.password,
      })

      return data
    } catch (error) {
      throw error
    }
  },
  onSuccess: (data) => {
    Cookies.set('access_token', data.session.access_token)
    router.replace('/weather')
  },
})

function signInWithEmail() {
  loginMutate()
}
</script>

<template>
  <section class="section">
    <v-form v-on:submit.prevent="signInWithEmail" v-model="formRules.valid" class="form">
      <h1 class="form-heading">Login</h1>

      <v-container class="form-contain">
        <v-label class="form-group">
          Email

          <v-text-field
            variant="outlined"
            density="comfortable"
            type="email"
            v-model="formDetails.email"
            :rules="formRules.emailRules"
            placeholder="Enter email"
            width="100%"
            class="form-input"
            rounded="lg"
            required
          ></v-text-field>
        </v-label>

        <v-label class="form-group">
          Password

          <v-text-field
            variant="outlined"
            density="comfortable"
            type="password"
            v-model="formDetails.password"
            :rules="formRules.passwordRules"
            placeholder="**********"
            width="100%"
            class="form-input"
            rounded="lg"
            required
          ></v-text-field>
        </v-label>
      </v-container>

      <Button type="submit" custom-class="form-btn" :loading="loginPending">Login</Button>

      <span class="redirect-text">
        Don't have an account?
        <RouterLink to="/sign-up" class="redirect-text-link">Sign up</RouterLink>
      </span>
    </v-form>
  </section>
</template>

<style lang="css" scoped>
.section {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  height: calc(100dvh - 100px);
}

.form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.form-heading {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}

.form .form-contain {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  font-size: 14px;
}

.form-input {
  font-size: 12px;
}

.form-btn {
  margin-top: 24px;
}

.redirect-text {
  width: 100%;
  display: inline-block;
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  line-height: 20px;
  font-weight: medium;
  color: #9e9e9e;
}

.redirect-text-link {
  color: white;
  text-decoration: none;
}

.redirect-text-link:hover,
.redirect-text-link:focus {
  text-decoration: underline;
}

@media (min-width: 1024px) {
  .section {
    margin-top: 72px;
  }
}
</style>
