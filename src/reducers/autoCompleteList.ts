import {
  AUTOCOMPLETE_FETCH,
  AUTOCOMPLETE_FETCH_FULFILLED,
  AUTOCOMPLETE_FETCH_ERROR
} from '../actions/constants'

const initialState = {
  items: null,
  loading: false,
  error: null
}

const fetch = (): AutoCompleteListState => ({
  items: null,
  loading: true,
  error: null
})

const fetchFulfilled =
  (state: AutoCompleteListState, action: AutoCompleteFetchFulfilledAction): AutoCompleteListState => ({
    ...action.payload,
    loading: false,
    error: null
  })

const fetchError = (state: AutoCompleteListState, action: FetchErrorAction): AutoCompleteListState => ({
  ...state,
  ...action.payload,
  loading: false
})

export default function reducer(state: AutoCompleteListState = initialState, action: Action) {
  switch (action.type) {
    case AUTOCOMPLETE_FETCH:
      return fetch()
    case AUTOCOMPLETE_FETCH_FULFILLED:
      return fetchFulfilled(state, <AutoCompleteFetchFulfilledAction>action)
    case AUTOCOMPLETE_FETCH_ERROR:
      return fetchError(state, <FetchErrorAction>action)
    default:
      return state
  }
}

export const getItems = (state: AppState) => state.autoCompleteList.items
export const getLoading = (state: AppState) => state.autoCompleteList.loading
export const getError = (state: AppState) => state.autoCompleteList.error
