const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'کاربران',
    disabled: true,
    href: 'users',
  },
]



export default function usePageConfig(){
    return {
        breadCrumbs
    }
}

