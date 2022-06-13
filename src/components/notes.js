import Note from './note';

const Notes = ({
		notes,
		onDeleteNote,
		onUpdateNote,
		onChangeSearch,
		title,
		searchKeyword
	}) => {
	return (
		<>
			<div className="search-box">
				<h1 className="page-title">{title}</h1>
				<input
					onChange={onChangeSearch}
					className="form-control"
					placeholder="Search by Title"
					value={searchKeyword}
				/>
			</div>
			{
				notes.length > 0
					? (notes.map(note => {
						const { id, title, body, archived } = note;

						return (
							<Note
								key={id}
								id={id}
								title={title}
								body={body}
								isArchived={archived}
								onDeleteNote={onDeleteNote}
								onUpdateNote={onUpdateNote}
							/>
						)
					}))
					: <p className="empty-note">There's nothing note :(</p>
			}
		</>
	);
}

export default Notes;
