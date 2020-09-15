import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login/login.vue";
import Doctor from "../views/doctor/Doctor.vue";
import Nurse from "../views/nurse/Nurse.vue";
import NurseAdd from "../views/nurse/NurseAdd.vue";
import Init from "../views/manager/init.vue";
import Exit from "../views/manager/exit.vue";
import docaddcase from "../views/case/docaddcase.vue";
import docmanagecase from "../views/case/docmanagecase.vue";
import docsetcase from "../views/case/docsetcase.vue";
import docsearchcase from "../views/case/docsearchcase.vue";
import login from "../views/login/login.vue";
import docdeletecase from "../views/case/docdeletecase.vue";
import dishadd from "../views/case/dishadd.vue";
import dishesset from "../views/case/dishesset.vue";
import dishessetforold from "../views/case/dishessetforold.vue";
import dishescalenshow from "../views/case/dishescalenshow.vue";


import Calendar from "../views/calendar/calendar.vue";
import Add from "../views/register/add.vue"

Vue.use(VueRouter);

const routes =  [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login/login",
    component:login
  },
      {
          path: "/doctor/Doctor",
          component: Doctor
      },

      {
          path: "/nurse/Nurse",
          component: Nurse
      },
      {
        path: "/nurse/NurseAdd",
        component: NurseAdd
      },
  
      {
          path: "/manager/init",
          component: Init
      },
      {
          path: "/manager/exit",
          component: Exit
      },
    
      {
          path: '/calendar/calendar',
          component: Calendar
      },
  
      {
        path: "/login/login",
        component: Login,
      },
      {
        path: "/doctor/docaddcase",
        component: docaddcase,
      },
      {
        path: "/doctor/docsearchcase",
        component: docsearchcase,
      },
      {
        path: "/doctor/docmanagecase",
        component: docmanagecase,
      },
      {
        path: "/doctor/docsetcase",
        component: docsetcase,
      },
      {
        path: "/doctor/docdeletecase",
        component: docdeletecase,
      },
      {
        path: "/doctor/dishadd",
        component: dishadd,
      },
      {
        path: "/doctor/dishesset",
        component: dishesset,
      },
      {
        path: "/doctor/dishessetforold",
        component: dishessetforold,
      },
      {
        path: "/doctor/dishescalenshow",
        component: dishescalenshow,
      },
      {
          path: '/register/add',
          component:Add
      },
];


const router = new VueRouter({
  routes
});

export default router;
