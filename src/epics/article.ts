import { Observable } from 'rxjs/Observable'
import { ActionsObservable } from 'redux-observable'
import * as LRU from 'lru-cache'

import config from '../config/config'
import {
  ARTICLE_FETCH,
  ARTICLE_FETCH_FULFILLED,
  ARTICLE_FETCH_CANCELLED,
  ARTICLE_FETCH_ERROR
} from '../actions/constants'

const cache = LRU<ArticleFetchFulfilledAction>({ max: 25, maxAge: 1000 * 60 * 60 })

const fetchFulfilled = (article: ArticleType): ArticleFetchFulfilledAction => ({
  type: ARTICLE_FETCH_FULFILLED,
  payload: { article }
})

const fetchError = (error: Error): FetchErrorAction => ({
  type: ARTICLE_FETCH_ERROR,
  payload: { error }
})

export function fetchArticleEpic(action$: ActionsObservable<ArticleFetchAction>): Observable<Action> {
  return action$
    .ofType(ARTICLE_FETCH)
    .switchMap(({ payload }) => {
      const { publication, chapter } = payload
      const fileName = `${publication}.${chapter}.md`
      const cachedAction = cache.get(fileName)
      if (cachedAction) {
        return Observable.of(cachedAction)
      }
      const url = `${config.apiEndPoint}/article/${fileName}`
      return Observable.ajax({
        url,
        headers: { Authorization: `Bearer ${config.token}` }
      }).map(res => fetchFulfilled(res.response))
        .do(action => cache.set(fileName, action))
        .catch(error => Observable.of(fetchError(error)))
        .takeUntil(action$.ofType(ARTICLE_FETCH_CANCELLED))
    })
}
