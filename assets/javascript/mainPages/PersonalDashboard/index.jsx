import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import { format, distanceInWordsToNow } from 'date-fns';
import DashboardNavBar from '../../components/DashboardNavBar';

import * as styles from './PersonalDashboard.styl';

let key = 0;
export default class PersonalDashboard extends Component {
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

	handleNotebookTitleClick = (activeNotebookId) => {
		const { notebooks } = this.props;
		const { content } = notebooks.find((notebook) => notebook.id === activeNotebookId);
		this.setState({ activeNotebookId, activeNotebookContent: content });
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
					<h6 className={styles.timestamp}>{format(createdAt, 'DD/MM/YYYY')}</h6>
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

		if(activeNotebookId){
			const { introduction, name, id, updatedAt } = notebooks.find((notebook) => notebook.id === activeNotebookId);

			return (
				<React.Fragment>
					<div className={styles.activeNotebookHeader}>
						<h2 className={styles.activeNotebookName}>{name}</h2>
						<p>last updated at {distanceInWordsToNow(updatedAt, {addSuffix: true})}</p>
					</div>
					<AceEditor
						value={activeNotebookContent}
						mode={'markdown'}
						theme={'xcode'}
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

    render(){
        const { user } = this.props;
		const { activeNotebookId } = this.state;

        return (
            <div>
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
