import C from './constants'

export const fetchPublicationList = (): Action => ({ type: C.PUBLICATION_LIST_FETCH })
export const fetchPublicationListCancel = (): Action => ({ type: C.PUBLICATION_LIST_FETCH_CANCEL })
