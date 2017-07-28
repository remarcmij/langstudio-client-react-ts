import { AUTOCOMPLETE_FETCH } from './constants'

export const fetchAutoCompleteList = (term: string): AutoCompleteFetchAction => ({
  type: AUTOCOMPLETE_FETCH,
  payload: { term }
})
