import React, { Component } from "react";
import { arrayMove } from "react-sortable-hoc";
import base from "./rebase";
import SideBar from "./sidebar";
import ListView from "./listview";
import CreateNote from "./createnote";
import ViewCard from "./viewcard";
import EditNote from "./editnote";
import "./notes.css";

function isSorted(arr) {
  let len = arr.length - 1;
  for (let i = 0; i < len; ++i) {
    if (arr[i].title.toLowerCase() > arr[i + 1].title.toLowerCase()) {
      return false;
    }
  }
  return true;
}

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      filteredNotes: [],
      search: "",
      view: "list",
      currentCard: 0
    };
  }

  componentWillMount() {
    base.syncState("/notes", {
      context: this,
      state: "notes",
      asArray: true
    });
  }

  addNote = (title, text) => {
    let id = 0;
    this.state.notes.forEach(e => {
      if (e.id >= id) id = e.id + 1;
    });
    // while (this.state.notes.some(e => e.id === id)) id++; //most inefficient piece of code ever written, replaced with above
    let note = { title, text, id };
    let noteState = this.state.notes;
    noteState.push(note);
    this.setState({
      view: "list",
      notes: noteState
    });
  };

  changeToList = () => {
    this.setState({ view: "list" });
  };

  changeToCreate = () => {
    this.setState({ view: "create" });
  };

  changeToEdit = () => {
    this.setState({ view: "edit" });
  };

  viewNote = id => {
    this.setState({ currentCard: id, view: "view" });
  };

  removeNote = id => {
    this.setState({
      view: "list",
      notes: this.state.notes.filter(e => e.id !== id)
    });
  };

  removeAllNotes = () => {
    this.setState({ view: "list", notes: [] });
  };

  editNote = (title, text, id) => {
    let currNoteIndex = this.state.notes.findIndex(e => e.id === id);
    let tempNotes = this.state.notes;
    tempNotes[currNoteIndex] = { title: title, text: text, id: id };
    this.setState({ view: "view", notes: tempNotes });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      notes: arrayMove(this.state.notes, oldIndex, newIndex)
    });
  };

  sortList = () => {
    let baseList = this.state.notes;
    let sortedList;
    if (isSorted(baseList))
      sortedList = this.state.notes.sort((a, b) => {
        var titleA = a.title.toLowerCase(); // ignore upper and lowercase
        var titleB = b.title.toLowerCase(); // ignore upper and lowercase
        if (titleA < titleB) {
          return 1;
        }
        if (titleA > titleB) {
          return -1;
        }
        return 0;
      });
    else
      sortedList = this.state.notes.sort((a, b) => {
        var titleA = a.title.toLowerCase(); // ignore upper and lowercase
        var titleB = b.title.toLowerCase(); // ignore upper and lowercase
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
    this.setState({
      notes: sortedList
    });
  };

  render() {
    if (this.state.view === "list") {
      return (
        <div className="full-container">
          <SideBar
            changeToList={this.changeToList}
            changeToCreate={this.changeToCreate}
            removeAllNotes={this.removeAllNotes}
            notes={this.state.notes}
          />
          <ListView
            notes={this.state.notes}
            viewNote={this.viewNote}
            onSortEnd={this.onSortEnd}
            sortList={this.sortList}
          />
        </div>
      );
    }
    if (this.state.view === "create") {
      return (
        <div className="full-container">
          <SideBar
            changeToList={this.changeToList}
            changeToCreate={this.changeToCreate}
            removeAllNotes={this.removeAllNotes}
            notes={this.state.notes}
          />
          <CreateNote addNote={this.addNote} />
        </div>
      );
    }
    if (this.state.view === "view") {
      return (
        <div className="full-container">
          <SideBar
            changeToList={this.changeToList}
            changeToCreate={this.changeToCreate}
            removeAllNotes={this.removeAllNotes}
            notes={this.state.notes}
          />
          <ViewCard
            note={this.state.notes.find(e => e.id === this.state.currentCard)}
            removeNote={this.removeNote}
            changeToEdit={this.changeToEdit}
          />
        </div>
      );
    }
    if (this.state.view === "edit") {
      return (
        <div className="full-container">
          <SideBar
            changeToList={this.changeToList}
            changeToCreate={this.changeToCreate}
            removeAllNotes={this.removeAllNotes}
            notes={this.state.notes}
          />
          <EditNote
            note={this.state.notes.find(e => e.id === this.state.currentCard)}
            editNote={this.editNote}
          />
        </div>
      );
    }
    return <h1>Something didn't work</h1>;
  }
}
