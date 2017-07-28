import * as React from 'react'
import List from 'material-ui/List'

import MainAppBar from './MainAppBar'
import PublicationListItem from './PublicationListItem'
import NetworkError from './NetworkError'

const noop = () => undefined

interface PublicationListProps {
  topics: Topic[] | null
  error: Error | null
  onRetryClick: () => void
  onItemClick: (topic: Topic) => void
  onSearchClick: () => void
}

function PublicationList(props: PublicationListProps) {
  const {
    topics,
    error,
    onRetryClick = noop,
    onItemClick = noop,
    onSearchClick = noop
  } = props

  const renderList = () => {
    if (error) {
      return <NetworkError error={error} onRetryClick={onRetryClick} />
    }
    if (!topics) {
      return null
    }
    return topics.map(topic =>
      <PublicationListItem key={topic._id} topic={topic} onItemClick={onItemClick} />
    )
  }

  return (
    <div>
      <MainAppBar title="TaalMap Indonesisch" onSearchClick={onSearchClick} />
      <List>
        {renderList()}
      </List>
    </div>
  )
}

export default PublicationList
