import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { History } from 'history'
import { match } from 'react-router-dom'

import Article from '../components/Article'
import { fetchArticle, fetchArticleCancel } from '../actions/article'
import { getArticle, getLoading, getError } from '../reducers/article'
import speechService from '../services/speechService'

interface MatchParams {
  publication: string
  chapter: string
}

interface OwnProps {
  history: History
  match: match<MatchParams>
}

interface ArticleContainerProps extends OwnProps {
  article: ArticleTopic,
  loading: boolean,
  error: Error | null
  fetchArticle: (publication: string, chapter: string) => void
  fetchArticleCancelled: () => void
  clearArticle: () => void
}

class ArticleContainer extends React.Component<ArticleContainerProps> {

  static defaultProps = {
    loading: false
  }

  constructor(props: ArticleContainerProps) {
    super(props)
    this.onBackClick = this.onBackClick.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
    this.handleFetchArticle = this.handleFetchArticle.bind(this)
    this.handleSpeech = this.handleSpeech.bind(this)
  }

  componentDidMount() {
    if (!this.props.article) {
      this.handleFetchArticle()
    }
  }

  componentWillUnmount() {
    if (this.props.loading) {
      this.props.fetchArticleCancelled()
    }
  }

  handleFetchArticle() {
    const { publication, chapter } = this.props.match.params
    this.props.fetchArticle(publication, chapter)
  }

  onBackClick() {
    const { params } = this.props.match
    this.props.history.push(`/content/${params.publication}`)
  }

  onSearchClick() {
    this.props.history.push('/search')
  }

  handleSpeech(text: string, lang: string) {
    if (speechService.isSpeechSynthesisSupported) {
      speechService.speak(text, lang)
    }
  }

  render() {
    return (
      <Article
        onBackClick={this.onBackClick}
        onSearchClick={this.onSearchClick}
        onRetryClick={this.handleFetchArticle}
        handleSpeech={this.handleSpeech}
        article={this.props.article}
        error={this.props.error}
      />
    )
  }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
  const { publication, chapter } = ownProps.match.params
  const fileName = `${publication}.${chapter}.md`
  return {
    article: getArticle(state, fileName),
    loading: getLoading(state),
    error: getError(state)
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => ({
  fetchArticle(publication: string, chapter: string) {
    dispatch(fetchArticle(publication, chapter))
  },
  fetchArticleCancelled() {
    dispatch(fetchArticleCancel())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer)
