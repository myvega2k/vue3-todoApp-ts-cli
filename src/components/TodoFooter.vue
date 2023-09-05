<template>
    <div class="clearAllContainer">
        <span class="clearAllBtn" @click="clearTodo">Clear All</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    emits: ['clear:todo'],

    setup(props, { emit }) {
        const clearTodo = () => {
            emit("clear:todo")
        }
        return {clearTodo}
    }
})
</script>

<style scoped>
span {
    cursor: pointer;
}
.clearAllContainer {
    width: 8.5rem;
    height: 50px;
    line-height: 50px;
    background-color: white;
    border-radius: 5px;
    margin: 0 auto;
}

.clearAllBtn {
    color: #e20303;
    display: block;
}
</style>