import { Observable } from 'rxjs/Observable'
import { ActionsObservable } from 'redux-observable'
import * as LRU from 'lru-cache'

import config from '../config/config'
import {AUTOCOMPLETE_FETCH, AUTOCOMPLETE_FETCH_SUCCESS, AUTOCOMPLETE_FETCH_FAILURE} from '../actions/actionTypes'

const cache = LRU<AutoCompleteFetchSuccessAction>({ max: 100, maxAge: 1000 * 60 * 60 })

const fetchSuccess = (items: SearchItem[]): AutoCompleteFetchSuccessAction => ({
  type: AUTOCOMPLETE_FETCH_SUCCESS,
  payload: { items }
})

const fetchFailure = (error: Error): FetchFailureAction => ({
  type: AUTOCOMPLETE_FETCH_FAILURE,
  payload: { error }
})

export function fetchAutoCompletesEpic(action$: ActionsObservable<AutoCompleteFetchAction>): Observable<Action> {
  return action$
    .ofType(AUTOCOMPLETE_FETCH)
    .debounceTime(250)
    .switchMap(({ payload }) => {
      const { term } = payload
      const cachedAction = cache.get(term)
      if (cachedAction) {
        return Observable.of(cachedAction)
      }
      const url = `${config.apiEndPoint}/search/autocomplete?term=${term}`
      return Observable.ajax(url)
        .map(res => fetchSuccess(res.response))
        .do(action => cache.set(term, action))
        .catch(error => Observable.of(fetchFailure(error)))
    })
  }
