import { Observable } from 'rxjs/Observable'
import { ActionsObservable } from 'redux-observable'

import config from '../config/config'
import {TOPICS_FETCH, TOPICS_FETCH_SUCCESS, TOPICS_FETCH_FAILURE, TOPICS_FETCH_CANCEL} from '../actions/actionTypes'

const fetchSuccess = (name: string, topics: Topic[]): TopicsFetchSuccessAction => ({
  type: TOPICS_FETCH_SUCCESS,
  payload: { name, topics }
})

const fetchFailure = (error: Error): FetchFailureAction => ({
  type: TOPICS_FETCH_FAILURE,
  payload: { error }
})

export function fetchTopicsEpic(action$: ActionsObservable<TopicsFetchSuccessAction>): Observable<Action> {
  return action$
    .ofType(TOPICS_FETCH)
    .switchMap(({ payload }) => {
      const name = payload.name
      const url = `${config.apiEndPoint}/topics/${name}`
      return Observable.ajax({
        url,
        headers: { Authorization: `Bearer ${config.token}` }
      }).map(res => fetchSuccess(name, res.response))
        .catch(error => Observable.of(fetchFailure(error)))
        .takeUntil(action$.ofType(TOPICS_FETCH_CANCEL))
    })
}
