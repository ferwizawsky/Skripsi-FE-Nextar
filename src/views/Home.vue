<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";

const log_ = ref("");
const preview = ref();
const result = ref([]);
// const
const forme = ref({
  url: "http://127.0.0.1:5000/",
  image: "",
});
function loge(e) {
  log_.value = log_.value + "<br />" + e;
}

watch(
  () => forme.value.url,
  (e) => {
    localStorage.setItem("url", e);
  }
);
onMounted(() => {
  forme.value.url = localStorage.getItem("url");
});
async function postImg() {
  // loge("Loading......");
  log_.value = "";
  result.value = [];
  try {
    const { data } = await axios.post(`${forme.value.url}predict`, {
      image: forme.value.image,
    });
    // loge("Success......");
    // let tmp0 = data.predictions[0];
    // let tmp1 = data.predictions[1];
    // if (tmp0.confidence > tmp1.confidence) {
    //   loge(`${tmp0.label} with Confidence ${tmp0.confidence}`);
    // } else {
    //   loge(`${tmp1.label} with Confidence ${tmp1.confidence}`);
    // }
    result.value = data.predictions;
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
          <!-- <input type="text" v-model="forme.image" /> -->
          <input type="file" @change="encodeImageFileAsURL" />
        </div>
        <div class="px-4 mb-5" v-if="preview">
          <img :src="preview" class="w-full" />
        </div>
        <div class="text-center">
          <button class="btn">Check</button>
        </div>
      </form>
      <div class="pt-10">
        Result :
        <div v-if="log_" class="pt-4" v-html="log_"></div>
        <!-- <div v-if="log_">{{ log_ }}</div> -->
        <div v-for="index in result" class="mb-7">
          <div class="flex items-center">
            <div class="grow">{{ index.label }}</div>
            <div class="px-4 flex-none">
              {{ index.confidence }}
            </div>
          </div>
          <div class="bg-gray-200 rounded-lg">
            <div
              :style="{
                width: 100 * index.confidence + '%',
              }"
              class="h-[10px] bg-primary rounded-lg mt-2"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
