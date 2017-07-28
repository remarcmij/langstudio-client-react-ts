import * as React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'

interface AutoCompleteItem {
  item: SearchItem
  text: string
  value: JSX.Element
}

interface SearchBoxState {
  dataSource: AutoCompleteItem[]
}

interface SearchBoxProps {
  items: SearchItem[],
  loading: boolean,
  error: Error,
  fetchAutoCompleteList: (term: string) => void
  onItemSelected: (searchItem: SearchItem) => void
}

class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {

  state: SearchBoxState = {
    dataSource: []
  }

  constructor(props: SearchBoxProps) {
    super(props)
    this.onUpdateInput = this.onUpdateInput.bind(this)
    this.onNewRequest = this.onNewRequest.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      const elem = document.querySelector('.search-box__auto-complete input') as HTMLElement
      if (elem) {
        elem.focus()
      }
    }, 100)
  }

  componentWillReceiveProps({ items, loading, error }: SearchBoxProps) {
    if (loading || error) {
      return
    }

    const dataSource = items.map(item => ({
      item,
      text: item.word,
      value: <MenuItem primaryText={item.word} secondaryText={item.lang} />
    }))
    this.setState({ dataSource })
  }

  onUpdateInput(term: string) {
    term = term.trim()
    if (!term) {
      return this.setState({ dataSource: [] })
    }
    this.props.fetchAutoCompleteList(term)
  }

  onNewRequest(chosenRequest: AutoCompleteItem, index: number) {
    const { dataSource } = this.state
    const { onItemSelected } = this.props
    if (index === -1) {
      if (dataSource.length > 0) {
        onItemSelected(dataSource[0].item)
      }
    } else {
      onItemSelected(chosenRequest.item)
    }
  }

  render() {
    // animated needs to be false for Chrome 56+
    // see: https://developers.google.com/web/updates/2017/01/scrolling-intervention
    return (
      <div>
        <AutoComplete
          className="search-box__auto-complete"
          hintText="Search"
          animated={false}
          filter={AutoComplete.noFilter}
          dataSource={this.state.dataSource}
          onUpdateInput={this.onUpdateInput}
          onNewRequest={this.onNewRequest}
        />
      </div>
    )
  }
}

export default SearchBox
