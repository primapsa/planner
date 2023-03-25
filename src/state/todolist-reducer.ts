import {TodolistType} from "../App";
import { v1 } from 'uuid'
type ActionType = removeTodolistACType | addTodoListACType;
type StateType = any;
type ReducerType<T1,T2> = (s:T1, a:T2) => T1

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodoListACType =  ReturnType<typeof addTodoListAC>

export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE-TODOLIST',
    payload: {
      id
    }
} as const)
export const addTodoListAC = (title: string) => ({
    type: 'ADD-TODOLIST',
    payload: {
        title
    }
} as const)
export const todolistReducer:ReducerType<TodolistType[], ActionType> = (state, action) => {
    switch(action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(e => e.id !== action.payload.id)
        case 'ADD-TODOLIST' :
            return [...state, {id: v1(), title: action.payload.title, filter: 'all' }]
        default:
            throw new Error('Unknown action type')
    }
}