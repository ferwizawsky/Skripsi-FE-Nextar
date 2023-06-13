export function doFirst() {
  // state encapsulated and managed by the composable
  // const x = ref(0)
  // const y = ref(0)
  // a composable can update its managed state over time.
  // function update(event) {
  //   x.value = event.pageX
  //   y.value = event.pageY
  // }
  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  // onMounted(() => window.addEventListener('mousemove', update))
  // onUnmounted(() => window.removeEventListener('mousemove', update))
  // expose managed state as return value

  window.appName = import.meta.env.VITE_NAME;
  window.isDark = false;

  window.axios = axios;
  window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  // window.axios.defaults.withCredentials = true;
  window.axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.baseURL = import.meta.env.VITE_API;

  if (localStorage.token) {
    window.axios.defaults.headers.common["authorization"] =
      "Bearer " + localStorage.token;
    console.log("Token get" + localStorage.token);
  }
}
