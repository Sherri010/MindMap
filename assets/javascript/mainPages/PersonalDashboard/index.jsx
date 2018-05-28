import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import Modal from '../../components/Modal';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import { format, distanceInWordsToNow } from 'date-fns';
import DashboardNavBar from '../../components/DashboardNavBar';

import * as styles from './PersonalDashboard.styl';

let key = 0;
class PersonalDashboard extends Component {
	static propTypes = {
		user: PropTypes.object,
		notebooks: PropTypes.arrayOf(PropTypes.object),
		onUpdateNotebook: PropTypes.func,
	}

	static defaultPropTypes = {
		user: {},
		notebooks: [],
	}

	constructor(props){
		super(props);
		this.editTimeout = null;
		this.state = {
			activeNotebookId: null,
			activeNotebookContent: '',
		}
	}

	componentDidMount(){
		const { notebooks } = this.props;
		if(notebooks.length){
			this.setState({ activeNotebookId: notebooks[0].id });
			this.handleUpdateURL(notebooks[0].id);
		}
	}

	componentWillReceiveProps(nextProps){
		const { notebooks } = nextProps;
		const { activeNotebookId } = this.state;

		if(!activeNotebookId && notebooks.length){
			this.setState({ activeNotebookId: notebooks[0].id });
			this.handleUpdateURL(notebooks[0].id);
		}
	}

	handleUpdateURL = (activeNotebookId) => {
		const { history } = this.props;
		history.replace({
			pathname: `/personalLibrary/notebooks/${activeNotebookId}`
		});
	}

	handleNotebookTitleClick = (activeNotebookId) => {
		const { notebooks } = this.props;
		const { content } = notebooks.find((notebook) => notebook.id === activeNotebookId);
		this.setState({ activeNotebookId, activeNotebookContent: content });
		this.handleUpdateURL(activeNotebookId);
	}

    renderNoteBooksList = () => {
		const { notebooks } = this.props;

		return notebooks.map((notebook, index) =>{
			const { id, name, createdAt } = notebook;
			return(
				<li
					className={styles.notebook}
					key={`${index}-notebook`}
					onClick={() => this.handleNotebookTitleClick(id)}
				>
					<h5 className={styles.notebookTitle}>{name}</h5>
					<h6 className={styles.timestamp}>{distanceInWordsToNow(createdAt, {addSuffix: true})}</h6>
				</li>
			)
		});
    }

	handleUpdateContent = (activeNotebookContent) => {
		clearTimeout(this.editTimeout);
		this.setState({ activeNotebookContent }, () => {
			this.editTimeout = setTimeout(this.handleUpdateNotebook, 1000);
		});
	}

	handleUpdateNotebook = () => {
		const { onUpdateNotebook } = this.props;
		const { activeNotebookContent, activeNotebookId } = this.state;

		onUpdateNotebook({ id: activeNotebookId, content: activeNotebookContent});
	}

	renderActiveNotebookEditor = () => {
		const { notebooks } = this.props;
		const { activeNotebookId, activeNotebookContent } = this.state;
		console.log('activeNotebookContent',activeNotebookContent)
		if(activeNotebookId){
			const { introduction, name, id, updatedAt } = notebooks.find((notebook) => notebook.id === activeNotebookId);

			return (
				<React.Fragment>
					<div className={styles.activeNotebookHeader}>
						<h2 className={styles.activeNotebookName}>{name}</h2>
						<p className={styles.updateTimestamp}>last updated {distanceInWordsToNow(updatedAt, {addSuffix: true})}</p>
					</div>
					<AceEditor
						value={activeNotebookContent ? activeNotebookContent : 'start wriing... :)'}
						onChange={this.handleUpdateContent}
						name={`${name}_${id}`}
						editorProps={{$blockScrolling: true}}
						className={styles.aceEdtitor}
					/>
				</React.Fragment>
			);
		}
		else {
			return (
				<p>pick a notebook and start editing :)</p>
			);
		}
	}

	handleNewNameChange = () => {

	}

    render(){
        const { user } = this.props;
		const { activeNotebookId } = this.state;

        return (
            <div>
				<Modal>
					<div>
						new notebook name:
						<input onChange={this.handleNewNameChange}/>
					</div>
				</Modal>
                <DashboardNavBar
                    user={user}
                />
                <div className={styles.dashboardWrapper}>
                    <div className={styles.listWrapper}>
						<ul className={styles.notebooksList}>
							{this.renderNoteBooksList()}
						</ul>
                    </div>
                    <div className={styles.activeNoteBookWrapper}>
						{this.renderActiveNotebookEditor()}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PersonalDashboard);
