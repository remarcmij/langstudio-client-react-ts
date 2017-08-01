import { AUTOCOMPLETE_FETCH, AUTOCOMPLETE_FETCH_SUCCESS, AUTOCOMPLETE_FETCH_FAILURE } from '../actions/actionTypes'

const initialState = {
  items: null,
  loading: false,
  error: null
}

const fetch = (): AutoCompleteState => ({
  items: null,
  loading: true,
  error: null
})

const fetchSuccess =
  (state: AutoCompleteState, action: AutoCompleteFetchSuccessAction): AutoCompleteState => ({
    ...action.payload,
    loading: false,
    error: null
  })

const fetchFailure = (state: AutoCompleteState, action: FetchFailureAction): AutoCompleteState => ({
  ...state,
  ...action.payload,
  loading: false
})

export default function reducer(state: AutoCompleteState = initialState, action: Action): AutoCompleteState {
  switch (action.type) {
    case AUTOCOMPLETE_FETCH:
      return fetch()
    case AUTOCOMPLETE_FETCH_SUCCESS:
      return fetchSuccess(state, <AutoCompleteFetchSuccessAction>action)
    case AUTOCOMPLETE_FETCH_FAILURE:
      return fetchFailure(state, <FetchFailureAction>action)
    default:
      return state
  }
}

export const getItems = (state: AppState) => state.autoCompletes.items
export const getLoading = (state: AppState) => state.autoCompletes.loading
export const getError = (state: AppState) => state.autoCompletes.error
