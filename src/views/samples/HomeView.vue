<template>
  <div class="home">
    <div class="card flex justify-center flex-wrap gap-4">
      <Button label="Add Link" @click="addLink" />
      <Button label="Remove Link" @click="removeLink" severity="danger" />
      <Button label="Update Link" @click="updateLink" severity="success" />
      <Button label="Add Sub Link" @click="addSubLink" />
      <Button label="Remove Sub Link" @click="removeSubLink" severity="danger" />
      <Button label="Update Sub Link" @click="updateSubLink" severity="success" />
      <Button label="Add Category" @click="addCategory" severity="info" />
      <Button label="Remove Category" @click="removeCategory" severity="danger" />
      <Button label="Update Category" @click="updateCategory" severity="success" />
      <Button label="Add Sub Category" @click="addSubCategory" severity="info" />
      <Button label="Remove Sub Category" @click="removeSubCategory" severity="danger" />
      <Button label="Update Sub Category" @click="updateSubCategory" severity="success" />
      <Button label="Add Uncategorized Link" @click="addUncategorizedLink" severity="info" />
      <Button label="Remove Uncategorized Link" @click="removeUncategorizedLink" severity="danger" />
      <Button label="Update Uncategorized Link" @click="updateUncategorizedLink" severity="success" />
    </div>
  </div>
</template>
<script setup>
import Button from "primevue/button"
import { useSidebarStore } from '@/stores/sidebar';
const sidebarStore = useSidebarStore();
const addLink = () => {
  sidebarStore.addLink('Main', {
    label: 'New Link',
    to: '/new-link',
    icon: 'pi pi-plus',
  }, 'General');
}
const removeLink = () => {
  sidebarStore.removeLink('Main', {
    label: 'New Link',
    to: '/new-link',
    icon: 'pi pi-plus',
  }, 'General');
}
const updateLink = () => {
  sidebarStore.updateLink('Main', {
    label: 'Updated Link',
    to: '/new-link',
    icon: 'pi pi-pencil',
  }, 'General');
}
const addSubLink = () => {
  sidebarStore.addLink('Sub General', {
    label: 'New Sub Link',
    to: '/new-sub-link',
    icon: 'pi pi-plus',
  }, 'General');
}
const removeSubLink = () => {
  sidebarStore.removeLink('Sub General', {
    label: 'New Sub Link',
    to: '/new-sub-link',
    icon: 'pi pi-plus',
  }, 'General');
}
const updateSubLink = () => {
  sidebarStore.updateLink('Sub General', {
    label: 'Updated Sub Link',
    to: '/new-sub-link',
    icon: 'pi pi-pencil',
  }, 'General');
}
const addCategory = () => {
  sidebarStore.addCategory({
    name: 'New Category',
    links: []
  });
}
const removeCategory = () => {
  sidebarStore.removeCategory('New Category');
}
const updateCategory = () => {
  sidebarStore.updateCategory({
    name: 'New Category Updated',
    links: []
  });
}
const addSubCategory = () => {
  sidebarStore.addCategory({
    name: 'New Sub Category',
    links: []
  }, 'General');
}
const removeSubCategory = () => {
  sidebarStore.removeCategory('New Sub Category', 'General');
}
const updateSubCategory = () => {
  sidebarStore.updateCategory({
    name: 'New Sub Category Updated',
    links: []
  }, 'General');
}
const addUncategorizedLink = () => {
  sidebarStore.addUncategorizedLink({
    label: 'New Uncategorized Link',
    to: '/new-uncategorized-link',
    icon: 'pi pi-plus',
  });
}
const removeUncategorizedLink = () => {
  sidebarStore.removeUncategorizedLink({
    label: 'New Uncategorized Link',
    to: '/new-uncategorized-link',
    icon: 'pi pi-plus',
  });
}
const updateUncategorizedLink = () => {
  sidebarStore.updateUncategorizedLink({
    label: 'Updated Uncategorized Link',
    to: '/new-uncategorized-link',
    icon: 'pi pi-pencil',
  });
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
