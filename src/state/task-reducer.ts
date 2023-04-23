import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodoListACType} from "./todolist-reducer";

type ActionType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACype
    | ChangeTaskTitleACype
    | addTodoListACType
    | RemoveAllTaskACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACype = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACype = ReturnType<typeof changeTaskTitleAC>
type RemoveAllTaskACType = ReturnType<typeof removeAllTasksAC>

export const tasksReducer = (state: TasksStateType = {}, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "DELETE-TASK":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(t => t.id !== action.payload.id)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.payload.todoListID]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todoListID]]
            }
        case "CHANGE-TASK":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID]
                    .map(t => t.id === action.payload.id ? {...t, isDone: action.payload.isDone} : t)
            }
        case "CHANGE-TITLE":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID]
                    .map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.payload.id]: []
            }
        case "REMOVE-TODOLIST":
            const copy = {...state}
            delete copy[action.payload.id]
            return copy;


        default:
            return state

    }

}

export const removeTaskAC = (id: string, todoListID: string) => ({
    type: 'DELETE-TASK',
    payload: {id, todoListID}
} as const)
export const addTaskAC = (title: string, todoListID: string) => ({
    type: 'ADD-TASK',
    payload: {title, todoListID}
} as const)
export const changeTaskStatusAC = (id: string, isDone: boolean, todoListID: string) => ({
    type: 'CHANGE-TASK',
    payload: {id, isDone, todoListID}
} as const)
export const changeTaskTitleAC = (id: string, title: string, todoListID: string) => ({
    type: 'CHANGE-TITLE',
    payload: {id, title, todoListID}
} as const)
export const removeAllTasksAC = (id: string, todoListID: string) => ({
    type: 'REMOVE-TODOLIST',
    payload: {id: todoListID}
} as const)
