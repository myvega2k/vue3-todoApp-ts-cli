import { createStore, createLogger } from "vuex"
import { moduleTodo, ModuleTodoState } from './modules/moduleTodo'

export interface RootState {
    moduleTodo: ModuleTodoState
}


export const store = createStore({
    plugins: process.env.NODE_ENV === 'development' ?
        [createLogger()] : [],
    modules: {
        moduleTodo
    }

})
