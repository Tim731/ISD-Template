import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isSidebarOpen: (window.innerWidth < 1024) ? false : true,
    uncategorizedLinks: [
      {
        label: 'Dashboard',
        to: '/no-category',
        icon: 'pi pi-question-circle',
      },
    ],
    categories: [
      {
        name: 'Samples',
        links: [
          {
            label: 'Home',
            to: '/',
            icon: 'pi pi-home',
          },
          {
            label: 'Buttons',
            to: '/buttons',
            icon: 'pi pi-bullseye',
          },
        ],
      },
      {
        name: 'General',
        children: [
          {
            name: 'Sub General',
            links: [
              {
                label: 'Sub General Link',
                to: '/sub-general',
                icon: 'pi pi-link',
              },
            ],
          },
        ],
      },
    ],
    withHeaderLinks: [{
      name: 'My Header',
      links: [
        {
          label: 'Home',
          to: '/temp_1',
          icon: 'pi pi-home',
        },
        {
          label: 'Home 2',
          to: '/temp_2',
          icon: 'pi pi-home',
        },
      ]
    }]
  }),
  getters: {
    getCategories: (state) => state.categories,
    getUncategorizedLinks: (state) => state.uncategorizedLinks,
    getWithHeaderLinks: (state) => state.withHeaderLinks,
    getSidebarState: (state) => state.isSidebarOpen,
  },
  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    openSidebar() {
      this.isSidebarOpen = true;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
  },
});
