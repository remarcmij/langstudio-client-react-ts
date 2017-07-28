import {
  PUBLICATION_LIST_FETCH,
  PUBLICATION_LIST_FETCH_CANCELLED,
  PUBLICATION_LIST_FETCH_FULFILLED,
  PUBLICATION_LIST_FETCH_ERROR
} from '../actions/constants'

const initialState = {
  topics: null,
  loading: false,
  error: null
}

const fetch = () => ({
  topics: null,
  loading: true,
  error: null
})

const fetchFulfilled =
  (state: PublicationListState, action: PublicationListFetchFulfilledAction): PublicationListState => ({
    ...action.payload,
    loading: false,
    error: null
  })

const fetchCancelled = (state: PublicationListState): PublicationListState => ({
  ...state,
  loading: false,
  error: null
})

const fetchError = (state: PublicationListState, action: FetchErrorAction): PublicationListState => ({
  ...state,
  ...action.payload,
  loading: false
})

export default function reducer(state: PublicationListState = initialState, action: Action): PublicationListState {
  switch (action.type) {
    case PUBLICATION_LIST_FETCH:
      return fetch()
    case PUBLICATION_LIST_FETCH_FULFILLED:
      return fetchFulfilled(state, <PublicationListFetchFulfilledAction>action)
    case PUBLICATION_LIST_FETCH_CANCELLED:
      return fetchCancelled(state)
    case PUBLICATION_LIST_FETCH_ERROR:
      return fetchError(state, <FetchErrorAction>action)
    default:
      return state
  }
}

export const getTopics = (state: AppState) => state.publicationList.topics
export const getLoading = (state: AppState) => state.publicationList.loading
export const getError = (state: AppState) => state.publicationList.error
