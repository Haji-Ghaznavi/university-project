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
      <div>
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
        <v-btn
          @click="emit('onRefresh')"
          class="float-start"
        >
        <v-tooltip activator="parent">تازه سازی</v-tooltip>
          <v-icon
            size="25"
            >mdi-refresh</v-icon
          ></v-btn
        >
      </div>
    </v-card-title>
  </v-card>
</template>

<script setup>
const emit = defineEmits(['onCreate', 'onRefresh'])
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>
