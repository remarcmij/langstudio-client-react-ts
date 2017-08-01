import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'

import { combineEpics } from 'redux-observable'
import { fetchTopicsEpic } from './topics'
import { fetchArticleEpic } from './article'
import { fetchAutoCompletesEpic } from './autoComplete'

export const rootEpic = combineEpics(
  fetchTopicsEpic,
  fetchArticleEpic,
  fetchAutoCompletesEpic
)
