<template>
    <div class="w-2/5 p-2">
        <div class="w-full h-full rounded-md flex flex-col" id="headerContainer">
            <div class="flex flex-row h-1/7">
                <div
                v-for = "(level_name,index) in level_name_list"
                :key = "level_name"
                class="flex flex-row h-full"
                :style="{ width: headerContainer?.offsetWidth * 0.25 + 'px'}"
                >
                    <div class="h-full flex flex-row items-center" :style="{ width: headerContainer?.offsetWidth * 0.25 - 10 + 'px' , backgroundColor: colorBar[index]}">
                        <div class="ml-5px text-md font-serif">{{ level_name }}</div>
                        <div class="h-full flex-1"></div>
                    </div>
                    <div class="h-full px-0.5px" :style="{ width: 10 + 'px' }">
                        <div class="bg-blue-100 h-full w-full "></div>
                    </div>
                </div>
            </div>
            <div class="w-full h-6/7  py-1">
                <div class="w-full h-full" id="plotContainer">
                    <svg class="w-full h-full">
                        <g 
                        v-for="(level_name, index) in level_name_list"
                        :key="level_name"
                        class="h-full" 
                        :transform="'translate(' + (headerContainer?.offsetWidth * 0.25 * index) + ', 0)'"
                        >
                            <rect
                            x="0"
                            y="0"
                            :width="headerContainer?.offsetWidth * 0.25 - 10"
                            height="100%"
                            stroke="#e5e7eb" 
                            stroke-width="2"
                            fill="none"
                            rx="5" 
                            ></rect>
                            <!-- 用circle渲染
                            <circle
                            v-for = "coordinates in coordinateCollection[level_id_list[index]]"
                            ></circle> -->

                            
                        </g>
                    </svg>
                </div>
            </div>
        </div>

    </div> 

   
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, onMounted } from 'vue'


export default {
    name: 'TreeHeader',
    setup() {
        const headerContainer = ref(null)
        const plotContainer = ref(null)
        const store = useStore()
        const colorBar = ref(["#F17F8C", "#B3D1EC", "#B3DFBD"])

        //step2: 取对应的scale和coordindateCollection数据


        const selectionTree = computed(() => store.getters["tree/selectionTree"])
        const levels = computed(() => store.getters["tree/levels"])
        const level_id_list = computed(() => [...new Set(selectionTree.value.map(node => node.level))])
        const level_name_list = computed(() => level_id_list.value.map(id => levels.value[id-1]))

        onMounted(()=> {
            headerContainer.value = document.querySelector("#treeContainer")
            plotContainer.value = document.querySelector("#plotContainer")
            store.dispatch('scatterPlot/updatePlotWidth', headerContainer.offsetWidth * 0.25 - 10)
            store.dispatch('scatterPlot/updatePlotHeight', plotContainer.value.offsetHeight)


            

        })

        return {
            headerContainer,
            plotContainer,
            level_id_list,
            level_name_list,
            colorBar


        }


    }
}



</script>

<style>

</style>