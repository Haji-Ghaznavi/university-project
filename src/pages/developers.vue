<template>
  <v-card
    v-for="item in developerDetails"
    :key="item.id"
    class="developer-card rounded-lg ma-4"
    elevation="3"
  >
    <div class="card-overlay"></div>

    <v-row class="ma-0 align-center">
      <!-- Profile Section -->
      <v-col
        cols="12"
        md="4"
        class="d-flex justify-center py-8"
      >
        <div class="profile-wrapper">
          <img
            :src="item.profile"
            alt="profile"
            class="profile-image"
          />
        </div>
      </v-col>

      <!-- Name Section -->
      <v-col
        cols="12"
        md="4"
        class="text-center text-md-start"
      >
        <div class="name-section">
          <div class="d-flex align-center justify-center justify-md-start mb-2">
            <v-icon
              size="32"
              color="#9c7bff"
              class="me-2"
            >
              mdi-account-outline
            </v-icon>

            <h2 class="developer-name">
              {{ item.info[0].key }}
            </h2>
          </div>

          <p class="developer-role">Full Stack Web Developer</p>
        </div>
      </v-col>

      <!-- Contact Section -->
      <v-col
        cols="12"
        md="4"
        class="py-6"
      >
        <div
          v-for="info in item.info.slice(1)"
          :key="info.key"
          class="contact-item"
        >
          <v-icon
            class="me-3"
            color="#9c7bff"
          >
            {{ info.icon }}
          </v-icon>

          <span>{{ info.key }}</span>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import Profile from '@/assets/images/profile.webp';
import { ref } from 'vue';

const developerDetails = ref([
  {
    id: 1,
    info: [
      {
        key: 'سمیع الله حسینی',
        icon: 'mdi-account-outline',
      },
      {
        key: '0775773197',
        icon: 'mdi-phone-outline',
      },
      {
        key: '0775773197',
        icon: 'mdi-whatsapp',
      },
      {
        key: 'samiullahhussaini313@gmail.com',
        icon: 'mdi-email-outline',
      },
    ],
    profile: Profile,
  },
  {
    id: 2,
    info: [
      {
        key: 'هادی مظفری',
        icon: 'mdi-account-outline',
      },
      {
        key: '0705681749',
        icon: 'mdi-phone-outline',
      },
      {
        key: '0705681749',
        icon: 'mdi-whatsapp',
      },
      {
        key: 'mozaffarihadi442@gmail.com',
        icon: 'mdi-email-outline',
      },
    ],
    profile: Profile,
  },
])
</script>

<style scoped>
.developer-card {
  position: relative;
  overflow: hidden;
}

.card-overlay {
  position: absolute;
  inset: 0;
}

.profile-wrapper {
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  padding: 6px;
  background: linear-gradient(135deg, #0cb664, #6d5dfc);
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.developer-name {
  font-size: 32px;
  font-weight: bold;
}

.developer-role {
  font-size: 18px;
  margin-left: 45px;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  font-size: 18px;
}

.contact-item span {
  word-break: break-word;
}

@media (max-width: 960px) {
  .developer-name {
    font-size: 24px;
  }

  .developer-role {
    margin-left: 0;
    text-align: center;
  }

  .contact-item {
    justify-content: center;
  }
}
</style>
