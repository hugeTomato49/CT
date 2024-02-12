<template>
<div class="w-full h-full flex flex-col">
  <NavigationBar />
  <EntityList />
  <ChronoTable />
</div>

</template>

<script>
import NavigationBar from "./components/NavigationBar.vue"
import EntityList from "./components/EntityList.vue"
import ChronoTable from "./components/ChronoTable.vue"
import { useStore } from "vuex"
import { onMounted } from "vue"
export default {
  name: 'App',
  components: {
    NavigationBar,
    EntityList,
    ChronoTable
  },
  setup() {
    const store = useStore()

    store.dispatch('tree/getPVTree')
  }

}


</script>

<style>

</style>
