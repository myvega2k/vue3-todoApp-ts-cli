import { createStore, createLogger } from "vuex"

export const store = createStore({
    plugins: process.env.NODE_ENV === 'development' ?
        [createLogger()] : [],
})
