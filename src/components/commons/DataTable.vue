<template>
  <v-card
    class="mt-5"
    elevation="0"
    border
    style="position: relative"
  >
    <div
      v-if="props.loading"
      style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 10"
    >
      <v-progress-circular indeterminate />
    </div>
    <v-table
      height="600px"
      fixed-header
    >
      <thead>
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.key"
            style="font-size: 13px !important"
          >
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="record in props.tableRecords"
          :key="record.id"
        >
          <td
            v-for="header in props.headers"
            :key="header.key"
          >
            <slot
              :name="header.key"
              :record="record"
            >
              {{ record[header.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-divider></v-divider>
    <v-card-actions class="pt-2">
      <v-pagination
        v-model="page"
        :length="15"
        :total-visible="7"
      ></v-pagination>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },

  tableRecords: {
    type: Array,
    default: () => [],
  },

  loading: {
    type: Boolean,
    default: false,
  },
})

const page = ref(1)
</script>
