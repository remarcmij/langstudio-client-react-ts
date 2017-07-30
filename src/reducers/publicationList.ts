import AT from '../actions/actionTypes'

const initialState = {
  topics: null,
  loading: false,
  error: null
}

const fetch = (): PublicationListState => ({
  topics: null,
  loading: true,
  error: null
})

const fetchSuccess =
  (state: PublicationListState, action: PublicationListFetchSuccessAction): PublicationListState => ({
    ...action.payload,
    loading: false,
    error: null
  })

const fetchCancel = (state: PublicationListState): PublicationListState => ({
  ...state,
  loading: false,
  error: null
})

const fetchFailure = (state: PublicationListState, action: FetchFailureAction): PublicationListState => ({
  ...state,
  ...action.payload,
  loading: false
})

export default function reducer(state: PublicationListState = initialState, action: Action): PublicationListState {
  switch (action.type) {
    case AT.PUBLICATIONLIST_FETCH:
      return fetch()
    case AT.PUBLICATIONLIST_FETCH_SUCCESS:
      return fetchSuccess(state, <PublicationListFetchSuccessAction>action)
    case AT.PUBLICATIONLIST_FETCH_CANCEL:
      return fetchCancel(state)
    case AT.PUBLICATIONLIST_FETCH_FAILURE:
      return fetchFailure(state, <FetchFailureAction>action)
    default:
      return state
  }
}

export const getTopics = (state: AppState) => state.publicationList.topics
export const getLoading = (state: AppState) => state.publicationList.loading
export const getError = (state: AppState) => state.publicationList.error
