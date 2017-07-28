import * as React from 'react'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

interface ArticleListItemProps {
  topic: Topic
  dir: string
  onItemClick: (topic: Topic) => void
}

function ArticleListItem(props: ArticleListItemProps) {
  const {
    topic,
    dir,
    onItemClick = () => undefined
  } = props

  const { title, subtitle } = topic
  const secondaryText = subtitle ? (<p> {subtitle} </p>) : null

  return (
    <div>
      <ListItem
        primaryText={title}
        dir={dir}
        onTouchTap={() => onItemClick(topic)}
        secondaryText={secondaryText}
      />
      <Divider />
    </div>
  )
}

export default ArticleListItem
