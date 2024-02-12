<template>
    <div class="h-1/7 flex flex-row">
        <EntitySelectionPanel />
        <EntityManagementPanel />
    </div>

</template>

<script>
import EntitySelectionPanel from './entity_list/EntitySelectionPanel.vue';
import EntityManagementPanel from './entity_list/EntityManagementPanel.vue';
export default {
    name: 'EntityList',
    components: {
        EntitySelectionPanel,
        EntityManagementPanel
    }
}


</script>

<style>

</style>