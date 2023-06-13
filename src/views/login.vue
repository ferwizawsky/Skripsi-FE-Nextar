<script setup>
import { ref } from "vue";

const userForm = ref({
  username: "",
  password: "",
});
async function login() {
  try {
    let data = await axios.post("/login", {
      username: userForm.value.username,
      password: userForm.value.password,
    });
    localStorage.token = data.data.token;
    location.reload();
  } catch (e) {
    console.log(e);
  }
}
</script>
<template>
  <div class="pt-8 px-5 lg:px-8">
    <div class="text-2xl font-semibold text-center tracking-widest my-10">
      <span class="text-primary">L</span>ISTENU
    </div>
    <div class="text-3xl">LOGIN</div>
    <div class="mb-4 font-medium">Please Login First to Continue</div>
    <form @submit.prevent="login()">
      <div class="inputan">
        <span>Username</span>
        <input type="text" id="username" v-model="userForm.username" />
      </div>
      <div class="inputan">
        <span>Password</span>
        <input type="password" id="password" v-model="userForm.password" />
      </div>
      <div class="text-center mt-9">
        <button class="btn">SIGN IN</button>
      </div>
    </form>
  </div>
</template>
