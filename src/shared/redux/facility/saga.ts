import { takeEvery, Effect, ForkEffect, select, call } from 'redux-saga/effects';
import { userActions } from './slice';
import { selectCoreUserId } from '../core/slice';
import useGetMeUser from '../../gql/me/queries';

export function* watchStoreUserDataAsync(): Generator<Effect, void> {
  try {
    console.log('we out here trying');
    const userId = (yield select(selectCoreUserId)) as number;
    // @ts-expect-error
    const [getMeUserFn] = useGetMeUser({variables: {id: userId}});
    call(getMeUserFn);
    // = yield select((state: RootState) => state.core.userId);
    // yield put(userActions.storeUserData(payload));
  } catch (error) {
    console.log(error);
  }
}

export function* watchUserSagas(): Generator<ForkEffect, void> {
  yield takeEvery(
    userActions.fetchUserDataAsync,
    watchStoreUserDataAsync
  );
}

const coreSagas = watchUserSagas;

export default coreSagas;
