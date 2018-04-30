import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import { format } from 'date-fns';
import DashboardNavBar from '../../components/DashboardNavBar';

import * as styles from './PersonalDashboard.styl';

let key = 0;
export default class PersonalDashboard extends Component {
	static propTypes = {
		user: PropTypes.object,
		notebooks: PropTypes.arrayOf(PropTypes.object),
	}

	static defaultPropTypes = {
		user: {},
		notebooks: [],
	}

	constructor(props){
		super(props);
		this.codeMirrorNode = null;
		this.state = {
			activeNotebookId: null,
		}
	}

	handleNotebookTitleClick = (activeNotebookId) => {
		const { notebooks } = this.props;
		const { content } = notebooks.find((notebook) => notebook.id === activeNotebookId) || {};

		if(this.codeMirrorNode){
			console.log('--->', this.codeMirrorNode)
			this.codeMirrorNode.codeMirror.setValue(content || '');
		}
		this.setState({ activeNotebookId });
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

	handleUpdateContent = (value) => {
		console.log(value)
	}

	handleSetCodeMirrorRef = (node) => {
		this.codeMirrorNode = node;
	}

	renderActiveNotebookEditor = () => {
		const { notebooks } = this.props;
		const { activeNotebookId } = this.state;

		if(activeNotebookId){
			const { content, introduction, name, id } = notebooks.find((notebook) => notebook.id === activeNotebookId) || {};

			return (
				<AceEditor
				   value={content ? content : 'xghfgh  #dfgsdfg'}
				   mode="javascript"
   	   			   theme="monokai"
				   onChange={this.handleUpdateContent}
				   name={`${name}_${id}`}
				   editorProps={{$blockScrolling: true}}
				 />
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
