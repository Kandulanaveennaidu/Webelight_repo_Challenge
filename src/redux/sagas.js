import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchRepositoriesStart, fetchRepositoriesSuccess, fetchRepositoriesFailure } from './slices/repositoriesSlice';
import { fetchRepositories } from '../api/github';

function* fetchRepositoriesSaga(action) {
    try {
        const { date, page } = action.payload;
        const data = yield call(fetchRepositories, date, page);
        yield put(fetchRepositoriesSuccess({ items: data.items, page }));
    } catch (error) {
        yield put(fetchRepositoriesFailure(error.message));
    }
}

export default function* rootSaga() {
    yield takeLatest(fetchRepositoriesStart.type, fetchRepositoriesSaga);
}