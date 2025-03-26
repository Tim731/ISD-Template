<template>
  <div :class="[...sidebarClass, 'sidebar-custom', 'flex', 'flex-col']">
    <nav class="flex-grow">
      <ul class="list-none p-8 m-0">
        <li v-if="sidebarUncategorizedLinks.length > 0" class="mb-4">
          <ul class="list-none p-0 m-0">
            <li v-for="link in sidebarUncategorizedLinks" :key="link.to" class="">
              <RouterLink :to="link.to" class="sidebar-link p-2 rounded-md hover:text-secondary flex items-center gap-2"
                active-class="active-sidebar-link">
                <i :class="link.icon"></i>
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </li>
        <template v-for="category in sidebarCategories" :key="category.name">
          <li class="mt-4">
            <div class="flex items-center justify-between cursor-pointer" @click="toggleCategory(category)">
              <h4 class="font-bold">{{ category.name }}</h4>
              <i :class="['pi', category.isOpen ? 'pi-chevron-down' : 'pi-chevron-right']"></i>
            </div>
            <div class="overflow-hidden transition-all duration-300 ease-in-out"
              :class="{ 'max-h-0': !category.isOpen, 'max-h-[1000px]': category.isOpen }">
              <ul class="list-none mt-4">
                <template v-for="subCategory in category.children" :key="subCategory.name">
                  <li class="mb-2">
                    <div class="flex items-center justify-between cursor-pointer" @click="toggleCategory(subCategory)">
                      <h5 class="font-semibold ml-4">{{ subCategory.name }}</h5>
                      <i :class="['pi', subCategory.isOpen ? 'pi-chevron-down' : 'pi-chevron-right']"></i>
                    </div>
                    <div class="overflow-hidden transition-all duration-300 ease-in-out"
                      :class="{ 'max-h-0': !subCategory.isOpen, 'max-h-[1000px]': subCategory.isOpen }">
                      <ul class="list-none p-0 m-0">
                        <li v-for="link in subCategory.links" :key="link.to" class="">
                          <RouterLink :to="link.to"
                            class="sidebar-link p-2 rounded-md hover:text-secondary flex items-center gap-2 ml-8"
                            active-class="active-sidebar-link">
                            <i :class="link.icon"></i>
                            {{ link.label }}
                          </RouterLink>
                        </li>
                      </ul>
                    </div>
                  </li>
                </template>
                <li v-for="link in category.links" :key="link.to" class="">
                  <RouterLink :to="link.to"
                    class="sidebar-link p-2 rounded-md hover:text-secondary flex items-center gap-2 ml-4"
                    active-class="active-sidebar-link">
                    <i :class="link.icon"></i>
                    {{ link.label }}
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>
        </template>

      </ul>

    </nav>
    <footer class="flex w-full flex-col mt-auto text-center text-xs">
      <span>
        © 2025 PhilRice - Information Systems Division <br /> All rights reserved.
      </span>
      <a class="mt-4 text-[var(--p-active-color)]">
        Learn More About This System
      </a>
    </footer>
  </div>
  <div class="p-4">
    <slot />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useSidebarStore } from '@/stores/sidebar';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const props = defineProps({
  sidebarClass: {
    type: Array,
    default: () => [],
  },
});

const sidebarStore = useSidebarStore();
const { getCategories, getUncategorizedLinks } = sidebarStore;
const { categories: sidebarCategories, uncategorizedLinks: sidebarUncategorizedLinks } = storeToRefs(sidebarStore);

const toggleCategory = (category) => {
  category.isOpen = !category.isOpen;
};

onMounted(() => {
  sidebarCategories.value.forEach(category => {
    category.isOpen = true;
    if (category.children) {
      category.children.forEach(subCategory => {
        subCategory.isOpen = false;
      });
    }
  });
});
</script>

<style scoped>
.sidebar-custom {
  background: transparent url('/img/Maintenance.png') 50% 10% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  padding: 10px;
  color: white;
  font: normal normal normal 14px/17px Roboto;
  letter-spacing: 0px;
  /* Ensure the sidebar content takes up available space */

}

.sidebar-link:hover {
  color: var(--p-active-color);
}

.active-sidebar-link {
  color: var(--p-active-color);
  font-weight: bold;
}
</style>
