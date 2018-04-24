import React from "react";
import NoteCard from "./notecard";

const ListView = props => {
  if (props.notes.length === 0) {
    return (
      <div className="right-div">
        <h3 className="notes-h3">Your Notes:</h3>
        <div className="notes-div">
          <h1>List is empty</h1>
        </div>
      </div>
    );
  } //if empty list
  return (
    <div className="right-div">
      <h3 className="notes-h3">Your Notes:</h3>
      <div className="notes-div">
        {props.notes.map((note, i) => <NoteCard key={i++} note={note} />)}
      </div>
    </div>
  ); //else
};

export default ListView;