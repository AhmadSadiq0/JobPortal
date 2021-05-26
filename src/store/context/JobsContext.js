import createDataContext from './CreateDataContext';
import { SET_JOBS, SET_ERROR, CLEAR_JOBS_LIST, SET_LOADING } from '../ActionsType';
import jobsReducer from '../reducers/JobsReducers';
import { getJobsFromServer } from '../../services/JobsServices';

const getJobs = dispatch => {
    return async (pageNum) => {
        dispatch({ type: SET_LOADING, payload: { loading: true } })
        let response = await getJobsFromServer(pageNum);
        if (response.length)
            dispatch({
                type: SET_JOBS,
                payload: {
                    jobs: response,
                    error: null,
                    loading: false
                }
            })
        else
            dispatch({
                type: SET_ERROR,
                payload: {
                    jobs: [], 
                    error: 'Could not load the data, check you connection and try again by pressing LOAD MORE!',
                    loading: false
                }
            })

    }
}
export const { Context, Provider } = createDataContext(jobsReducer, { getJobs }, { error: null, jobs: [], loading: true });