import C from './constants'

export const fetchAutoCompleteList = (term: string): AutoCompleteFetchAction => ({
  type: C.AUTOCOMPLETE_FETCH,
  payload: { term }
})
