import { Observable } from 'rxjs/Observable'
import { ActionsObservable } from 'redux-observable'

import config from '../config/config'
import AT from '../actions/actionTypes'

const fetchSuccess = (topics: Topic[]): PublicationListFetchSuccessAction => ({
  type: AT.PUBLICATIONLIST_FETCH_SUCCESS,
  payload: { topics }
})

const fetchFailure = (error: Error): FetchFailureAction => ({
  type: AT.PUBLICATIONLIST_FETCH_FAILURE,
  payload: { error }
})

export function fetchPublicationListEpic(
  action$: ActionsObservable<PublicationListFetchSuccessAction>): Observable<Action> {
  return action$
    .ofType(AT.PUBLICATIONLIST_FETCH)
    .switchMap(() => {
      const url = `${config.apiEndPoint}/topics/index`
      return Observable.ajax({
        url,
        headers: { Authorization: `Bearer ${config.token}` }
      }).map(res => fetchSuccess(res.response))
        .catch(error => Observable.of(fetchFailure(error)))
        .takeUntil(action$.ofType(AT.PUBLICATIONLIST_FETCH_CANCEL))
    })
}