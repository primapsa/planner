import React, {Dispatch, SetStateAction, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void;
    addTask: (v: string) => void;

}

export function Todolist(props: PropsType) {
    let [inputState, setInputState] = useState('');
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let target = event.currentTarget.value;
        setInputState(target);
    }
 const onClickHandler = () => {
     props.addTask(inputState);
     setInputState('')
 }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={inputState} onChange={inputHandler} />
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => {
                props.changeFilter("all")
            }}>
                All
            </button>
            <button onClick={() => {
                props.changeFilter("active")
            }}>
                Active
            </button>
            <button onClick={() => {
                props.changeFilter("completed")
            }}>
                Completed
            </button>
        </div>
    </div>
}
