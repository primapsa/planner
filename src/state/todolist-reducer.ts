import {FilterValuesType, TodolistType} from "../App";
import { v1 } from 'uuid'
type ActionType = removeTodolistACType
    | addTodoListACType
    | changeTodoLIstTitleACType
    | changeTodoListFilterACType;

type ReducerType<T1,T2> = (s:T1, a:T2) => T1

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodoListACType =  ReturnType<typeof addTodoListAC>
type changeTodoLIstTitleACType =  ReturnType<typeof changeTodoLIstTitleAC>
type changeTodoListFilterACType =  ReturnType<typeof changeTodoListFilterAC>

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
export const changeTodoLIstTitleAC = (id: string, title: string) => (
    {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id, title
        }
    } as const
)
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType ) => (
    {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id, filter
        }
    }as const
)
export const todolistReducer:ReducerType<TodolistType[], ActionType> = (state, action) => {
    switch(action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(e => e.id !== action.payload.id)
        case 'ADD-TODOLIST' :
            return [...state, {id: v1(), title: action.payload.title, filter: 'all' }]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map( e => e.id === action.payload.id ? {...e, title: action.payload.title} : e)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map( e => e.id === action.payload.id ? {...e, filter: action.payload.filter} : e)
        default:
            throw new Error('Unknown action type')
    }
}