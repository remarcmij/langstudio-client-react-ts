import * as React from 'react'
import List from 'material-ui/List'

import ChildAppBar from './ChildAppBar'
import ArticleListItem from './ArticleListItem'
import NetworkError from './NetworkError'

interface ArticleListProps {
  topics: Topic[]
  error: Error | null
  onRetryClick: () => void,
  onItemClick: (topic: Topic) => void,
  onBackClick: () => void
  onSearchClick: () => void
}

const noop = () => undefined

function ArticleList(props: ArticleListProps) {
  const {
    topics,
    error,
    onRetryClick = noop,
    onItemClick = noop,
    onBackClick = noop,
    onSearchClick = noop
  } = props

  const renderList = () => {
    if (error) {
      return <NetworkError error={error} onRetryClick={onRetryClick} />
    }
    if (!topics) {
      return null
    }
    const dir = getDir()

    return topics
      .slice(1)
      .map(topic =>
        <ArticleListItem key={topic._id} dir={dir} topic={topic} onItemClick={() => onItemClick(topic)} />
      )
  }

  const getDir = () => {
    if (!topics) {
      return 'ltr'
    }
    const index = topics[0]
    return index.baseLang.startsWith('ar') || index.targetLang.startsWith('ar') ? 'rtl' : 'ltr'
  }

  return (
    <div>
      <ChildAppBar
        title={topics && topics.length > 0 ? topics[0].title : ''}
        onBackClick={onBackClick}
        onSearchClick={onSearchClick}
      />
      <List>
        {renderList()}
      </List>
    </div>
  )
}

export default ArticleList
