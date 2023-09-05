import { createStore, createLogger } from "vuex"
import { TodoItem } from "@/types/TodoItem"

const storage = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                const storageKey = localStorage.key(i) as string;
                const itemJson = localStorage.getItem(storageKey) as string | null
                if (itemJson) {
                    arr.push(JSON.parse(itemJson))
                }
            }
        }
        return arr;
    }
};

export type State = { todoItems: TodoItem[] };
const state: State = { todoItems: storage.fetch() };

export const store = createStore({
    plugins: process.env.NODE_ENV === 'development' ?
        [createLogger()] : [],
    state    
})
