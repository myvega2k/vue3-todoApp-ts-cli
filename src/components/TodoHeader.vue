<template>
    <div>
        <h1>TODO it!({{ mode }})</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const mode = process.env.VUE_APP_TITLE

        return { mode }
    }
})
</script>

<style scoped>
h1 {
    color: #2F3852;
    font-weight: 900;
    margin: 2.5rem 0 1.5rem;
}
</style>