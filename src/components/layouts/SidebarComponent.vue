<template>
  <div
    :class="[...sidebarClass, 'sidebar-custom', 'flex', 'flex-col transition-all duration-500 ease-in-out min-w-[300px] max-w-[300px] absolute h-full top-0 z-100 lg:relative']">
    <nav class="flex-grow">
      <ul class="list-none p-8 m-0">
        <li v-if="sidebarUncategorizedLinks.length > 0" class="mb-4">
          <ul class="list-none p-0 m-0">
            <li v-for="link in sidebarUncategorizedLinks" :key="link.to" class="">
              <RouterLink :to="link.to" class="sidebar-link p-2 rounded-md hover:text-secondary flex items-center gap-2"
                active-class="active-sidebar-link"
                :class="[route.path === link.to ? 'text-active font-bold' : 'text-white']">
                <i :class="link.icon"></i>
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </li>
        <template v-if="sidebarCategories.length > 0">
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
                      <div class="flex items-center justify-between cursor-pointer"
                        @click="toggleCategory(subCategory)">
                        <h5 class="font-semibold ml-4">{{ subCategory.name }}</h5>
                        <i :class="['pi', subCategory.isOpen ? 'pi-chevron-down' : 'pi-chevron-right']"></i>
                      </div>
                      <div class="overflow-hidden transition-all duration-300 ease-in-out" :class="{
                        'max-h-0': !subCategory.isOpen,
                        'max-h-[1000px]': subCategory.isOpen,
                      }">
                        <ul class="list-none p-0 m-0">
                          <li v-for="link in subCategory.links" :key="link.to" class="">
                            <RouterLink :to="link.to"
                              class="sidebar-link p-2 rounded-md hover:text-secondary flex items-center gap-2 ml-8"
                              active-class="active-sidebar-link"
                              :class="[route.path === link.to ? 'text-active font-bold' : 'text-white']">
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
                      active-class="active-sidebar-link"
                      :class="[route.path === link.to ? 'text-active font-bold' : 'text-white']">
                      <i :class="link.icon"></i>
                      {{ link.label }}
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </li>
          </template>
        </template>
        <template v-if="sidebarwithHeaderLinks.length > 0">
          <ul class="list-none p-0 m-0">
            <template v-for="headerLink in sidebarwithHeaderLinks" :key="headerLink.name">
              <template v-if="headerLink.name !== ''">
                <!-- <hr class="text-white"/> -->
                <h4 class=" my-2 text-white text-bold">{{ headerLink.name }}</h4>
                <!-- <hr class="text-white"/> -->
              </template>
              <li v-for="link in headerLink.links" :key="link.to" class="">
                <RouterLink :to="link.to"
                  class="sidebar-link p-2 rounded-md hover:text-secondary flex items-center gap-2 ml-4 font-normal"
                  active-class="active-sidebar-link" :class="[route.path === link.to ? 'text-active' : 'text-white']">
                  <i :class="link.icon"></i>
                  {{ link.label }}
                </RouterLink>
              </li>
            </template>
          </ul>
        </template>
      </ul>
    </nav>
    <footer class="flex w-full flex-col mt-auto text-center text-xs">
      <slot name="footer">
        <!-- Default footer content if no slot is provided -->
        <FooterComponent />
      </slot>
    </footer>
  </div>
  <div class="w-full" @click="closeSidebar">
    <slot />
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { useSidebarStore } from '@/stores/sidebar';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import FooterComponent from './FooterComponent.vue';


const route = useRoute()
const sidebarRef = ref(null);


const props = defineProps({
  sidebarClass: {
    type: Array,
    default: () => [],
  },
});

const sidebarStore = useSidebarStore();
const { getCategories, getUncategorizedLinks } = sidebarStore;
const { categories: sidebarCategories, uncategorizedLinks: sidebarUncategorizedLinks, withHeaderLinks: sidebarwithHeaderLinks } = storeToRefs(sidebarStore);

const toggleCategory = (category) => {
  category.isOpen = !category.isOpen;
};

const closeSidebar = () => {
  if (window.innerWidth < 1024) {
    sidebarStore.closeSidebar();
  }
}

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
  background-color: transparent;
  background-image: url('/img/Maintenance@2x.png');
  background-repeat: no-repeat;
  background-size: 150% 150%;
  background-position: center;
  background-origin: border-box;
  background-clip: border-box;
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
