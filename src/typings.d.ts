interface Topic {
  _id: string
  fileName: string
  publication: string
  chapter: string
  targetLang: string
  baseLang: string
  groupName: string
  sortIndex: number
  title: string
  subtitle?: string
  author?: string
  copyright?: string
  publisher?: string
  publicationDate?: string
  isbn?: string
  lastModified: string
}

interface ArticleTopic {
  _id: string
  fileName: string
  groupName: string
  title: string
  targetLang?: string
  baseLang?: string
  rawBody: string
  body: string
  _topic: Topic
}

interface SearchItem {
  word: string
  lang: string
}

interface ArticleMap {
  [name: string]: ArticleTopic
}

interface ArticlesState {
  items: ArticleMap
  loading: boolean
  error: Error | null
}

interface TopicMap {
  [name: string]: Topic[]
}

interface TopicsState {
  items: TopicMap
  loading: boolean
  error: Error | null
}

interface AutoCompleteState {
  items: SearchItem[] | null
  loading: boolean
  error: Error | null
}

interface AppState {
  article: ArticlesState
  topics: TopicsState,
  autoCompletes: AutoCompleteState
}

interface Action {
  type: string
}

interface AutoCompleteFetchAction extends Action {
  payload: {
    term: string
  }
}

interface AutoCompleteFetchSuccessAction extends Action {
  payload: {
    items: SearchItem[]
  }
}

interface FetchFailureAction extends Action {
  payload: {
    error: Error
  }
}

interface ArticleFetchAction extends Action {
  payload: {
    publication: string
    chapter: string
  }
}

interface ArticleFetchSuccessAction extends Action {
  payload: {
    article: ArticleTopic
  }
}

interface TopicsFetchAction extends Action {
  payload: {
    name: string
  }
}

interface TopicsFetchSuccessAction extends Action {
  payload: {
    name: string
    topics: Topic[]
  }
}

interface PublicationListFetchSuccessAction extends Action {
  payload: {
    topics: Topic[]
  }
}
