import C from '../actions/constants'

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

const fetchDone =
  (state: PublicationListState, action: PublicationListFetchDoneAction): PublicationListState => ({
    ...action.payload,
    loading: false,
    error: null
  })

const fetchCancel = (state: PublicationListState): PublicationListState => ({
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
    case C.PUBLICATION_LIST_FETCH:
      return fetch()
    case C.PUBLICATION_LIST_FETCH_DONE:
      return fetchDone(state, <PublicationListFetchDoneAction>action)
    case C.PUBLICATION_LIST_FETCH_CANCEL:
      return fetchCancel(state)
    case C.PUBLICATION_LIST_FETCH_ERROR:
      return fetchError(state, <FetchErrorAction>action)
    default:
      return state
  }
}

export const getTopics = (state: AppState) => state.publicationList.topics
export const getLoading = (state: AppState) => state.publicationList.loading
export const getError = (state: AppState) => state.publicationList.error
