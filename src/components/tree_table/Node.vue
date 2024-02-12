<template>
    <circle 
        v-if="nodeData.leaf"
        :cx="nodeData.level * columnWidth" 
        :cy="index * rowHeight + rowHeight / 2" 
        :r="3" 
        fill= "black"
        stroke="#d1d5db" 
        stroke-width="1"
        @click ="foldState ? unfold(nodeData.id) : fold(nodeData.id)"
        class="cursor-pointer">
    </circle>   
    <g 
    v-if="foldState && !nodeData.leaf"
    viewBox="0 0 256 512"
    :transform="`translate(${nodeData.level * columnWidth - 128 * scaleFactor}, ${index * rowHeight + rowHeight / 2 - 256 * scaleFactor}) scale(${scaleFactor})`"
    @click="unfold(nodeData.id)"
    class="cursor-pointer"
    >
        <path 
        fill="black"
        d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
        />
    </g>
    <g 
    v-if="!foldState && !nodeData.leaf"
    viewBox="0 0 320 512"
    :transform="`translate(${nodeData.level * columnWidth - 160 * scaleFactor}, ${index * rowHeight + rowHeight / 2 - 256 * scaleFactor}) scale(${scaleFactor})`"
    @click="fold(nodeData.id)"
    class="cursor-pointer"
    >
       <path 
       fill="green"
       d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
       />  
    </g>


</template>

<script>
import { useStore } from 'vuex'
import { ref, watchEffect } from "vue"

export default {
    name: 'Node',
    props: ['nodeData', 'index', 'columnWidth', 'rowHeight'],
    setup() {
        const store = useStore()
        const foldState = ref(true)
        const scaleFactor = ref(0.05)
        const unfold = (id) => {
            store.dispatch('tree/selectNodeAndChildren', id)
            foldState.value = false
            // console.log("CHECK foldstate")
            // console.log(foldState.value)
 
        }

        const fold = (id) => {
            store.dispatch('tree/deselectNodeAndChildren', id)
            foldState.value = true
            // console.log("CHECK foldstate")
            // console.log(foldState.value)

        }

        return {
            unfold,
            fold,
            foldState,
            scaleFactor,
        }


    }

}


</script>

<style>


</style>