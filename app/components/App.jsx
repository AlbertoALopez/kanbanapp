import AltContainer from 'alt-container';
import React from 'react';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions.js';
import LaneStore from '../stores/LaneStore.js';

export default class App extends React.Component {
	addLane() {
		LaneActions.create({ name: 'New Lane' });
	}
	render() {
		return (
			<div>
				<button className="add-lane" onClick={this.addLane}>+</button>
				<AltContainer
					stores={[LaneStore]}
					inject={{
						lanes: () => LaneStore.getState().lanes || []
					}}
				>
					<Lanes />
				</AltContainer>
			</div>
		);
	}
}
