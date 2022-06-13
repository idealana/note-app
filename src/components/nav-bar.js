import './../styles/nav-bar.css';

const NavItem = ({ name, changeContent, ...rest }) => {
	return (
		<li>
      <button
        onClick={changeContent}
        {...rest}
      >
        {name}
      </button>
    </li>
	);
}

const NavBar = ({ onChangeContent, content }) => {
  const noteActive = content === 'notes' ? 'active' : '';
  const addNoteActive = content === 'add-note' ? 'active' : '';
  const archiveActive = content === 'note-archives' ? 'active' : '';

  return (
    <nav>
      <span
        className="brand"
      >
        NoteApp
      </span>
      <ul>
        <NavItem
          changeContent={() => onChangeContent('notes')}
          name="Notes"
          className={(`nav-item ${noteActive}`)}
        />
        <NavItem
          changeContent={() => onChangeContent('add-note')}
          name="Add Note"
          className={(`nav-item ${addNoteActive}`)}
        />
        <NavItem
          changeContent={() => onChangeContent('note-archives')}
          name="Archives"
          className={(`nav-item ${archiveActive}`)}
        />
      </ul>
    </nav>
  );
}

export default NavBar;
