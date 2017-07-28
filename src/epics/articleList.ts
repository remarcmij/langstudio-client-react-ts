import { Observable } from 'rxjs/Observable'
import { ActionsObservable } from 'redux-observable'

import config from '../config/config'
import C from '../actions/constants'

const fetchDone = (publication: string, topics: Topic[]): ArticleListFetchDoneAction => ({
  type: C.ARTICLE_LIST_FETCH_DONE,
  payload: { publication, topics }
})

const fetchError = (error: Error): FetchErrorAction => ({
  type: C.ARTICLE_LIST_FETCH_ERROR,
  payload: { error }
})

export function fetchArticleListEpic(action$: ActionsObservable<ArticleListFetchDoneAction>): Observable<Action> {
  return action$
    .ofType(C.ARTICLE_LIST_FETCH)
    .switchMap(({ payload }) => {
      const publication = payload.publication
      const url = `${config.apiEndPoint}/topics/publication/${publication}`
      return Observable.ajax({
        url,
        headers: { Authorization: `Bearer ${config.token}` }
      }).map(res => fetchDone(publication, res.response))
        .catch(error => Observable.of(fetchError(error)))
        .takeUntil(action$.ofType(C.ARTICLE_LIST_FETCH_CANCEL))

    })
}
