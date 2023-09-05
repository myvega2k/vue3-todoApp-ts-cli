<template>
  <div>
    <ul>
      <li v-for="(todo, idx) in props.propsData" :key="idx" class="shadow">
        <i class="fas fa-check checkBtn" :class="{ checkBtnCompleted: todo.completed }" @click="toggleComplete(todo, idx)"></i>
        <span :class="{ textCompleted: todo.completed }">{{ todo.item }}</span>

        <span class="removeBtn" @click="removeTodo(todo.item, idx)">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </ul>

  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { TodoItem } from '@/types/TodoItem'

const props = defineProps({
  propsData: { type: Array as PropType<TodoItem[]>, required: true }
})

const emit = defineEmits(["remove:todo","toggle:todo"])

const removeTodo = (todoItemStr: string, index: number) => {
  emit('remove:todo', todoItemStr, index)
}

const toggleComplete = (todoItem: TodoItem, index: number) => {
  emit('toggle:todo', {todoItem, index})
}

</script>

<style scoped>
i,
span {
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}

li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}

.removeBtn {
  margin-left: auto;
  color: #de4343;
}

.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}

.checkBtnCompleted {
  color: #b3adad;
}

.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
</style>