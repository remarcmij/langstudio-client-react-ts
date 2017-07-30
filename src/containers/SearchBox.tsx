import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import SearchBox from '../components/SearchBox'
import * as actions from '../actions/autoCompleteList'
import { getItems, getLoading, getError } from '../reducers/autoCompleteList'

interface OwnProps {
  onItemSelected: (searchItem: SearchItem) => void
}

const mapStateToProps = (state: AppState, {onItemSelected}: OwnProps) => ({
  items: getItems(state),
  loading: getLoading(state),
  error: getError(state),
  onItemSelected
})

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => ({
  fetchAutoCompleteList(term: string) {
    dispatch(actions.fetchAutoCompleteList(term))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)
