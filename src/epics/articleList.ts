import { Observable } from 'rxjs/Observable'
import { ActionsObservable } from 'redux-observable'

import config from '../config/config'
import C from '../actions/constants'

const fetchFulfilled = (publication: string, topics: Topic[]): ArticleListFetchFulfilledAction => ({
  type: C.ARTICLE_LIST_FETCH_FULFILLED,
  payload: { publication, topics }
})

const fetchError = (error: Error): FetchErrorAction => ({
  type: C.ARTICLE_LIST_FETCH_ERROR,
  payload: { error }
})

export function fetchArticleListEpic(action$: ActionsObservable<ArticleListFetchFulfilledAction>): Observable<Action> {
  return action$
    .ofType(C.ARTICLE_LIST_FETCH)
    .switchMap(({ payload }) => {
      const publication = payload.publication
      const url = `${config.apiEndPoint}/topics/publication/${publication}`
      return Observable.ajax({
        url,
        headers: { Authorization: `Bearer ${config.token}` }
      }).map(res => fetchFulfilled(publication, res.response))
        .catch(error => Observable.of(fetchError(error)))
        .takeUntil(action$.ofType(C.ARTICLE_LIST_FETCH_CANCELLED))

    })
}
