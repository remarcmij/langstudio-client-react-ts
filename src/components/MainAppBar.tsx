import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

interface MainAppBarProps {
  title: string
  onSearchClick: () => void
}

function MainAppBar(props: MainAppBarProps) {
  const {
    title,
    onSearchClick = () => undefined
  } = props

  return (
    <AppBar
      className="AppBar"
      title={title}
      iconElementRight={
        <IconButton onTouchTap={onSearchClick}>
          <FontIcon className="material-icons">search</FontIcon>
        </IconButton>}
    />
  )
}

export default MainAppBar
