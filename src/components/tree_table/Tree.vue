<template>
    <div class="p-3 h-full w-1/4 pt-0">
        <div class="w-full h-full border-3 rounded-md overflow overflow-scroll" id="treeContainer">
            <svg class="w-full h-full" :height="linearizedTree.length * treeContainer?.offsetHeight / 20">
                <Node 
                v-for="(node, index) in linearizedTree"
                :key = node.node_name
                :nodeData = node
                :index = index
                :rowHeight = "treeContainer?.offsetHeight / 20 " 
                :columnWidth = "treeContainer?.offsetWidth * 0.2" 
                />
                <Edge 
                v-for="edge in edges"
                :key = edge.endIndex
                :edge = edge
                :rowHeight = "treeContainer?.offsetHeight / 20" 
                :columnWidth = "treeContainer?.offsetWidth * 0.2" 
                />
            </svg>

        </div>

    </div>

</template>

<script>
import { useStore } from "vuex"
import { computed, ref, onMounted, onUnmounted, watchEffect } from "vue"
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
        const rowHeight = ref(40)

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



        onMounted(()=>{
            treeContainer.value = document.querySelector("#treeContainer")
            const rowHeight = treeContainer.value?.offsetHeight / 20
            store.dispatch('size/updateRowHeight', rowHeight)
            // console.log("CHECK rowHeight")
            // console.log(rowHeight)
        })

        return {
            linearizedTree,
            edges,
            treeContainer,
            // rowHeight,
            // columnWidth
        }
    

    }
}



</script>

<style>

</style>