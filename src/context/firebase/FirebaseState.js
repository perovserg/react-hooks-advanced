import React, {useCallback, useContext, useReducer} from 'react';
import axios from 'axios';
import {FirebaseContext} from "./firebaseContext";
import {firebaseReducer} from "./firebaseReducer";
import {ADD_NOTE, DELETE_NOTE, FETCH_NOTES, SHOW_LOADER} from "../types";
import {AlertContext} from "../alert/alertContext";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({ children }) => {
    const alert = useContext(AlertContext);

    const initialState = {
        notes: [],
        loading: false,
    };
    const [state, dispatch] = useReducer(firebaseReducer, initialState);

    const showLoader = useCallback(() => dispatch({ type: SHOW_LOADER }), [dispatch]);

    const fetchNotes = useCallback(async () => {
        showLoader();
        const res = await axios.get(`${url}/notes.json`);
        const payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key,
            }
        });
        dispatch({ type: FETCH_NOTES, payload })
    }, [dispatch, showLoader]);

    const addNote = useCallback(async title => {
        const note = {
            title, date: new Date().toJSON()
        };
        const res = await axios.post(`${url}/notes.json`, note);
        const payload = {
            ...note,
            id: res.data.name,
        };
        dispatch({ type: ADD_NOTE, payload });
    }, [dispatch]);

    const deleteNote = useCallback(async id => {
        await axios.delete(`${url}/notes/${id}.json`);
        dispatch({ type: DELETE_NOTE, payload: id });
        alert.show('note was deleted!', 'success');
    }, [dispatch, alert]);

    return (
        <FirebaseContext.Provider value={{
            showLoader, addNote, deleteNote, fetchNotes,
            loading: state.loading,
            notes: state.notes,
        }}>
            {children}
        </FirebaseContext.Provider>
    )
};
