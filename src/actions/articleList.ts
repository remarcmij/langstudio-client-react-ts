import C from './constants'

export const fetchArticleList = (publication: string): ArticleListFetchAction => ({
  type: C.ARTICLE_LIST_FETCH,
  payload: { publication }
})

export const fetchArticleListCancelled = (): Action => ({
  type: C.ARTICLE_LIST_FETCH_CANCELLED
})
