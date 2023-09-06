import { createStore, createLogger } from "vuex"
import { moduleTodo, ModuleTodoState } from './modules/moduleTodo'
import { modulePost, ModulePostState } from './modules/modulePost'

export interface RootState {
    moduleTodo: ModuleTodoState
    modulePost: ModulePostState
}


export const store = createStore({
    plugins: process.env.NODE_ENV === 'development' ?
        [createLogger()] : [],
    modules: {
        moduleTodo,
        modulePost
    }

})
