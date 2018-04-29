import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import DashboardNavBar from '../../components/DashboardNavBar';
import * as styles from './PersonalDashboard.styl';

export default class PersonalDashboard extends Component {
	static propTypes = {
		user: PropTypes.object,
		notebooks: PropTypes.arrayOf(PropTypes.object),
	}

	static defaultPropTypes = {
		user: {},
		notebooks: [],
	}

    renderNoteBooksList = () => {
		const { notebooks } = this.props;

		const list =  notebooks.map((notebook) =>{
			const { name, createdAt } = notebook;
			return(
				<li>
					<h5>{name}</h5>
					<span>{format(createdAt, 'DD/MM/YYYY')}</span>
				</li>
			)
		});

		console.log(list)
		return list;
    }

    render(){
        const { user } = this.props;

        return (
            <div>
                <DashboardNavBar
                    user={user}
                />
                <div className={styles.dashboardWrapper}>
                    <div className={styles.listWrapper}>
						<ul>
							{this.renderNoteBooksList()}
						</ul>
                    </div>
                    <div className={styles.activeNnoteBookWrapper}>

                    </div>
                </div>
            </div>
        );
    }
}
