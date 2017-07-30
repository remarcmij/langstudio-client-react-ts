import { Observable } from 'rxjs/Observable'
import { ActionsObservable } from 'redux-observable'
import * as LRU from 'lru-cache'

import config from '../config/config'
import AT from '../actions/actionTypes'

const cache = LRU<ArticleFetchSuccessAction>({ max: 25, maxAge: 1000 * 60 * 60 })

const fetchSuccess = (article: ArticleType): ArticleFetchSuccessAction => ({
  type: AT.ARTICLE_FETCH_SUCCESS,
  payload: { article }
})

const fetchFailure = (error: Error): FetchFailureAction => ({
  type: AT.ARTICLE_FETCH_FAILURE,
  payload: { error }
})

export function fetchArticleEpic(action$: ActionsObservable<ArticleFetchAction>): Observable<Action> {
  return action$
    .ofType(AT.ARTICLE_FETCH)
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
      }).map(res => fetchSuccess(res.response))
        .do(action => cache.set(fileName, action))
        .catch(error => Observable.of(fetchFailure(error)))
        .takeUntil(action$.ofType(AT. ARTICLE_FETCH_CANCEL))
    })
}
