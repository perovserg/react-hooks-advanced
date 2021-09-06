import React, {useReducer, useCallback} from 'react';
import { AlertContext } from "./alertContext";
import { alertReducer } from "./alertReducer";
import {HIDE_ALERT, SHOW_ALERT} from "../types";

export const AlertState = ({ children }) => {
    const [state, dispatch] = useReducer(alertReducer, { visible: false });

    const show = useCallback((text, type = 'warning') => {
        dispatch({
            type: SHOW_ALERT,
            payload: { text, type },
        })
    }, [dispatch]);

    const hide = useCallback(() => dispatch({ type: HIDE_ALERT }), [dispatch]);

    return (
        <AlertContext.Provider value={{ show, hide, alert: state }}>
            {children}
        </AlertContext.Provider>
    )
}
