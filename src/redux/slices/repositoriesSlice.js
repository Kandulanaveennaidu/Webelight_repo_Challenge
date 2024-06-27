import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    repositories: [],
    status: 'idle',
    error: null,
    page: 1,
    hasMore: true,
};

const repositoriesSlice = createSlice({
    name: 'repositories',
    initialState,
    reducers: {
        fetchRepositoriesStart: (state, action) => {
            state.status = 'loading';
            if (action.payload.page === 1) {
                state.repositories = [];
            }
        },
        fetchRepositoriesSuccess: (state, action) => {
            state.status = 'succeeded';
            state.repositories = [...state.repositories, ...action.payload.items];
            state.page = action.payload.page;
            state.hasMore = action.payload.items.length === 30; // Assuming 30 items per page
        },
        fetchRepositoriesFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const { fetchRepositoriesStart, fetchRepositoriesSuccess, fetchRepositoriesFailure } = repositoriesSlice.actions;

export default repositoriesSlice.reducer;