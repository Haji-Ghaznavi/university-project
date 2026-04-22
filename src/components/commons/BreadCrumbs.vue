<template>
  <v-card
    elevation="1"
    class="pe-2"
  >
    <v-card-title class="d-flex align-center justify-space-between text-sm pa-0">
      <v-breadcrumbs :items="props.items">
        <template v-slot:prepend>
          <v-icon
            icon="mdi-home"
            size="small"
          ></v-icon>
        </template>
      </v-breadcrumbs>
      <div class="d-flex align-center">
        <v-text-field
          v-model="search"
          label="جستجو کردن ..."
          prepend-inner-icon="mdi-search"
          class="me-3 mb-1"
          style="min-width: 270px !important"
          @keyup.enter="emit('onSearch', search)"
        ></v-text-field>
        <!-- <v-btn color="primary">
          جستجو بر اساس
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn> -->
        <v-btn
          @click="emit('onRefresh')"
          class="float-start"
        >
          <v-tooltip activator="parent">تازه سازی</v-tooltip>
          <v-icon size="22">mdi-refresh</v-icon></v-btn
        >
        <v-btn
          @click="emit('onCreate')"
          class="float-start ms-2"
        >
          <v-icon
            class="pe-2"
            size="25"
            >mdi-plus</v-icon
          >ایجاد کردن</v-btn
        >
      </div>
    </v-card-title>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['onCreate', 'onRefresh', 'onSearch'])
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const search = ref(null)
</script>
