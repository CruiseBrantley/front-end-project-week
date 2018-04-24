import React from "react";

const NoteCard = props => {
  return (
    <div className="notecard" onClick={() => props.viewNote(props.note.id)}>
      <h5 className="note-title">{props.note.title}</h5>
      <div className="notes-text-div">
        {props.note.text}
      </div>
    </div>
  );
};

export default NoteCard;
