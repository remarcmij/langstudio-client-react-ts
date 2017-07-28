import { Observable } from 'rxjs/Observable'
import { ActionsObservable } from 'redux-observable'

import config from '../config/config'
import C from '../actions/constants'

const fetchFulfilled = (topics: Topic[]): PublicationListFetchFulfilledAction => ({
  type: C.PUBLICATION_LIST_FETCH_FULFILLED,
  payload: { topics }
})

const fetchError = (error: Error): FetchErrorAction => ({
  type: C.PUBLICATION_LIST_FETCH_ERROR,
  payload: { error }
})

export function fetchPublicationListEpic(
  action$: ActionsObservable<PublicationListFetchFulfilledAction>): Observable<Action> {
  return action$
    .ofType(C.PUBLICATION_LIST_FETCH)
    .switchMap(() => {
      const url = `${config.apiEndPoint}/topics/index`
      return Observable.ajax({
        url,
        headers: { Authorization: `Bearer ${config.token}` }
      }).map(res => fetchFulfilled(res.response))
        .catch(error => Observable.of(fetchError(error)))
        .takeUntil(action$.ofType(C.PUBLICATION_LIST_FETCH_CANCELLED))
    })
}