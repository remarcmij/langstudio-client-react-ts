import { combineReducers } from 'redux'

import topics from './topics'
import article from './article'
import autoCompletes from './autoComplete'

export const rootReducer = combineReducers<AppState>({
  topics,
  article,
  autoCompletes
})
