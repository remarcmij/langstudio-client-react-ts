import {
  ARTICLE_FETCH,
  ARTICLE_FETCH_SUCCESS,
  ARTICLE_FETCH_FAILURE,
  ARTICLE_FETCH_CANCEL
} from '../actions/actionTypes'

const initialState = {
  items: {},
  loading: false,
  error: null
}

const fetch = (state: ArticlesState): ArticlesState => ({
  ...state,
  loading: true,
  error: null
})

const addArticle = (state: ArticleMap, action: ArticleFetchSuccessAction): ArticleMap => ({
  ...state,
  [action.payload.article.fileName]: action.payload.article
})

const fetchSuccess = (state: ArticlesState, action: ArticleFetchSuccessAction): ArticlesState => ({
  items: addArticle(state.items, action),
  loading: false,
  error: null
})

const fetchCancel = (state: ArticlesState): ArticlesState => ({
  ...state,
  loading: false,
  error: null
})

const fetchFailure = (state: ArticlesState, action: FetchFailureAction): ArticlesState => ({
  ...state,
  ...action.payload,
  loading: false
})

export default function reducer(state: ArticlesState = initialState, action: Action): ArticlesState {
  switch (action.type) {
    case ARTICLE_FETCH:
      return fetch(state)
    case ARTICLE_FETCH_SUCCESS:
      return fetchSuccess(state, <ArticleFetchSuccessAction>action)
    case ARTICLE_FETCH_FAILURE:
      return fetchFailure(state, <FetchFailureAction>action)
    case ARTICLE_FETCH_CANCEL:
      return fetchCancel(state)
    default:
      return state
  }
}

export const getArticle = (state: AppState, fileName: string) => state.article.items[fileName]
export const getLoading = (state: AppState) => state.article.loading
export const getError = (state: AppState) => state.article.error
