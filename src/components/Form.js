import React, {useCallback, useContext, useState} from 'react';
import {AlertContext} from "../context/alert/alertContext";
import {FirebaseContext} from "../context/firebase/firebaseContext";

export const Form = () => {
    const [value, setValue] = useState('');
    const alert = useContext(AlertContext);
    const firebase = useContext(FirebaseContext);

    const handleSubmit = e => {
        e.preventDefault();
        if (value.trim()) {
            firebase.addNote(value.trim()).then(() => {
                alert.show('Note was added', 'success');
                setValue('');
            }).catch(e => {
                alert.show(`Something went wrong, error: ${e.message}`, 'danger');
            });
        } else {
            alert.show('Enter name of note');
        }
    };
    const handleChange = useCallback(e => setValue(e.target.value), [setValue]);
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <input type='text'
                       className='form-control'
                       placeholder='Enter name of note'
                       value={value}
                       onChange={handleChange}
                />
            </div>
        </form>
    )
}
