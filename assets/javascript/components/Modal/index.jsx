import React,{ Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component{
	static propTypes = {
		showModal: PropTypes.bool,
	}

	static defaultProps = {
		showModal: false,
	};

	render(){
		const { showModal } = this.props;
		const backdropStyle = {
			position: 'fixed',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: 'rgba(0,0,0,0.3)',
			padding: 50,
			zIndex: 100,
		};

	  	const modalStyle = {
			backgroundColor: '#fff',
			borderRadius: 5,
			maxWidth: 500,
			minHeight: 300,
			top: 100,
			margin: '0 auto',
			padding: 30,
			zIndex: 200,
	  	};

		if(!showModal) return null;

		return (
			<div className="backdrop" style={backdropStyle}>
				<div className="modal" style={modalStyle}>
					{this.props.children}
					<div className="footer">
						<button onClick={this.props.onClose}>
						Close
						</button>
					</div>
				</div>
			</div>
		);
	}
}
