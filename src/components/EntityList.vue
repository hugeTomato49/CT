<template>
    <div class="h-1/6 flex flex-row">
        <TreeHeader />
        <EntityManagementPanel />
    </div>

</template>

<script>

import EntityManagementPanel from './entity_list/EntityManagementPanel.vue';
import TreeHeader from './entity_list/TreeHeader.vue';
export default {
    name: 'EntityList',
    components: {
        EntityManagementPanel,
        TreeHeader
    }
}


</script>

<style>

</style>