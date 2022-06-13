import React from 'react';

import NavBar from './components/nav-bar';
import Notes from './components/notes';
import AddNote from './components/add-note';

import './App.css';
import './styles/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: 'notes',
      notes: this.initialData,
      searchNote: [],
      searchKeyword: '',
    };

    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.storeNote = this.storeNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.onDeleteNote = this.onDeleteNote.bind(this);
  }

  get initialData() {
    return [
      {
        id: 1654958730771,
        title: 'Babel',
        body: 'Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh Javascript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.',
        archived: false,
        createdAt: "2022-06-11T18:00:00.735Z",
      },
      {
        id: 1654958750161,
        title: 'Functional Component',
        body: 'Functional Component merupakan React Component yang dibuat menggunakan fungsi Javascript. Agar fungsi Javascript dapat disebut component ia harus mengembalikan React Element dan dipanggil layaknya React Component.',
        archived: false,
        createdAt: "2022-06-11T18:01:00.735Z",
      },
    ];
  }

  onChangeContent(content) {
    this.setState(() => {
      return {
        content,
      };
    });
  }

  onChangeSearch(event) {
    const searchKeyword = event.target.value;
    const searchNote = searchKeyword === ''
      ? []
      : this.state.notes.filter(note => note.title.toLowerCase().includes(searchKeyword.toLowerCase()));

    this.setState(() => {
      return {
        searchNote,
        searchKeyword,
      };
    });
  }

  onDeleteNote(id) {
    this.setState(({ notes }) => {
      return {
        notes: notes.filter(note => note.id !== parseInt(id)),
      };
    });
  }

  storeNote(note) {
    this.setState(({ notes }) => {
      notes.unshift(note);

      return {
        notes,
      };
    });
  }

  updateNote(id, newData) {
    this.setState(({ notes }) => {
      const newNotes = notes.map(note => {
        if(note.id === parseInt(id)) {
          Object.assign(note, newData);
        }

        return note;
      });

      return {
        notes: newNotes,
      };
    });
  }

  getNotes() {
    return this.state.searchNote.length >= 0 && this.state.searchKeyword !== ''
      ? this.state.searchNote
      : this.state.notes;
  }

  getContent() {
    if(this.state.content === 'add-note') {
      return (
        <AddNote
          storeNote={this.storeNote}
        />
      );
    }

    if(this.state.content === 'notes') {
      const notes = this.getNotes().filter(note => note.archived === false);

      return (
        <Notes
          notes={notes}
          onDeleteNote={this.onDeleteNote}
          onUpdateNote={this.updateNote}
          onChangeSearch={this.onChangeSearch}
          title="Notes"
          searchKeyword={this.state.searchKeyword}
        />
      );
    }

    if(this.state.content === 'note-archives') {
      const archives = this.getNotes().filter(note => note.archived === true);

      return (
        <Notes
          notes={archives}
          onDeleteNote={this.onDeleteNote}
          onUpdateNote={this.updateNote}
          onChangeSearch={this.onChangeSearch}
          title="Archives"
          searchKeyword={this.state.searchKeyword}
        />
      );
    }

    return <div>Page Not found</div>;
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <NavBar
            content={this.state.content}
            onChangeContent={this.onChangeContent}
          />
          <main>{this.getContent()}</main>
        </div>
      </div>
    );
  }
}

export default App;
