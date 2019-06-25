import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import UserList from '@/components/UserList'
import OldUser from '@/components/OldUser'
import NewUser from '@/components/NewUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loginlink',
      component: Login
    },
    {
      path: '/admin',
      name: 'adminlink',
      component: Admin,
      redirect: '/userlist',
      children:[
        {path:'/userlist',name:'userlistlink',component:UserList},
        {path:'/olduser',name:'olduserlink',component:OldUser},
        {path:'/newuser',name:'newuserlink',component:NewUser}
      ]
    }
  ]
})
