import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken, setToken } from '@/utils/auth' // get token from cookie

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {

  next()


  // determine whether the user has logged in
  const hasToken = getToken()

  console.log(hasToken)

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login`)
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
    }
  }



})

router.afterEach(() => {
  
})
