import C from './constants'

export const fetchPublicationList = (): Action => ({ type: C.PUBLICATION_LIST_FETCH })
export const fetchPublicationListCancelled = (): Action => ({ type: C.PUBLICATION_LIST_FETCH_CANCELLED })
