import { ARTICLE_FETCH, ARTICLE_FETCH_CANCEL } from './actionTypes'

export const fetchArticle = (publication: string, chapter: string): ArticleFetchAction => ({
  type: ARTICLE_FETCH,
  payload: { publication, chapter }
})
export const fetchArticleCancel = (): Action => ({ type: ARTICLE_FETCH_CANCEL })
