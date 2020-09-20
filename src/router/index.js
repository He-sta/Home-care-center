import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main/main.vue";
import Login from "../views/login/login.vue";
import Doctor from "../views/doctor/Doctor.vue";
import Nurse from "../views/nurse/Nurse.vue";
import NurseAdd from "../views/nurse/NurseAdd.vue";
import NurseRecord from "../views/nurse/record.vue";
import Init from "../views/manager/init.vue";
import Exit from "../views/manager/exit.vue";
import docaddcase from "../views/case/docaddcase.vue";
import docmanagecase from "../views/case/docmanagecase.vue";
import docsetcase from "../views/case/docsetcase.vue";
import docsearchcase from "../views/case/docsearchcase.vue";
import docdeletecase from "../views/case/docdeletecase.vue";
import dishadd from "../views/case/dishadd.vue";
import dishesset from "../views/case/dishesset.vue";
import dishessetforold from "../views/case/dishessetforold.vue";
import dishescalenshow from "../views/case/dishescalenshow.vue";
import dishescalenmanage from "../views/case/dishescalenmanage.vue";
import Add from "../views/register/add.vue";
import Leave from "../views/register/leave.vue";
import Quit from "../views/register/quit.vue";
import Client from "../views/register/client.vue";
import UpdateClient from "../views/register/updateClient.vue";
import Calendar from "../views/calendar/calendar.vue";
Vue.use(VueRouter);

const routes =  [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/login/login",
    component: Login,
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
    path: '/main',
    component: Main,
    children:[
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
        path: "/nurse/NurseRecord",
        component: NurseRecord
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
        path: "/doctor/docaddcase",
        component: docaddcase,
      },
      {
        path: "/doctor/docsearchcase",
        component: docsearchcase,
      },
      {
        path: "/doctor/docmanagecase",
        name: "manage",
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
        path: "/doctor/dishescalenmanage",
        name: "calenmanage",
        component: dishescalenmanage,
      },
      {
          path: '/register/add',
          component:Add
      },
      {
        path: '/register/leave',
        component:Leave
      },
      {
        path: '/register/quit',
        component:Quit
      },
      {
        path: '/register/client',
        component:Client
      },
      {
        path: '/updateClient/:id',
        component: UpdateClient
    },
  ]}
];


const router = new VueRouter({
  routes
});

export default router;
