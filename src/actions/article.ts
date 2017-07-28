import C from './constants'

export const fetchArticle = (publication: string, chapter: string): ArticleFetchAction => ({
  type: C.ARTICLE_FETCH,
  payload: { publication, chapter }
})
export const fetchArticleCancelled = (): Action => ({ type: C.ARTICLE_FETCH_CANCELLED })
export const clearArticle = (): Action => ({ type: C.ARTICLE_CLEAR })
