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
        <v-btn @click="emit('onCreate')" class="float-start" width="110" height="35"> <v-icon class="pe-2" size="25">mdi-plus</v-icon>ایجاد کردن</v-btn>
      </v-card-title>
    </v-card>
</template>

<script setup>


const emit = defineEmits(["onCreate"]);
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>
