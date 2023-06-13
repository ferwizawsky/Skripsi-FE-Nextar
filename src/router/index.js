import { createWebHistory, createRouter } from "vue-router";
const Home = () => import("../views/Home.vue");
const Exam = () => import("../views/Exam.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Ubah judul halaman
  document.title = to.name + " | " + appName;

  // const token = localStorage.getItem("token");
  // if (to.name == "Login" && token) next("/");
  // if (to.name != "Login" && !token) next("/login");
  // const privateRoute = to.matched.some((record) => !record.meta.public);
  // const publicRoute = to.matched.some((record) => record.meta.public);
  // if (privateRoute && !token) next("/login");
  // if (to.name == "Login" && token) next("/");
  // else next();
  // else next();
  next();
});

export default router;
