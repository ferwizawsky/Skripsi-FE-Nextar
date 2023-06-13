<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import SideBar from "../components/SideBar.vue";

const log_ = ref("");
const preview = ref();
const forme = ref({
  url: "http://127.0.0.1:5000/predict",
  image: "",
});
function loge(e) {
  log_.value = log_.value + "<br />" + e;
}

async function postImg() {
  loge("Loading......");
  try {
    const { data } = await axios.post(forme.value.url, {
      image: forme.value.image,
    });
    loge("Success......");
    let tmp0 = data.predictions[0];
    let tmp1 = data.predictions[1];
    if (tmp0.confidence > tmp1.confidence) {
      loge(`${tmp0.label} with Confidence ${tmp0.confidence}`);
    } else {
      loge(`${tmp1.label} with Confidence ${tmp1.confidence}`);
    }
  } catch (e) {
    console.log(e);
    loge("Error Response......");
  }
}
function encodeImageFileAsURL(e) {
  let file = e.target.files[0];
  // console.log(e);
  // return;

  preview.value = URL.createObjectURL(file);
  let reader = new FileReader();
  reader.onloadend = function () {
    // console.log("RESULT", reader.result);
    forme.value.image = reader.result;
  };
  reader.readAsDataURL(file);
}
onMounted(() => {
  // getExam();
});
</script>
<template>
  <div>
    <div
      class="bg-primary h-[45px] text-white flex items-center px-4 shadow-lg tracking-wider"
    >
      <div class="font-semibold uppercase">Skripsi</div>
    </div>
    <div class="pt-6 px-4">
      <form @submit.prevent="postImg()">
        <div class="inputan">
          <span>Url</span>
          <input type="text" v-model="forme.url" required />
        </div>
        <div class="inputan">
          <span>Input Gambar</span>
          <input type="file" @change="encodeImageFileAsURL" required />
        </div>
        <div class="px-4 mb-5" v-if="preview">
          <img :src="preview" class="w-full" />
        </div>
        <div class="text-center">
          <button class="btn">Check</button>
        </div>
      </form>
      <div class="pt-10">
        Log :
        <div class="pt-4" v-html="log_"></div>
      </div>
    </div>
  </div>
</template>
