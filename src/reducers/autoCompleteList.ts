import AT from '../actions/actionTypes'

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

const fetchSuccess =
  (state: AutoCompleteListState, action: AutoCompleteFetchSuccessAction): AutoCompleteListState => ({
    ...action.payload,
    loading: false,
    error: null
  })

const fetchFailure = (state: AutoCompleteListState, action: FetchFailureAction): AutoCompleteListState => ({
  ...state,
  ...action.payload,
  loading: false
})

export default function reducer(state: AutoCompleteListState = initialState, action: Action): AutoCompleteListState {
  switch (action.type) {
    case AT.AUTOCOMPLETE_FETCH:
      return fetch()
    case AT.AUTOCOMPLETE_FETCH_SUCCESS:
      return fetchSuccess(state, <AutoCompleteFetchSuccessAction>action)
    case AT.AUTOCOMPLETE_FETCH_FAILURE:
      return fetchFailure(state, <FetchFailureAction>action)
    default:
      return state
  }
}

export const getItems = (state: AppState) => state.autoCompleteList.items
export const getLoading = (state: AppState) => state.autoCompleteList.loading
export const getError = (state: AppState) => state.autoCompleteList.error
