import { combineReducers } from '@reduxjs/toolkit';
import repositoriesReducer from './slices/repositoriesSlice';

const rootReducer = combineReducers({
    repositories: repositoriesReducer,
});

export default rootReducer;