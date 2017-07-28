import * as React from 'react'
import { History } from 'history'

import SearchAppBar from '../components/SearchAppBar'
import SearchBox from './SearchBox'

interface SearchPageProps {
  history: History
}

class SearchPage extends React.Component<SearchPageProps> {

  constructor(props: SearchPageProps) {
    super(props)
    this.onBackClick = this.onBackClick.bind(this)
    this.onItemSelected = this.onItemSelected.bind(this)
  }

  onBackClick() {
    this.props.history.goBack()
  }

  onItemSelected(searchItem: SearchItem) {
    console.log(searchItem)
  }

  render() {
    return (
      <div>
        <SearchAppBar title="Search" onBackClick={this.onBackClick}>
          <SearchBox onItemSelected={this.onItemSelected} />
        </SearchAppBar>
      </div>
    )
  }
}

export default SearchPage
