import { ARTICLE_LIST_FETCH, ARTICLE_LIST_FETCH_CANCELLED } from './constants'

export const fetchArticleList = (publication: string): ArticleListFetchAction => ({
  type: ARTICLE_LIST_FETCH,
  payload: { publication }
})

export const fetchArticleListCancelled = (): Action => ({
  type: ARTICLE_LIST_FETCH_CANCELLED
})
