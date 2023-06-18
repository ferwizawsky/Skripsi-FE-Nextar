<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import Camera from "simple-vue-camera";

const size = ref({
  width: 430,
  height: 200,
});
const log_ = ref("");
const loading = ref(false);
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
  window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      snapshot();
    }
  });
});
async function postImg() {
  // loge("Loading......");
  log_.value = "";
  loading.value = true;
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
  } finally {
    loading.value = false;
  }
}
function encodeBase(file) {
  preview.value = URL.createObjectURL(file);
  let reader = new FileReader();
  reader.onloadend = function () {
    forme.value.image = reader.result;
    postImg();
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
    <div @keyup.13="snapshot()" class="pt-6 px-4 pb-24">
      <form @submit.prevent="postImg()">
        <div class="inputan">
          <span>Url</span>
          <input type="text" v-model="forme.url" required />
        </div>
        <div>
          <Camera
            :resolution="{
              width: $route.query.w ?? size.width,
              height: $route.query.h ?? size.height,
            }"
            ref="camera"
            autoplay
          >
            <div
              @click="snapshot()"
              class="text-gray-800/70 mx-auto absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/20 p-2 w-9 rounded-full h-9 cursor-pointer hover:bg-white/60 ease-in-out duration-300"
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
          </Camera>
          <!-- <span @click="snapshot()">Create snapshot</span> -->
        </div>
        <!-- <div class="inputan">
          <span>Input Gambar</span> 
          <input type="file" @change="encodeImageFileAsURL" />
        </div> -->

        <div class="px-4 my-5 fixed top-10 right-3" v-if="preview">
          Preview Captured Image:
          <img :src="preview" class="w-full rounded-xl" />
          <div
            v-if="loading"
            class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          >
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="text-center mt-5">
          <button class="btn">Check</button>
        </div>
      </form>
      <div class="pt-10">
        Result :
        <div v-if="log_" class="pt-0" v-html="log_"></div>
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
<style>
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
