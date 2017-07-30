import AT from './actionTypes'

export const fetchArticle = (publication: string, chapter: string): ArticleFetchAction => ({
  type: AT.ARTICLE_FETCH,
  payload: { publication, chapter }
})
export const fetchArticleCancel = (): Action => ({ type: AT. ARTICLE_FETCH_CANCEL })
export const clearArticle = (): Action => ({ type: AT.ARTICLE_CLEAR })
