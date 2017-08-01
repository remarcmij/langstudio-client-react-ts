import {
  ARTICLE_FETCH,
  ARTICLE_FETCH_SUCCESS,
  ARTICLE_FETCH_FAILURE,
  ARTICLE_FETCH_CANCEL,
  ARTICLE_CLEAR
} from '../actions/actionTypes'

const initialState = {
  article: null,
  loading: false,
  error: null
}

const fetch = (): ArticleState => ({
  article: null,
  loading: true,
  error: null
})

const fetchSuccess = (state: ArticleState, action: ArticleFetchSuccessAction): ArticleState => ({
  ...state,
  ...action.payload,
  loading: false,
  error: null
})

const fetchCancel = (state: ArticleState): ArticleState => ({
  ...state,
  loading: false,
  error: null
})

const fetchFailure = (state: ArticleState, action: FetchFailureAction): ArticleState => ({
  ...state,
  ...action.payload,
  loading: false
})

const articleCleared = (): ArticleState => ({
  article: null,
  loading: false,
  error: null
})

export default function reducer(state: ArticleState = initialState, action: Action): ArticleState {
  switch (action.type) {
    case ARTICLE_FETCH:
      return fetch()
    case ARTICLE_FETCH_SUCCESS:
      return fetchSuccess(state, <ArticleFetchSuccessAction>action)
    case ARTICLE_FETCH_FAILURE:
      return fetchFailure(state, <FetchFailureAction>action)
    case ARTICLE_FETCH_CANCEL:
      return fetchCancel(state)
    case ARTICLE_CLEAR:
      return articleCleared()
    default:
      return state
  }
}

export const getArticle = (state: AppState) => state.article.article
export const getLoading = (state: AppState) => state.article.loading
export const getError = (state: AppState) => state.article.error
