<template>
  <v-chip color="primary">
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
      :loading="isDeleting"
      @click="emit('onDelete')"
      icon
      width="20"
      height="20"
      variant="text"
      class="mx-1"
      ><v-icon>mdi-trash-can-outline</v-icon>
      <v-tooltip
        activator="parent"
        location="top"
        >حذف
      </v-tooltip>
    </v-btn>
    <v-btn
      v-if="showCopy"
      @click="emit('onCopy')"
      icon
      width="20"
      height="20"
      variant="text"
      class="me-2"
      ><v-icon>mdi-content-copy</v-icon>
      <v-tooltip
        activator="parent"
        location="top"
        >کاپی
      </v-tooltip>
    </v-btn>
    <v-btn
      v-if="showPrint"
      @click="emit('onPrint')"
      icon
      width="20"
      height="20"
      variant="text"
      ><v-icon>mdi-printer-outline</v-icon>
      <v-tooltip
        activator="parent"
        location="top"
        >پرنت
      </v-tooltip>
    </v-btn>
  </v-chip>
</template>

<script setup>
const emit = defineEmits(['onDelete', 'onView', 'onEdit', 'onCopy', 'onPrint'])
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
  showPrint: {
    type: Boolean,
    default: false,
  },
  showCopy: {
    type: Boolean,
    default: false,
  },
  isDeleting: {
    type: Boolean,
    default: false,
  },
})
</script>
