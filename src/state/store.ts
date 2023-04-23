import {combineReducers} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./task-reducer";
import { legacy_createStore as createStore} from 'redux'
const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
// windows.store = store;