import createDataContext from './CreateDataContext';
import { SET_JOBS, SET_ERROR, CLEAR_JOBS_LIST } from '../ActionsType';
import jobsReducer from '../reducers/JobsReducers';
import { getJobsFromServer } from '../../services/JobsServices';

const getJobs = dispatch => {
    return async (pageNum) => {
        let response = await getJobsFromServer(pageNum);
        if (response.length)
            dispatch({ type: SET_JOBS, payload: { jobs: response, error: null } })
        else
            dispatch({ type: SET_ERROR, payload: { jobs: [], error: 'Could not load the data, check you connection and try again by pressing LOAD MORE!' } })

    }
}
export const { Context, Provider } = createDataContext(jobsReducer, { getJobs }, {error:null,jobs:[]});