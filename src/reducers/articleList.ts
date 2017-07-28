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

const fetchFulfilled = (state: ArticleListState, action: ArticleListFetchFulfilledAction): ArticleListState => ({
  topics: { ...state.topics, [action.payload.publication]: action.payload.topics },
  loading: false,
  error: null
})

const fetchCancelled = (state: ArticleListState): ArticleListState => ({
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
    case C.ARTICLE_LIST_FETCH_FULFILLED:
      return fetchFulfilled(state, <ArticleListFetchFulfilledAction>action)
    case C.ARTICLE_LIST_FETCH_CANCELLED:
      return fetchCancelled(state)
    case C.ARTICLE_LIST_FETCH_ERROR:
      return fetchError(state, <FetchErrorAction>action)
    default:
      return state
  }
}

export const getTopics = (state: AppState, publication: string) => state.articleList.topics[publication]
export const getLoading = (state: AppState) => state.articleList.loading
export const getError = (state: AppState) => state.articleList.error
