import { TOPICS_FETCH, TOPICS_FETCH_SUCCESS, TOPICS_FETCH_FAILURE, TOPICS_FETCH_CANCEL } from '../actions/actionTypes'

const initialState = {
  items: {},
  loading: false,
  error: null
}

const fetch = (state: TopicsState): TopicsState => ({
  ...state,
  loading: true,
  error: null
})

const addTopics = (state: TopicMap, action: TopicsFetchSuccessAction): TopicMap => ({
  ...state,
  [action.payload.name]: action.payload.topics
})

const fetchSuccess = (state: TopicsState, action: TopicsFetchSuccessAction): TopicsState => ({
  items: addTopics(state.items, action),
  loading: false,
  error: null
})

const fetchCancel = (state: TopicsState): TopicsState => ({
  ...state,
  loading: false,
  error: null
})

const fetchFailure = (state: TopicsState, action: FetchFailureAction): TopicsState => ({
  ...state,
  ...action.payload,
  loading: false
})

export default function reducer(state: TopicsState = initialState, action: Action): TopicsState {
  switch (action.type) {
    case TOPICS_FETCH:
      return fetch(state)
    case TOPICS_FETCH_SUCCESS:
      return fetchSuccess(state, <TopicsFetchSuccessAction>action)
    case TOPICS_FETCH_FAILURE:
      return fetchFailure(state, <FetchFailureAction>action)
    case TOPICS_FETCH_CANCEL:
      return fetchCancel(state)
    default:
      return state
  }
}

export const getTopics = (state: AppState, name: string) => state.topics.items[name]
export const getLoading = (state: AppState) => state.topics.loading
export const getError = (state: AppState) => state.topics.error
