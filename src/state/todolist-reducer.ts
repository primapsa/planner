import {TodolistType} from "../App";

type ActionType = removeTodolistACType;
type StateType = any;
type ReducerType<T1,T2> = (s:T1, a:T2) => T1

type removeTodolistACType = ReturnType<typeof removeTodolistAC>


export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE-TODOLIST',
    payload: {
      id
    }
} as const)

export const todolistReducer:ReducerType<TodolistType[], ActionType> = (state, action) => {
    switch(action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(e => e.id !== action.payload.id)
        default:
            throw new Error('Unknown action type')
    }
}