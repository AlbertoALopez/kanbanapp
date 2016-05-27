import React from 'react';

export default class Note extends React.Component {
	constructor(props) {
		super(props);

		// Editing state
		this.state = {
			editing: false
		};
	}
	render() {
		if(this.state.editing) {
			return this.renderEdit();
		}

		return this.renderNote();
	}
	renderEdit = () => {
		return <input type="text"
			ref={
				element => element ?
				element.selectionStart = this.props.task.length : null
			}
			autofocus={true}
			defaultValue={this.props.task}
			onBlur={this.finishEdit}
			onKeyPress={this.checkEnter} />
	};
	renderNote = () => {
		// trigger editing logic
		const onDelete = this.props.onDelete;

		return (
			<div className="containter" onClick={this.edit}>
				<span className="task card">{this.props.task}</span>
				{onDelete ? this.renderDelete() : null }
			</div>
		);
	};
	edit = () => {
		// edit mode
		this.setState({
			editing: true
		});
	};
	checkEnter = (e) => {
		// user hits enter
		if(e.key === 'Enter') {
			this.finishEdit(e);
		}
	};
	finishEdit = (e) => {
		const value = e.target.value;

		if(this.props.onEdit) {
			this.props.onEdit(value);

			// exit edit mode
			this.setState({
				editing: false
			});
		}
	};
	renderDelete = () => {
		return <button className="delete-note" onClick={this.props.onDelete}>x</button>;
	};
}
