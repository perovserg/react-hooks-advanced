import React, {useContext} from 'react';
import { CSSTransition } from 'react-transition-group';
import {AlertContext} from "../context/alert/alertContext";

export const Alert = () => {
    const { alert, hide } = useContext(AlertContext);
    return (
        <CSSTransition
            in={alert.visible}
            timeout={{
                enter: 500,
                exit: 350,
            }}
            classNames={'alert'}
            mountOnEnter
            unmountOnExit
        >
            <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`}>
                <strong>Warning!</strong>
                {alert.text}
                <button type="button"
                        className="btn-close"
                        onClick={hide}
                        aria-label="Close"/>
            </div>
        </CSSTransition>
    );
};
