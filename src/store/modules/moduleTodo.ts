import { Module } from "vuex"
import { RootState } from "../index"
import { TodoItem, TodoItemIdx } from "@/types/TodoItem"
import http from "@/common/http-common"
import axios from "axios";

export interface ModuleTodoState {
    todoItems: TodoItem[];
}

export const moduleTodo: Module<ModuleTodoState, RootState> = {
    namespaced: true,
    state: () => ({
        todoItems: []
    }),
    actions: {
        loadTodoItems({ commit }) {
            http
                .get('/todos')
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
                .catch(error => {
                    if (axios.isAxiosError(error)) {
                        console.error(error?.response?.status +
                            ' : ' + error.message)
                        throw error    
                    } else {
                        console.error(error);
                        throw error
                    }
                });
        }, //loadTodoItems
        removeTodo({ commit }, payload: TodoItem) {
            http
                .delete(`/todos/${payload.id}`)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        }, //removeTodo
        addTodo({ commit }, payload: TodoItem) {
            http
                .post(`/todos`, payload)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        }, //addTodo
        toggleTodo({ commit }, payload: TodoItem) {
            http
                .patch(`/todos/${payload.id}`, payload)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        }, //toggleTodo
        clearTodo({ commit }) {
            http
                .delete('/todos')
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        }, //clearTodo
    }, //actions
    mutations: {
        setTodoItems(state: ModuleTodoState, items) {
            state.todoItems = items;
        },
        addTodo(state: ModuleTodoState, todoItem: string) {
            const obj: TodoItem = { completed: false, item: todoItem };
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeTodo(state: ModuleTodoState, payload: TodoItemIdx) {
            const { todoItem: { item }, index } = payload
            localStorage.removeItem(item);
            state.todoItems.splice(index, 1);
        },
        toggleTodo(state: ModuleTodoState, payload: TodoItemIdx) {
            const { todoItem: { item, completed }, index } = payload
            state.todoItems[index].completed = !completed
            localStorage.removeItem(item);
            localStorage.setItem(item, JSON.stringify(state.todoItems[index]));
        },
        clearTodo(state: ModuleTodoState) {
            localStorage.clear()
            state.todoItems = []
        }
    }, //mutations
}