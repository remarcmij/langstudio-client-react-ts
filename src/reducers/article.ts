import {
  ARTICLE_FETCH,
  ARTICLE_FETCH_FULFILLED,
  ARTICLE_FETCH_CANCELLED,
  ARTICLE_FETCH_ERROR,
  ARTICLE_CLEAR
} from '../actions/constants'

const initialState = {
  article: null,
  loading: false,
  error: null
}

const fetch = () => ({
  article: null,
  loading: true,
  error: null
})

const fetchFulfilled = (state: ArticleState, action: ArticleFetchFulfilledAction): ArticleState => ({
  ...state,
  ...action.payload,
  loading: false,
  error: null
})

const fetchCancelled = (state: ArticleState): ArticleState => ({
  ...state,
  loading: false,
  error: null
})

const fetchError = (state: ArticleState, action: FetchErrorAction): ArticleState => ({
  ...state,
  ...action.payload,
  loading: false
})

const articleCleared = () => ({
  article: null,
  loading: false,
  error: null
})

export default function reducer(state: ArticleState = initialState, action: Action) {
  switch (action.type) {
    case ARTICLE_FETCH:
      return fetch()
    case ARTICLE_FETCH_FULFILLED:
      return fetchFulfilled(state, <ArticleFetchFulfilledAction>action)
    case ARTICLE_FETCH_CANCELLED:
      return fetchCancelled(state)
    case ARTICLE_FETCH_ERROR:
      return fetchError(state, <FetchErrorAction>action)
    case ARTICLE_CLEAR:
      return articleCleared()
    default:
      return state
  }
}

export const getArticle = (state: AppState) => state.article.article
export const getLoading = (state: AppState) => state.article.loading
export const getError = (state: AppState) => state.article.error
