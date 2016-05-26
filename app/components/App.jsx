import uuid from 'node-uuid';
import React from 'react';

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
				<button onClick={this.addNote}>+</button>
				<ul>{notes.map(note =>
						<li key={note.id}>{note.task}</li>
					)}</ul>
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
}
