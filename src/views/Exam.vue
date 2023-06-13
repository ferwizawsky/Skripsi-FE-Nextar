<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import SideBar from "../components/SideBar.vue";

const route = useRoute();
const id = computed(() => {
  return route.params.id;
});
const listQuest = ref([]);

async function getExam() {
  try {
    const { data } = await axios.get(`/exam/get/${id.value}`);
    console.log(data);
    listQuest.value = data.question;
  } catch (e) {
    console.log(e);
  }
}

onMounted(() => {
  getExam();
});
</script>
<template>
  <div>
    <SideBar />
    <div class="p-4">
      <div class="mb-2" v-for="(value, index, name) in listQuest">
        <div>{{ index + 1 }}.{{ value.title }}</div>
        <div>{{ value.answer_list }}</div>
      </div>
    </div>
  </div>
</template>
