import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useNotification = defineStore("notif", () => {
  const state = ref({ data: [], num: 0 });

  function notif({ type, title, message, timer = 5000 }) {
    state.value.num = state.value.num + 1;
    let number = state.value.num;
    state.value.data.push({
      type,
      title,
      message,
      timer:
        timer === "off" ? "off" : setTimeout(() => endNotif(number), timer),
      number: number,
    });
  }

  function endNotif(num) {
    let index = state.value.data.findIndex((e) => e.number == num);
    state.value.data.splice(index, index + 1);
  }

  function endClickNotif(number, timer) {
    if (timer !== "off") {
      clearTimeout(timer);
    }
    endNotif(number);
  }

  return { state, notif, endNotif, endClickNotif };
});
