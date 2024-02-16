<template>
    <div class="h-23/30 flex flex-row">
        <Tree />
        <Table />

    </div>

</template>

<script>
import Tree from './tree_table/Tree.vue';
import Table from './tree_table/Table.vue';

export default {
    name: 'ChronoTable',
    components: {
        Tree,
        Table
    }
}



</script>

<style>

</style>