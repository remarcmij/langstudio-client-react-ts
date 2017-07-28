import C from '../actions/constants'

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

const addTopics = (state: ArticleListTopicsState, action: ArticleListFetchDoneAction): ArticleListTopicsState => ({
  ...state,
  [action.payload.publication]: action.payload.topics
})

const fetchDone = (state: ArticleListState, action: ArticleListFetchDoneAction): ArticleListState => ({
  topics: addTopics(state.topics, action),
  loading: false,
  error: null
})

const fetchCancel = (state: ArticleListState): ArticleListState => ({
  ...state,
  loading: false,
  error: null
})

const fetchError = (state: ArticleListState, action: FetchErrorAction): ArticleListState => ({
  ...state,
  ...action.payload,
  loading: false
})

export default function reducer(state: ArticleListState = initialState, action: Action): ArticleListState {
  switch (action.type) {
    case C.ARTICLE_LIST_FETCH:
      return fetch(state)
    case C.ARTICLE_LIST_FETCH_DONE:
      return fetchDone(state, <ArticleListFetchDoneAction>action)
    case C.ARTICLE_LIST_FETCH_CANCEL:
      return fetchCancel(state)
    case C.ARTICLE_LIST_FETCH_ERROR:
      return fetchError(state, <FetchErrorAction>action)
    default:
      return state
  }
}

export const getTopics = (state: AppState) => state.articleList.topics
export const getLoading = (state: AppState) => state.articleList.loading
export const getError = (state: AppState) => state.articleList.error
