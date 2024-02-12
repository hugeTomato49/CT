<template>
<div class="w-full p-0.5" :style="{ height: rowHeight + 'px' }">
    <div class="w-full h-full" id="cardContainer">
        <svg class="w-full h-full bg-stone-100">
            <path
            stroke="#99d8c9"
            fill="none"
            stroke-width="2"
            :d="generatePath(seriesData,xScale,yScale)"
            >
            </path>
        </svg>
    </div>


</div>




</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue'
import { generatePath } from "../../generator/generator"
export default {
    name: 'TSCard',
    props: ['seriesData', 'level'],
    setup(props) {
        const store = useStore()
        const rowHeight = computed(()=>store.getters['size/rowHeight'])

        const xScale = computed(()=>store.getters['size/xScale'])
        const yScale = computed(()=>store.getters['size/yScale'][props.level-1])

        onMounted(()=>{
            cardContainer.value = document.querySelector("#cardContainer")
            store.dispatch('size/updateCardWidth', cardContainer.value?.offsetWidth)
            store.dispatch('size/updateCardHeight', cardContainer.value?.offsetHeight)
        })

        return {
            rowHeight,
            xScale,
            yScale,
            generatePath
        }

        

    }
}

</script>

<style>

</style>

