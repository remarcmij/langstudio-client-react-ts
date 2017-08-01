import { AUTOCOMPLETE_FETCH } from './actionTypes'

export const fetchAutoCompleteList = (term: string): AutoCompleteFetchAction => ({
  type: AUTOCOMPLETE_FETCH,
  payload: { term }
})
