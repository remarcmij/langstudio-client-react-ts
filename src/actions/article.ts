import { ARTICLE_FETCH, ARTICLE_FETCH_CANCEL, ARTICLE_CLEAR } from './actionTypes'

export const fetchArticle = (publication: string, chapter: string): ArticleFetchAction => ({
  type: ARTICLE_FETCH,
  payload: { publication, chapter }
})
export const fetchArticleCancel = (): Action => ({ type: ARTICLE_FETCH_CANCEL })
export const clearArticle = (): Action => ({ type: ARTICLE_CLEAR })
