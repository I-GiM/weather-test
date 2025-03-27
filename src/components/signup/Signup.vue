<script setup>
import { ref } from 'vue'
import { supabase } from '../../../utils/supabase'
import Button from '../shared/Button.vue'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

const router = useRouter()

const formDetails = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
})
const snackbar = ref({
  show: false,
  text: '',
})

const formRules = {
  valid: true,
  nameRules: [
    (value) => {
      if (value) return true

      return 'Name is required.'
    },
  ],
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

const { mutate: signupMutate, isPending: signupPending } = useMutation({
  mutationKey: ['login'],
  mutationFn: async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formDetails.value.email,
        password: formDetails.value.password,

        options: {
          emailRedirectTo: `${import.meta.env.VITE_BASE_URL}/login`,
          data: {
            firstname: formDetails.value.firstname,
            lastname: formDetails.value.lastname,
          },
        },
      })

      if (error) throw error

      return data
    } catch (error) {
      throw error
    }
  },
  onSuccess: () => {
    snackbar.value = { show: true, text: error.message }
    router.replace('/login')
  },
  onError: (error) => {
    snackbar.value = { show: true, text: error.message }
  },
})

function signUpNewUser() {
  signupMutate()
}
</script>

<template>
  <section class="section">
    <v-form v-on:submit.prevent="signUpNewUser" v-model="formRules.valid" class="form">
      <h1 class="form-heading">Signup</h1>

      <v-container class="form-contain">
        <v-label class="form-group">
          First name

          <v-text-field
            variant="outlined"
            density="comfortable"
            v-model="formDetails.firstname"
            :rules="formRules.nameRules"
            placeholder="Enter first name"
            width="100%"
            class="form-input"
            rounded="lg"
            required
          ></v-text-field>
        </v-label>

        <v-label class="form-group">
          Last name

          <v-text-field
            variant="outlined"
            density="comfortable"
            v-model="formDetails.lastname"
            :rules="formRules.nameRules"
            placeholder="Enter last name"
            width="100%"
            class="form-input"
            rounded="lg"
            required
          ></v-text-field>
        </v-label>

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

      <Button type="submit" custom-class="form-btn" :loading="signupPending">Signup</Button>

      <span class="redirect-text">
        Have an account?
        <RouterLink to="/login" class="redirect-text-link">Login</RouterLink>
      </span>
    </v-form>
  </section>
  <v-snackbar v-model="snackbar.show" :timeout="3000" color="white">
    {{ snackbar.text }}
  </v-snackbar>
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
