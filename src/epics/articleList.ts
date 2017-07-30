import { Observable } from 'rxjs/Observable'
import { ActionsObservable } from 'redux-observable'

import config from '../config/config'
import AT from '../actions/actionTypes'

const fetchSuccess = (publication: string, topics: Topic[]): ArticleListFetchSuccessAction => ({
  type: AT.ARTICLELIST_FETCH_SUCCESS,
  payload: { publication, topics }
})

const fetchFailure = (error: Error): FetchFailureAction => ({
  type: AT.ARTICLELIST_FETCH_FAILURE,
  payload: { error }
})

export function fetchArticleListEpic(action$: ActionsObservable<ArticleListFetchSuccessAction>): Observable<Action> {
  return action$
    .ofType(AT.ARTICLELIST_FETCH)
    .switchMap(({ payload }) => {
      const publication = payload.publication
      const url = `${config.apiEndPoint}/topics/publication/${publication}`
      return Observable.ajax({
        url,
        headers: { Authorization: `Bearer ${config.token}` }
      }).map(res => fetchSuccess(publication, res.response))
        .catch(error => Observable.of(fetchFailure(error)))
        .takeUntil(action$.ofType(AT.ARTICLELIST_FETCH_CANCEL))

    })
}
