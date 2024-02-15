<template>
    <path
    stroke=" #D9D9D9" 
    stroke-width="2"
    fill="none"
    :d="
    `M ${(edge.startLevel-1) * columnWidth + columnWidth/2} ${rowHeight/2 + edge.startIndex * rowHeight + 10} 
    L ${(edge.startLevel-1) * columnWidth + columnWidth/2} ${rowHeight/2 + edge.endIndex * rowHeight }  
    Q ${(edge.startLevel-1) * columnWidth + columnWidth/2} ${rowHeight/2 + edge.endIndex * rowHeight }  ${(edge.startLevel-1) * columnWidth + columnWidth/2 } ${rowHeight/2 + edge.endIndex * rowHeight}  
    L ${(edge.endLevel-1) * columnWidth + columnWidth/2 -10} ${rowHeight/2 + edge.endIndex * rowHeight }`"
    >
    </path>


</template>

<script>
export default {
    name: 'Edge',
    props: ['edge', 'rowHeight', 'columnWidth']
}


</script>

<style>


</style>