<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const profile = ref({
  username: "",
  name: "F",
});

async function getProfile() {
  try {
    const data = await axios.get(`/auth/profile`);
    console.log(data);
    profile.value = data.data.data;
  } catch (e) {
    console.log(e);
  }
}

onMounted(() => {
  // getProfile();
});
</script>
<template>
  <!-- <div class="">
    <div class="flex items-center justify-between p-4">
      <div class="pl-2">
        <div>Hi,</div>
        <div class="text-xl font-medium">{{ profile.name }}</div>
      </div>
      <div
        class="bg-[#F4CA5F] w-14 h-14 flex items-center justify-center text-white font-bold text-lg rounded-full"
      >
        {{ profile.name.charAt(0) }}
      </div>
    </div>
  </div> -->
</template>
