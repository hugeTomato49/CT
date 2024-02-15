<template>
    <div class="h-full w-2/3 p-2 pt-0">
        <div class="w-full h-full border-3 rounded-md flex flex-col overflow overflow-scroll" id="tableContainer">
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
import { computed, ref, watchEffect, onMounted, watch } from 'vue'
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

        const tableContainer = ref(null)


        watchEffect(()=> {
            linearizedTree.value = DFS(selectionTree.value)
            console.log("CHECK LTREE from Table")
            console.log(linearizedTree.value)
        })

        const findSeriesData = (id) => {
            return seriesCollection.value.find(node => node.id ==id)?.seriesData??[]
        }

        //scroll behavior
        const handleScroll = () => {
        store.dispatch('scroll/updateScrollPosition', {
            x: tableContainer.value.scrollLeft,
            y: tableContainer.value.scrollTop
        });
        }

        watch(() => store.getters['scroll/scrollPosition'],
        newPosition => {
            tableContainer.value.scrollLeft = newPosition.x;
            tableContainer.value.scrollTop = newPosition.y;
        }
    )

        onMounted(() => {
            tableContainer.value = document.querySelector('#tableContainer')
            tableContainer.value.addEventListener('scroll', handleScroll);
        })



        return {
            linearizedTree,
            findSeriesData,
            tableContainer
        }



    }
}



</script>

<style>

</style>