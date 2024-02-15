<template>
    <div class="w-1/3 p-2">
        <div class="w-full h-full rounded-md border-3 flex flex-row">
            <div class="w-1/4 h-full p-1">
                <div class="w-full h-full rounded-md bg-stone-100">
                </div>

            </div>
            <div class="w-1/4 h-full p-1">
                <div class="w-full h-full rounded-md bg-stone-100">
                </div>

            </div>
            <div class="w-1/4 h-full p-1">
                <div class="w-full h-full rounded-md bg-stone-100">
                </div>

            </div>


        </div>

    </div> 

   
</template>

<script>
import { useStore } from 'vuex'


export default {
    name: 'TreeHeader',
    setup() {
        const store = useStore()
        const selectionTree = store.getters["tree/selectionTree"]


    }
}



</script>

<style>

</style>