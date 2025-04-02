import { onMounted, onUnmounted } from "vue";

export function useClickOutside(elRef, callback) {
  const handler = (event) => {
    if (elRef.value && !elRef.value.contains(event.target)) {
      callback();
    }
  };

  onMounted(() => document.addEventListener("click", handler));
  onUnmounted(() => document.removeEventListener("click", handler));
}
