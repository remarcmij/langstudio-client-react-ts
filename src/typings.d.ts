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

interface ArticleType {
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

interface ArticleState {
  article: ArticleType | null
  loading: boolean
  error: Error | null
}

interface ArticleListTopicsState {
  [publication: string]: Topic[]
}

interface ArticleListState {
  topics: ArticleListTopicsState
  loading: boolean
  error: Error | null
}

interface PublicationListState {
  topics: Topic[] | null,
  loading: boolean,
  error: Error | null
}

interface AutoCompleteListState {
  items: SearchItem[] | null
  loading: boolean
  error: Error | null
}

interface AppState {
  article: ArticleState
  articleList: ArticleListState
  publicationList: PublicationListState
  autoCompleteList: AutoCompleteListState
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
    article: ArticleType
  }
}

interface ArticleListFetchAction extends Action {
  payload: {
    publication: string
  }
}

interface ArticleListFetchSuccessAction extends Action {
  payload: {
    publication: string
    topics: Topic[]
  }
}

interface PublicationListFetchSuccessAction extends Action {
  payload: {
    topics: Topic[]
  }
}
