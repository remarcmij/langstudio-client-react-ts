import AT from '../actions/actionTypes'

const initialState = {
  topics: {},
  loading: false,
  error: null
}

const fetch = (state: ArticleListState): ArticleListState => ({
  ...state,
  loading: true,
  error: null
})

const addTopics = (state: ArticleListTopicsState, action: ArticleListFetchSuccessAction): ArticleListTopicsState => ({
  ...state,
  [action.payload.publication]: action.payload.topics
})

const fetchSuccess = (state: ArticleListState, action: ArticleListFetchSuccessAction): ArticleListState => ({
  topics: addTopics(state.topics, action),
  loading: false,
  error: null
})

const fetchCancel = (state: ArticleListState): ArticleListState => ({
  ...state,
  loading: false,
  error: null
})

const fetchFailure = (state: ArticleListState, action: FetchFailureAction): ArticleListState => ({
  ...state,
  ...action.payload,
  loading: false
})

export default function reducer(state: ArticleListState = initialState, action: Action): ArticleListState {
  switch (action.type) {
    case AT.ARTICLELIST_FETCH:
      return fetch(state)
    case AT.ARTICLELIST_FETCH_SUCCESS:
      return fetchSuccess(state, <ArticleListFetchSuccessAction>action)
    case AT.ARTICLELIST_FETCH_CANCEL:
      return fetchCancel(state)
    case AT.ARTICLELIST_FETCH_FAILURE:
      return fetchFailure(state, <FetchFailureAction>action)
    default:
      return state
  }
}

export const getTopics = (state: AppState) => state.articleList.topics
export const getLoading = (state: AppState) => state.articleList.loading
export const getError = (state: AppState) => state.articleList.error
