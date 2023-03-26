import React, {ChangeEvent} from 'react';
type CheckBoxPropsType = {
    checked: boolean
    callback: (e:boolean) => void
}
export const CheckBox = (props: CheckBoxPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked)
    }
   return  (
        <input type="checkbox" onChange={onChangeHandler} checked={props.checked}/>
    )
}


export default CheckBox;