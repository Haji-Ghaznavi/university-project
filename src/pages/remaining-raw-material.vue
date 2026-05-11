<template>
  <v-dialog
    persistent
    width="600"
    v-model="showDialog"
  >
    <v-card
      width="600"
    >
      <v-card-title class="d-flex justify-space-between align-center"
        >برداشت مواد خام
        <v-icon
          @click="closeDialog"
          size="22"
          >mdi-close</v-icon
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px !important;">
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              v-model="material_amount"
              label="مقدار برداشت"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pt-2">
        <v-btn :loading="isSubmiting" @click="onSubmit">تایید</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <div class="pa-4">
    <v-row v-if="!loadData">
      <v-col
        cols="12"
        md="4"
        v-for="item in raw_materials"
        :key="item"
      >
        <v-card class="d-flex align-center justify-space-between ps-5 card">
          <div class="d-flex align-center">
            <v-chip
              variant="tonal"
              label
              color="primary"
              class="chip d-flex align-center justify-center"
            >
              <v-icon size="28">mdi-cube-outline</v-icon>
            </v-chip>
            <div class="px-3">
              <p class="ma-0">مواد خام</p>
              <p
                class="ma-0 text-wrap"
                style="font-size: 22px; font-weight: 600"
              >
                {{ item.name }}
              </p>
            </div>
          </div>
          <div
            class="d-flex align-center justify-space-between"
            style="width: 50%"
          >
            <v-divider vertical></v-divider>
            <div>
              <p class="ma-0">موجودی</p>
              <p
                class="ma-0 text-primary"
                style="font-size: 22px; font-weight: 600"
              >
                {{ item.quantity }} {{ item.unit }}
              </p>
            </div>
            <v-btn
              icon
              variant="text"
              @click="pickRawMaterial(item.id)"
            >
              <v-tooltip activator="parent">برداشت مواد</v-tooltip>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div
      v-else
      style="width: 100%; height: 100dvh; display: flex; align-items: center; justify-content: center"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script setup>
import { axios } from '@/plugins/axios-plugin'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'

const raw_materials = ref([])
const loadData = ref(false)
const showDialog = ref(false)
const isSubmiting = ref(false)
const picked_raw_material = ref(null)
const material_amount = ref(null)
const fetchRawMaterial = async () => {
  try {
    loadData.value = true
    const { data } = await axios.get('raw-materials/list')
    raw_materials.value = data
  } catch (error) {
    console.log('error while fetching the data', error)
  }
  loadData.value = false
}

const pickRawMaterial = (id) => {
  showDialog.value = true
  picked_raw_material.value = id
  console.log(picked_raw_material.value)
}


const onSubmit = async () => {
    try {
        isSubmiting.value = true
        const res = await axios.post('raw-materials/pick', {
            amount: material_amount.value,
            id: picked_raw_material.value
        })
        if (res.request.status === 200) {
            showDialog.value = false
            fetchRawMaterial()
        }
    } catch (error) {
        if(error.response?.status == 400){
            toast.error(error.response.data.message)
        }
    }
    isSubmiting.value = false
}


const closeDialog = () => {
    picked_raw_material.value = null
    material_amount.value = null
    showDialog.value = false
}
onMounted(() => {
  fetchRawMaterial()
})
</script>
<style scoped>
.card {
  height: 100px;
}

.chip {
  width: 60px !important;
  height: 60px !important;
}
</style>
