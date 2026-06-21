<template>
  <div class="d-flex align-center justify-center fill-height">
    <v-card
      width="500"
      class="px-2 py-4"
      height="500"
    >
      <v-card-title class="text-center d-flex flex-column">
        <div v-html="logo" />

        <h5
          class="text-h5 mb-1"
          style="color: #ddd942"
        >
          ورود به سیستم
        </h5>
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-row class="pa-0 ma-0">
            <v-col cols="12">
              <v-text-field
                v-model="form.email"
                dir="ltr"
                label="ایمل ادرس"
                type="email"
                @keydown.enter="submit"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="form.password"
                dir="ltr"
                label="پسورد"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                @keydown.enter="submit"
              />
            </v-col>

            <v-col cols="12">
              <v-btn
                block
                @click="submit"
              >
                ورود به سیستم
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import logo from '@/assets/logo.svg?raw'
import useAuth from '@/plugins/authServices'
const form = ref({
  email: '',
  password: '',
})
const { login } = useAuth()

const isPasswordVisible = ref(false)
const submit = () => {
  login(form.value.email, form.value.password)
}
</script>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';
</style>

<route lang="yaml">
meta:
  layout: blank
  auth: false
</route>
