import { Observable } from 'rxjs/Observable'
import { ActionsObservable } from 'redux-observable'

import config from '../config/config'

import {
  ARTICLE_LIST_FETCH,
  ARTICLE_LIST_FETCH_CANCELLED,
  ARTICLE_LIST_FETCH_FULFILLED,
  ARTICLE_LIST_FETCH_ERROR
} from '../actions/constants'

const fetchFulfilled = (publication: string, topics: Topic[]): ArticleListFetchFulfilledAction => ({
  type: ARTICLE_LIST_FETCH_FULFILLED,
  payload: { publication, topics }
})

const fetchError = (error: Error): FetchErrorAction => ({
  type: ARTICLE_LIST_FETCH_ERROR,
  payload: { error }
})

export function fetchArticleListEpic(action$: ActionsObservable<ArticleListFetchFulfilledAction>): Observable<Action> {
  return action$
    .ofType(ARTICLE_LIST_FETCH)
    .switchMap(({ payload }) => {
      const publication = payload.publication
      const url = `${config.apiEndPoint}/topics/publication/${publication}`
      return Observable.ajax({
        url,
        headers: { Authorization: `Bearer ${config.token}` }
      }).map(res => fetchFulfilled(publication, res.response))
        .catch(error => Observable.of(fetchError(error)))
        .takeUntil(action$.ofType(ARTICLE_LIST_FETCH_CANCELLED))

    })
}
