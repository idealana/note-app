const Note = ({ id, title, body, isArchived, onDeleteNote, onUpdateNote }) => {
	const deleteNote = (event) => {
		event.preventDefault();

		if(window.confirm('Are you sure to delete this note?')) {
			onDeleteNote(id);
			alert('Note successful deleted.')
		}
	}

	const updateNote = (event) => {
		event.preventDefault();

		if(window.confirm('Are you sure to archive this note?')) {
			onUpdateNote(id, {
				archived: !isArchived,
			});

			alert(`Note successful ${alertText}.`);
		}
	}

	const alertText = isArchived ? 'Moved' : 'Archived';
	const archivedText = isArchived ? 'Move' : 'Archive';

	return (
		<div className="note">
			<p className="title">{title}</p>
			<div className="body">{body}</div>
			<div className="actions">
				<button
					className="btn btn-primary"
					onClick={updateNote}
				>
					{archivedText}
				</button>
				<button
					className="btn btn-danger"
					onClick={deleteNote}
				>
					Delete
				</button>
			</div>
		</div>
	);
}

export default Note;