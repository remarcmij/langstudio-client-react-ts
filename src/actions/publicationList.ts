import AT from './actionTypes'

export const fetchPublicationList = (): Action => ({ type: AT.PUBLICATIONLIST_FETCH })
export const fetchPublicationListCancel = (): Action => ({ type: AT.PUBLICATIONLIST_FETCH_CANCEL })
