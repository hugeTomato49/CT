<template>
    <div class="h-full w-3/4 p-3 pt-0">
        <div class="w-full h-full rounded-md flex flex-col">
            <div class="w-1/3 h-full">
                <TSCard
                v-for="node in linearizedTree"
                :key="node.node_name"
                :seriesData="findSeriesData(node.id)"
                :level="node.level"
                />

            </div>


        </div>

    </div>
    

</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import TSCard from './TSCard.vue'

import { DFS } from '../../computation/treeComputation'


export default {
    name: 'Table',
    components: {
        TSCard
    },
    setup() {
        const store = useStore()
        const linearizedTree = ref([])
        const selectionTree = computed(()=>store.getters['tree/selectionTree'])
        const seriesCollection = computed(()=>store.getters['tree/seriesCollection'])


        watchEffect(()=> {
            linearizedTree.value = DFS(selectionTree.value)
            console.log("CHECK LTREE from Table")
            console.log(linearizedTree.value)
        })

        const findSeriesData = (id) => {
            return seriesCollection.value.find(node => node.id ==id)?.seriesData??[]
        }

        return {
            linearizedTree,
            findSeriesData,
        }



    }
}



</script>

<style>

</style>