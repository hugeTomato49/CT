<template>
    <div class="w-1/30 p-2 pr-1">
        <div class="w-full h-full rounded-md border-3 flex flex-col cursor-pointer">
            <div class="h-1/4 p-2 flex flex-row items-center self-center hover:bg-blue-200 rounded-md">
                <font-awesome-icon 
                :icon="['fas', 'circle']" 
                class="h-3/5" 
                />
            </div>
            <div class="h-1/4 p-2 flex flex-row items-center self-center hover:bg-blue-200 rounded-md">
                <font-awesome-icon 
                :icon="['fas', 'layer-group']" 
                class="h-full" 
                />
            </div>
            <div class="h-1/4 p-2 flex flex-row items-center self-center hover:bg-blue-200 rounded-md">
                <font-awesome-icon 
                :icon="['fas', 'route']" 
                class="h-full" 
                />
            </div>
            <div class="h-1/4 p-2 flex flex-row items-center self-center hover:bg-blue-200 rounded-md">
                <font-awesome-icon 
                :icon="['fas', 'network-wired']" 
                class="h-full"
                />
            </div>


        </div>

    </div> 
</template>

<script>
import { useStore } from 'vuex';
export default {
    name: 'EntitySelectionPanel',
    setup() {
        const store = useStore()


    }
}



</script>

<style>

</style>