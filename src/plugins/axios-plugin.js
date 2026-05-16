import useAuth from '@/plugins/authServices'
import router from '@/router'

import main_axios from 'axios'
import { toast } from 'vue3-toastify'

const { logout } = useAuth()
const token = localStorage.getItem('token')

const axios = main_axios.create({
  baseURL: import.meta.env.VITE_API_URL + 'api/',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})

axios.interceptors.response.use(
  response => {
    const status = response.status
    if (status == 206) {
      toast.success('معلومات موفقانه حذف شد!')
    }

    return response
  },
  error => {
    const status = error?.response?.status
    if (status === 401) {
      toast.error('ایمیل ویا رمز عبور اشتباه است!')
      logout()
      router.push('/login')
    }
    if (error?.code == 'ERR_NETWORK') {
      router.push('/network-error')
    }
    if (status == 500) {
      toast.error(error?.response?.data ?? 'خطا رخ داد')
    }
    if (status == 422) {
      const message = error?.response?.data?.message
      toast.error(message ?? 'دیتا اشتباه است')
    }

    return Promise.reject(error)
  },
)
function updateToken(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { axios, updateToken }

