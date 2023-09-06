import { createStore, createLogger } from "vuex"
import { TodoItem, TodoItemIdx } from "@/types/TodoItem"
import http from "@/common/http-common"
import axios from "axios"

// const storage = {
//     fetch() {
//         const arr = [];
//         if (localStorage.length > 0) {
//             for (let i = 0; i < localStorage.length; i++) {
//                 const storageKey = localStorage.key(i) as string;
//                 const itemJson = localStorage.getItem(storageKey) as string | null
//                 if (itemJson) {
//                     arr.push(JSON.parse(itemJson))
//                 }
//             }
//         }
//         return arr;
//     }
// };

export type State = { todoItems: TodoItem[] };
const state: State = { todoItems: [] };

export const store = createStore({
    plugins: process.env.NODE_ENV === 'development' ?
        [createLogger()] : [],
    state,
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
                        console.log(error?.response?.status +
                            ' : ' + error.message)
                    } else {
                        console.error(error);
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
    },
    mutations: {
        setTodoItems(state, items) {
            state.todoItems = items;
        },
        addTodo(state: State, todoItem: string) {
            const obj: TodoItem = { completed: false, item: todoItem };
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeTodo(state: State, payload: TodoItemIdx) {
            const { todoItem: { item }, index } = payload
            localStorage.removeItem(item);
            state.todoItems.splice(index, 1);
        },
        toggleTodo(state: State, payload: TodoItemIdx) {
            const { todoItem: { item, completed }, index } = payload
            state.todoItems[index].completed = !completed
            localStorage.removeItem(item);
            localStorage.setItem(item, JSON.stringify(state.todoItems[index]));
        },
        clearTodo(state) {
            localStorage.clear()
            state.todoItems = []
        }
    }, //mutations
})
