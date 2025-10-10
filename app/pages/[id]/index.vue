<template>
    <p>
        {{ params }}
    </p>
</template>

<script setup>
const route = useRoute();
const params = route.params.id;
console.log(params);
</script>