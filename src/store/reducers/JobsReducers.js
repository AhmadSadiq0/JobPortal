import { SET_JOBS, CLEAR_JOBS_LIST, SET_ERROR } from '../ActionsType';

const jobsReducer = (state, action) => {
    console.log('jobReducer ===>', state, action)
    switch (action.type) {
        case SET_JOBS:
            return { error: null, jobs: [...state.jobs, ...action.payload.jobs] }
        case SET_ERROR:
            return { ...state, ...action.payload }
        case CLEAR_JOBS_LIST:
            return {}
    }
}
export default jobsReducer;