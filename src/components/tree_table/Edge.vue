<template>
    <path
    stroke="#d1d5db" 
    stroke-width="2"
    fill="none"
    :d="
    `M ${edge.startLevel * columnWidth} ${rowHeight/2 + edge.startIndex * rowHeight + 10} 
    L ${edge.startLevel * columnWidth} ${rowHeight/2 + edge.endIndex * rowHeight }  
    Q ${edge.startLevel * columnWidth} ${rowHeight/2 + edge.endIndex * rowHeight }  ${edge.startLevel * columnWidth } ${rowHeight/2 + edge.endIndex * rowHeight}  
    L ${edge.endLevel * columnWidth -10} ${rowHeight/2 + edge.endIndex * rowHeight }`"
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