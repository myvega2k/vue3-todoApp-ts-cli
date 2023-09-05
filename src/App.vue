<template>
  <div>
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <TodoList @remove:todo="removeTodo" @toggle:todo="toggleComplete"></TodoList>
    <TodoFooter @clear:todo="clearTodo"></TodoFooter>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import TodoHeader from '@/components/TodoHeader.vue'
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import { TodoItem, TodoItemIdx } from '@/types/TodoItem'

export default defineComponent({
  components: {
    TodoHeader, TodoInput, TodoList, TodoFooter
  },
  setup() {
    const todoItems = reactive<TodoItem[]>([]);

    const addTodo = (todoItemStr: string) => {
      const todoItemObj = { completed: false, item: todoItemStr };
      localStorage.setItem(todoItemStr, JSON.stringify(todoItemObj));
      todoItems.push(todoItemObj);
    } //addTodo

    const removeTodo = (todoItemStr: string, index: number) => {
      localStorage.removeItem(todoItemStr);
      todoItems.splice(index, 1);
    };

    const toggleComplete = (todoItemIdx: TodoItemIdx) => {
      const { todoItem: { item, completed }, index } = todoItemIdx;

      todoItems[index].completed = !completed;
      localStorage.removeItem(item);
      localStorage.setItem(item, JSON.stringify(todoItems[index]));
    }; //toggleComplete

    const clearTodo = () => {
      localStorage.clear()
      todoItems.splice(0)
    }

    return { todoItems, addTodo, removeTodo, toggleComplete, clearTodo };
  }, //setup
})
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.04);
}
</style>