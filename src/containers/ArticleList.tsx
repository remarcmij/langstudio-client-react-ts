import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { History } from 'history'
import { match } from 'react-router-dom'

import ArticleList from '../components/ArticleList'
import * as actions from '../actions/articleList'
import { getTopics, getLoading, getError } from '../reducers/articleList'

interface MatchParams {
  publication: string
}

interface OwnProps {
  history: History
  match: match<MatchParams>
}

interface ArticleListContainerProps extends OwnProps, ArticleListState {
  fetchArticleList: (publication: string) => void
  fetchArticleListCancelled: () => void
}

class ArticleListContainer extends React.Component<ArticleListContainerProps> {

  static defaultProps = {
    loading: false
  }

  constructor(props: ArticleListContainerProps) {
    super(props)
    this.onBackClick = this.onBackClick.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.handleFetchArticleTopics = this.handleFetchArticleTopics.bind(this)
  }

  componentDidMount() {
    const { publication } = this.props.match.params
    if (!this.props.topics[publication]) {
      this.handleFetchArticleTopics()
    }
  }

  componentWillUnmount() {
    const { loading, fetchArticleListCancelled } = this.props
    if (loading) {
      fetchArticleListCancelled()
    }
  }

  onBackClick() {
    this.props.history.push('/')
  }

  onSearchClick() {
    this.props.history.push('/search')
  }

  onItemClick(topic: Topic) {
    this.props.history.push(`/content/${topic.publication}/${topic.chapter}`)
  }

  handleFetchArticleTopics() {
    const { publication } = this.props.match.params
    this.props.fetchArticleList(publication)
  }

  render() {
    const { topics, error } = this.props
    const { publication } = this.props.match.params
    return (
      <ArticleList
        onBackClick={this.onBackClick}
        onSearchClick={this.onSearchClick}
        onItemClick={this.onItemClick}
        onRetryClick={this.handleFetchArticleTopics}
        topics={topics[publication]}
        error={error}
      />
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  topics: getTopics(state),
  loading: getLoading(state),
  error: getError(state)
})

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => ({
  fetchArticleList(publication: string) {
    dispatch(actions.fetchArticleList(publication))
  },
  fetchArticleListCancelled() {
    dispatch(actions.fetchArticleListCancel())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer)
