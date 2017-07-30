import AT from './actionTypes'

export const fetchAutoCompleteList = (term: string): AutoCompleteFetchAction => ({
  type: AT.AUTOCOMPLETE_FETCH,
  payload: { term }
})
