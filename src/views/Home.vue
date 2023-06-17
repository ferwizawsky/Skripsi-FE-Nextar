<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import Camera from "simple-vue-camera";

const log_ = ref("");
const preview = ref();
const result = ref([]);
const camera = ref();
// Use camera reference to call functions
const snapshot = async () => {
  const blob = await camera.value?.snapshot();

  // To show the screenshot with an image tag, create a url
  const url = URL.createObjectURL(blob);
  preview.value = url;
  encodeBase(blob);
};

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
function encodeBase(file) {
  preview.value = URL.createObjectURL(file);
  let reader = new FileReader();
  reader.onloadend = function () {
    // console.log("RESULT", reader.result);
    forme.value.image = reader.result;
  };
  reader.readAsDataURL(file);
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
        <div>
          <Camera
            :resolution="{ width: 400, height: 250 }"
            ref="camera"
            autoplay
          />
          <!-- <span @click="snapshot()">Create snapshot</span> -->
        </div>
        <!-- <div class="inputan">
          <span>Input Gambar</span> 
          <input type="file" @change="encodeImageFileAsURL" />
        </div> -->
        <div
          @click="snapshot()"
          class="text-primary mx-auto mt-3 mb-6 bg-primary/20 p-2 w-9 rounded-full h-9 cursor-pointer hover:bg-primary/60 ease-in-out duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
            />
          </svg>
        </div>
        <div class="px-4 mb-5" v-if="preview">
          Preview Captured Image:
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
