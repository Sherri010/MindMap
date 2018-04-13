import { combineReducers } from 'redux';
import user from './user';
import PersonalDashboard from './PersonalDashboard';

export default combineReducers({
    user,
    PersonalDashboard,
})
