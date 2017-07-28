import * as React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter as Router } from 'react-router-dom'

interface RootProps {
  store: Store<AppState>
  routes: JSX.Element
}

function Root({ store, routes }: RootProps) {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <Router>
          {routes}
        </Router>
      </MuiThemeProvider>
    </Provider>
  )
}

export default Root
