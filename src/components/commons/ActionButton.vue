<template>
  <v-btn
    v-if="showEdit"
    @click="emit('onEdit')"
    icon
    width="20"
    height="20"
    variant="text"
    ><v-icon>mdi-square-edit-outline</v-icon>
    <v-tooltip
      activator="parent"
      location="top"
      >ویرایش</v-tooltip
    >
  </v-btn>
  <v-btn
    v-if="showView"
    @click="emit('onView')"
    icon
    width="20"
    height="20"
    variant="text"
    class="mx-3"
    ><v-icon>mdi-eye</v-icon>
    <v-tooltip
      activator="parent"
      location="top"
      >دیدن جزیات</v-tooltip
    >
  </v-btn>
  <v-btn
    v-if="showDelete"
    @click="emit('onDelete')"
    icon
    width="20"
    height="20"
    variant="text"
    ><v-icon>mdi-trash-can-outline</v-icon>
    <v-tooltip
      activator="parent"
      location="top"
      >حذف
    </v-tooltip>
  </v-btn>
</template>

<script setup>


const emit = defineEmits(['onDelete', 'onView', 'onEdit']);
const props = defineProps({
  showEdit: {
    type: Boolean,
    default: false,
  },
  showDelete: {
    type: Boolean,
    default: false,
  },
  showView: {
    type: Boolean,
    default: false,
  },
})
</script>
