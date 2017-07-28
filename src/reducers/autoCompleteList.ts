import C from '../actions/constants'

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

const fetchDone =
  (state: AutoCompleteListState, action: AutoCompleteFetchDoneAction): AutoCompleteListState => ({
    ...action.payload,
    loading: false,
    error: null
  })

const fetchError = (state: AutoCompleteListState, action: FetchErrorAction): AutoCompleteListState => ({
  ...state,
  ...action.payload,
  loading: false
})

export default function reducer(state: AutoCompleteListState = initialState, action: Action): AutoCompleteListState {
  switch (action.type) {
    case C.AUTOCOMPLETE_FETCH:
      return fetch()
    case C.AUTOCOMPLETE_FETCH_DONE:
      return fetchDone(state, <AutoCompleteFetchDoneAction>action)
    case C.AUTOCOMPLETE_FETCH_ERROR:
      return fetchError(state, <FetchErrorAction>action)
    default:
      return state
  }
}

export const getItems = (state: AppState) => state.autoCompleteList.items
export const getLoading = (state: AppState) => state.autoCompleteList.loading
export const getError = (state: AppState) => state.autoCompleteList.error
