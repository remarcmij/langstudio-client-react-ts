import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { History } from 'history'

import PublicationList from '../components/PublicationList'
import * as actions from '../actions/publicationList'
import { getTopics, getLoading, getError } from '../reducers/publicationList'

interface OwnProps {
  history: History
}

interface PublicationListContainerProps extends OwnProps, PublicationListState {
  fetchPublicationList: () => void
  fetchPublicationListCancelled: () => void
}

class PublicationListContainer extends React.Component<PublicationListContainerProps> {

  static defaultProps = {
    topics: null,
    loading: false,
    error: null
  }

  constructor(props: PublicationListContainerProps) {
    super(props)
    this.onItemClick = this.onItemClick.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
  }

  componentDidMount() {
    const { topics, fetchPublicationList } = this.props
    if (!topics) {
      fetchPublicationList()
    }
  }

  componentWillUnmount() {
    const { loading, fetchPublicationListCancelled } = this.props
    if (loading) {
      fetchPublicationListCancelled()
    }
  }

  onItemClick(topic: Topic) {
    this.props.history.push(`/content/${topic.publication}`)
  }

  onSearchClick() {
    this.props.history.push('/search')
  }

  render() {
    return (
      <PublicationList
        onItemClick={this.onItemClick}
        onSearchClick={this.onSearchClick}
        onRetryClick={this.props.fetchPublicationList}
        topics={this.props.topics}
        error={this.props.error}
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
  fetchPublicationList() {
    dispatch(actions.fetchPublicationList())
  },
  fetchPublicationListCancelled() {
    dispatch(actions.fetchPublicationListCancel())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PublicationListContainer)
