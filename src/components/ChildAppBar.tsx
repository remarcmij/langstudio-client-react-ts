import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

interface ChildAppBarProps {
  title: string
  onBackClick: () => void
  onSearchClick: () => void
}

const noop = () => undefined

function ChildAppBar(props: ChildAppBarProps) {
  const {
    title,
    onBackClick = noop,
    onSearchClick = noop
  } = props

  return (
    <AppBar
      className="AppBar"
      title={title}
      iconElementLeft={
        <IconButton onTouchTap={onBackClick}>
          <FontIcon className="material-icons">arrow_back</FontIcon>
        </IconButton>}
      iconElementRight={
        <IconButton onTouchTap={onSearchClick}>
          <FontIcon className="material-icons">search</FontIcon>
        </IconButton>}
    />
  )
}

export default ChildAppBar
