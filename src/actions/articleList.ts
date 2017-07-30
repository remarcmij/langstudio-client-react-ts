import AT from './actionTypes'

export const fetchArticleList = (publication: string): ArticleListFetchAction => ({
  type: AT.ARTICLELIST_FETCH,
  payload: { publication }
})

export const fetchArticleListCancel = (): Action => ({
  type: AT.ARTICLELIST_FETCH_CANCEL
})
