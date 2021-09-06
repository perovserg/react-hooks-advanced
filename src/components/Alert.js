import React, {useContext} from 'react';
import {AlertContext} from "../context/alert/alertContext";

export const Alert = () => {
    const { alert, hide } = useContext(AlertContext);


    if (!alert.visible) {
        return null;
    }
    return (
        <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`}>
            <strong>Warning!</strong>
            {alert.text}
            <button type="button"
                    className="btn-close"
                    onClick={hide}
                    aria-label="Close"/>
        </div>
    );
};
