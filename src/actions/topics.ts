import {TOPICS_FETCH, TOPICS_FETCH_CANCEL} from './actionTypes'

export const fetchTopics = (name: string): TopicsFetchAction => ({
  type: TOPICS_FETCH,
  payload: { name }
})

export const fetchTopicsCancel = (): Action => ({
  type: TOPICS_FETCH_CANCEL
})
