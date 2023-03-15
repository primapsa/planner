import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    title: string
    callBack: (title: string) => void
}
export const EditableSpan = ({title, callBack}: EditableSpanProps) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [updated, setUpdated] = useState<string>(title)
    const onClickHandler = () => setEdit(!edit)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setUpdated(e.currentTarget.value)
    const updateHandler = () => {
        callBack(updated)
        onClickHandler();
    }
    return (
        edit ?
            <input value={updated} onBlur={updateHandler} autoFocus onChange={onChangeHandler}/>
            :
            <span onClick={onClickHandler}>{title}</span>
    );
};

export default EditableSpan;