import { ARTICLE_FETCH, ARTICLE_FETCH_CANCELLED, ARTICLE_CLEAR } from './constants'

export const fetchArticle = (publication: string, chapter: string): ArticleFetchAction => ({
  type: ARTICLE_FETCH,
  payload: { publication, chapter }
})
export const fetchArticleCancelled = (): Action => ({ type: ARTICLE_FETCH_CANCELLED })
export const clearArticle = (): Action => ({ type: ARTICLE_CLEAR })
