import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			notes: [
				{
					id: uuid.v4(),
					task: 'Wake up'
				},
				{
					id: uuid.v4(),
					task: 'Get out of bed'
				},
				{
					id: uuid.v4(),
					task: 'Brush teeth'
				},
				{
					id: uuid.v4(),
					task: 'Eat breakfast'
				}
			]
		};
	}
	render() {
		const notes = this.state.notes;
		return (
			<div>
				<button className="add-note" onClick={this.addNote}>+</button>
			<Notes
				notes={notes}
				onEdit={this.editNote}
				onDelete={this.deleteNote}
			/>
			</div>
		);
	}
	addNote = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    });
  };
	editNote = (id, task) => {
		if(!task.trim()) {
			return;
		}

		const notes = this.state.notes.map(note => {
			if(note.id === id && task) {
				note.task = task;
			}

			return note;
		});

		this.setState({notes});
	};
	deleteNote = (id, e) => {
		e.stopPropagation();

		this.setState({
			notes: this.state.notes.filter(note => note.id !== id)
		});
	};
}
