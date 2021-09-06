import React from 'react';

export const Notes = ({ notes, onDelete }) => (
    <ul className='list-group'>
        {notes.map(note => (
            <li className='list-group-item note' key={note.id}>
                <div>
                    <strong>{note.title}</strong>
                    <small>{note.date}</small>
                </div>
                <button type="button"
                        className="btn btn-outline-danger"
                        onClick={() => onDelete(note.id)}
                >
                    &times;
                </button>
            </li>
        ))}
    </ul>
);
