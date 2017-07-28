import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

interface SearchAppBarProps {
  title: string
  onBackClick: () => void
  children: JSX.Element
}

const noop = () => undefined

function SearchAppBar(props: SearchAppBarProps) {
  const {
    title,
    onBackClick = noop,
    children
  } = props

  return (
    <AppBar
      className="AppBar"
      title={title}
      iconElementLeft={
        <IconButton onTouchTap={onBackClick}>
          <FontIcon className="material-icons">arrow_back</FontIcon>
        </IconButton>}
    >
      {children}
    </AppBar>
  )
}

export default SearchAppBar
