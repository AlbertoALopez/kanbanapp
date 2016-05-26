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
		return <div onClick={this.edit}>{this.props.task}</div>;
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
}
