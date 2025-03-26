import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
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
    ]
  }),
  getters: {
    getCategories: (state) => state.categories,
    getUncategorizedLinks: (state) => state.uncategorizedLinks,
  },
  actions: {
    addLink(categoryName, link, parentCategoryName = null) {
      const category = this.findCategory(categoryName, parentCategoryName);
      if (category) {
        category.links.push(link);
      } else {
        console.error(`Category "${categoryName}" not found.`);
      }
    },
    removeLink(categoryName, linkToRemove, parentCategoryName = null) {
      const category = this.findCategory(categoryName, parentCategoryName);
      if (category) {
        category.links = category.links.filter(link => link.to !== linkToRemove.to);
      } else {
        console.error(`Category "${categoryName}" not found.`);
      }
    },
    updateLink(categoryName, linkToUpdate, parentCategoryName = null) {
      const category = this.findCategory(categoryName, parentCategoryName);
      if (category) {
        const index = category.links.findIndex(link => link.to === linkToUpdate.to);
        if (index !== -1) {
          category.links[index] = linkToUpdate;
        }
      } else {
        console.error(`Category "${categoryName}" not found.`);
      }
    },
    addCategory(category, parentCategoryName = null) {
      if (parentCategoryName) {
        const parentCategory = this.findCategory(parentCategoryName);
        if (parentCategory) {
          if (!parentCategory.children) {
            parentCategory.children = [];
          }
          parentCategory.children.push(category);
        } else {
          console.error(`Parent category "${parentCategoryName}" not found.`);
        }
      } else {
        this.categories.push(category);
      }
    },
    removeCategory(categoryName, parentCategoryName = null) {
      if (parentCategoryName) {
        const parentCategory = this.findCategory(parentCategoryName);
        if (parentCategory && parentCategory.children) {
          parentCategory.children = parentCategory.children.filter(cat => cat.name !== categoryName);
        } else {
          console.error(`Parent category "${parentCategoryName}" or category "${categoryName}" not found.`);
        }
      } else {
        this.categories = this.categories.filter(cat => cat.name !== categoryName);
      }
    },
    updateCategory(categoryToUpdate, parentCategoryName = null) {
      if (parentCategoryName) {
        const parentCategory = this.findCategory(parentCategoryName);
        if (parentCategory && parentCategory.children) {
          const index = parentCategory.children.findIndex(cat => cat.name === categoryToUpdate.name);
          if (index !== -1) {
            parentCategory.children[index] = categoryToUpdate;
          }
        } else {
          console.error(`Parent category "${parentCategoryName}" or category "${categoryToUpdate.name}" not found.`);
        }
      } else {
        const index = this.categories.findIndex(cat => cat.name === categoryToUpdate.name);
        if (index !== -1) {
          this.categories[index] = categoryToUpdate;
        }
      }
    },
    addUncategorizedLink(link) {
      this.uncategorizedLinks.push(link);
    },
    removeUncategorizedLink(linkToRemove) {
      this.uncategorizedLinks = this.uncategorizedLinks.filter(link => link.to !== linkToRemove.to);
    },
    updateUncategorizedLink(linkToUpdate) {
      const index = this.uncategorizedLinks.findIndex(link => link.to === linkToUpdate.to);
      if (index !== -1) {
        this.uncategorizedLinks[index] = linkToUpdate;
      }
    },
    findCategory(categoryName, parentCategoryName = null) {
      if (parentCategoryName) {
        const parentCategory = this.categories.find(cat => cat.name === parentCategoryName);
        if (parentCategory && parentCategory.children) {
          return parentCategory.children.find(cat => cat.name === categoryName);
        }
        return null;
      } else {
        return this.categories.find(cat => cat.name === categoryName);
      }
    },
  },
});
