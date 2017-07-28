import * as React from 'react'
import { Route } from 'react-router-dom'

import PublicationList from './containers/PublicationList'
import ArticleList from './containers/ArticleList'
import Article from './containers/Article'
import SearchPage from './containers/SearchPage'

export default (
  <div>
    <Route exact={true} path="/" component={PublicationList} />
    <Route exact={true} path="/content/:publication" component={ArticleList} />
    <Route path="/content/:publication/:chapter" component={Article} />
    <Route path="/search" component={SearchPage} />
  </div>
)
