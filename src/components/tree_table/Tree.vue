<template>
    <div class="p-2 h-full w-2/5 pt-0">
        <div class="w-full h-full rounded-md overflow overflow-scroll" id="treeContainer">
            <svg class="w-full" :height="linearizedTree.length * treeContainer?.offsetHeight * rowPercentage">
                <Node 
                v-for="(node, index) in linearizedTree"
                :key = node.node_name
                :nodeData = node
                :index = index
                :rowHeight = "treeContainer?.offsetHeight * rowPercentage" 
                :columnWidth = "treeContainer?.offsetWidth * 0.25" 
                />
                <Edge 
                v-for="edge in edges"
                :key = edge.endIndex
                :edge = edge
                :rowHeight = "treeContainer?.offsetHeight * rowPercentage" 
                :columnWidth = "treeContainer?.offsetWidth * 0.25" 
                />
            </svg>

        </div>

    </div>

</template>

<script>
import { useStore } from "vuex"
import { computed, ref, onMounted, onUnmounted, watchEffect, watch } from "vue"
import { DFS, calculateEdges } from "../../computation/treeComputation"

import Node from "./Node.vue"
import Edge from "./Edge.vue"
export default {
    name: 'Tree',
    components: {
        Node,
        Edge


    },
    setup() {
        //rendering parameter
        const treeContainer = ref(null)
        const rowPercentage = ref(0.04)

        //rendered data
        const store = useStore()
        const linearizedTree =  ref([])
        const edges = ref([])

        const selectionTree = computed( () => store.getters['tree/selectionTree'])
        watchEffect(()=> {
            linearizedTree.value = DFS(selectionTree.value)
            // console.log("check linearized tree")
            // console.log(linearizedTree.value)
            edges.value = calculateEdges(linearizedTree.value)
            // console.log("check edges")
            // console.log(edges.value)
        })



        //scroll_bahaviour
        const handleScroll = () => {
        store.dispatch('scroll/updateScrollPosition', {
            x: treeContainer.value.scrollLeft,
            y: treeContainer.value.scrollTop
        });
        }

        watch(() => store.getters['scroll/scrollPosition'],
        newPosition => {
            treeContainer.value.scrollLeft = newPosition.x;
            treeContainer.value.scrollTop = newPosition.y;
            // //check
            // console.log("check position")
            // console.log(newPosition.x)
        })





        onMounted(()=>{
            treeContainer.value = document.querySelector("#treeContainer")
            const rowHeight = treeContainer.value?.offsetHeight * rowPercentage.value
            store.dispatch('size/updateRowHeight', rowHeight)
            treeContainer.value.addEventListener('scroll', handleScroll);
        })

        return {
            linearizedTree,
            edges,
            treeContainer,
            rowPercentage
            // rowHeight,
            // columnWidth
        }
    }
}



</script>

<style>

</style>