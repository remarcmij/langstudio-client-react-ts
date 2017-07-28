import * as React from 'react'
import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import './NetworkError.css'

interface NetworkErrorProps {
  error: Error
  onRetryClick: () => void
}

function NetworkError(props: NetworkErrorProps) {
  const {
    error,
    onRetryClick = () => undefined
  }  = props

  return (
    <Card className="network-error__card">
      <CardHeader title="A network error occurred" subtitle={'Error: ' + error.message} />
      <CardActions>
        <FlatButton label="Retry" onClick={onRetryClick} />
      </CardActions>
    </Card>
  )
}

export default NetworkError
