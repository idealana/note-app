import React from 'react';

class AddNote extends React.Component {
	constructor(props) {
		super(props);

		this.maxCharacters = 50;

		this.state = {
			title: '',
			body: '',
			charRemain: this.maxCharacters,
		};

		this.onSubmitStoreNote = this.onSubmitStoreNote.bind(this);
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeBody = this.onChangeBody.bind(this);
	}

	onSubmitStoreNote(event) {
		event.preventDefault();

		const date = new Date();

    this.props.storeNote({
      id: +new Date(),
      title: this.state.title,
      body: this.state.body,
      archived: false,
      createdAt: date.toISOString(),
    });

    this.resetForm();

    this.setState(() => {
			return {
				charRemain: this.maxCharacters,
			}
		});

    alert('Note succesful added.');
	}

	onChangeTitle(event) {
		const title = event.target.value;
		const charRemain = this.maxCharacters - title.length;

		if(charRemain < 0) return;

		this.setState(() => {
			return {
				title,
				charRemain,
			}
		});
	}

	onChangeBody(event) {
		this.setState(() => {
			return {
				body: event.target.value,
			}
		});
	}

	resetForm() {
		this.setState(() => {
			return {
				title: '',
				body: '',
			}
		});
	}

	render() {
		return (
			<form onSubmit={this.onSubmitStoreNote}>
				<h1 className="page-title">Add Note</h1>
				<div className="form-group">
					<input
						className="form-control"
						onChange={this.onChangeTitle}
						value={this.state.title}
						placeholder="Title"
					/>
					<span className="form-text">
						{this.state.charRemain} character remain
					</span>
				</div>
				<div className="form-group">
					<textarea
						className="form-control"
						onChange={this.onChangeBody}
						value={this.state.body}
						placeholder="Body"
					>
					</textarea>
				</div>
				<button
					className="btn btn-submit"
				>
					Save
				</button>
			</form>
		);
	}
}

export default AddNote;
