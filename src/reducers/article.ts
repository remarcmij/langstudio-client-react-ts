import C from '../actions/constants'

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

const fetchFulfilled = (state: ArticleState, action: ArticleFetchDoneAction): ArticleState => ({
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

const articleCleared = (): ArticleState => ({
  article: null,
  loading: false,
  error: null
})

export default function reducer(state: ArticleState = initialState, action: Action): ArticleState {
  switch (action.type) {
    case C.ARTICLE_FETCH:
      return fetch()
    case C.ARTICLE_FETCH_DONE:
      return fetchFulfilled(state, <ArticleFetchDoneAction>action)
    case C. ARTICLE_FETCH_CANCEL:
      return fetchCancelled(state)
    case C.ARTICLE_FETCH_ERROR:
      return fetchError(state, <FetchErrorAction>action)
    case C.ARTICLE_CLEAR:
      return articleCleared()
    default:
      return state
  }
}

export const getArticle = (state: AppState) => state.article.article
export const getLoading = (state: AppState) => state.article.loading
export const getError = (state: AppState) => state.article.error
