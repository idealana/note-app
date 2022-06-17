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
        id: 1,
        title: "Babel",
        body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
        createdAt: '2022-04-14T04:27:34.572Z',
        archived: false,
      },
      {
        id: 2,
        title: "Functional Component",
        body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
        createdAt: '2022-04-14T04:27:34.572Z',
        archived: false,
      },
      {
        id: 3,
        title: "Modularization",
        body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
        createdAt: '2022-04-14T04:27:34.572Z',
        archived: false,
      },
      {
        id: 4,
        title: "Lifecycle",
        body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
        createdAt: '2022-04-14T04:27:34.572Z',
        archived: false,
      },
      {
        id: 5,
        title: "ESM",
        body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
        createdAt: '2022-04-14T04:27:34.572Z',
        archived: false,
      },
      {
        id: 6,
        title: "Module Bundler",
        body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
        createdAt: '2022-04-14T04:27:34.572Z',
        archived: false,
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
