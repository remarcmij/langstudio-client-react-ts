import { Observable } from 'rxjs/Observable'
import { ActionsObservable } from 'redux-observable'
import * as LRU from 'lru-cache'

import config from '../config/config'
import C from '../actions/constants'

const cache = LRU<AutoCompleteFetchFulfilledAction>({ max: 100, maxAge: 1000 * 60 * 60 })

const fetchFulfilled = (items: SearchItem[]): AutoCompleteFetchFulfilledAction => ({
  type: C.AUTOCOMPLETE_FETCH_FULFILLED,
  payload: { items }
})

const fetchError = (error: Error): FetchErrorAction => ({
  type: C.AUTOCOMPLETE_FETCH_ERROR,
  payload: { error }
})

export function fetchAutoCompleteListEpic(action$: ActionsObservable<AutoCompleteFetchAction>): Observable<Action> {
  return action$
    .ofType(C.AUTOCOMPLETE_FETCH)
    .debounceTime(250)
    .switchMap(({ payload }) => {
      const { term } = payload
      const cachedAction = cache.get(term)
      if (cachedAction) {
        return Observable.of(cachedAction)
      }
      const url = `${config.apiEndPoint}/search/autocomplete?term=${term}`
      return Observable.ajax(url)
        .map(res => fetchFulfilled(res.response))
        .do(action => cache.set(term, action))
        .catch(error => Observable.of(fetchError(error)))
    })
  }
