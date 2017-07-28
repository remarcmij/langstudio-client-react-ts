import * as React from 'react'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

interface PublicationListItemProps {
  topic: Topic
  onItemClick: (topic: Topic) => void
}

function PublicationListItem(props: PublicationListItemProps) {
  const {
    topic,
    onItemClick = () => undefined
  } = props

  const { title, subtitle } = topic
  const secondaryText = subtitle ? (<p> {subtitle} </p>) : null

  return (
    <div>
      <ListItem
        onTouchTap={() => onItemClick(topic)}
        primaryText={title}
        secondaryText={secondaryText}
      />
      <Divider />
    </div>
  )
}

export default PublicationListItem
