import { PUBLICATION_LIST_FETCH, PUBLICATION_LIST_FETCH_CANCELLED } from './constants'

export const fetchPublicationList = (): Action => ({ type: PUBLICATION_LIST_FETCH })
export const fetchPublicationListCancelled = (): Action => ({ type: PUBLICATION_LIST_FETCH_CANCELLED })
