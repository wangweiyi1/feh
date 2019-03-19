import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import HeroList from '@/view/hero/List'
import HeroCreate from '@/view/hero/Create'
import SkillList from '@/view/skill/List'
import SkillCreate from '@/view/skill/Create'
import WeaponList from '@/view/weapon/List'
import WeaponCreate from '@/view/weapon/Create'
import Card from '@/view/card/Card'

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/Login',
    //   name: 'login',
    //   component: Login,
    // },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/skill/list',
          name: 'skillList',
          component: SkillList,
        },
        {
          path: '/skill/create',
          name: 'skillCreate',
          component: SkillCreate,
        },

        {
          path: '/weapon/list',
          name: 'weaponList',
          component: WeaponList,
        },
        {
          path: '/weapon/create',
          name: 'weaponCreate',
          component: WeaponCreate,
        },

        {
          path: '/hero/list',
          name: 'heroList',
          component: HeroList,
        },
        {
          path: '/hero/create',
          name: 'heroCreate',
          component: HeroCreate,
        },
        {
          path: '/card',
          name: 'card',
          component: Card,
        },
      ]
    }
  ]
})
