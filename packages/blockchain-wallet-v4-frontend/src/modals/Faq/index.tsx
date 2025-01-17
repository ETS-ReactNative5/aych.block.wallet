import { any, assoc, contains, curry, filter, map, path, toLower } from 'ramda'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getData } from './selectors'
import { injectIntl } from 'react-intl'
import { RemoteDataType } from 'core/types'
import { selectors } from 'data'
import Faq from './template.js'
import FaqContent from './FaqContent'
import Flyout, { duration } from 'components/Flyout'
import modalEnhancer from 'providers/ModalEnhancer'
import React from 'react'

type OwnPropsType = {
  close: () => void
  position: number
  total: number
  userClickedOutside: boolean
}

type LinkStatePropsType = {
  canTrade: RemoteDataType<any, boolean>
  data: any
}

type IntlType = {
  intl: {
    messages: {}
  }
}

type Props = OwnPropsType & LinkStatePropsType & IntlType

class FaqContainer extends React.PureComponent<Props> {
  state = { show: false }

  componentDidMount () {
    /* eslint-disable */
    this.setState({ show: true })
    /* eslint-enable */
  }

  render () {
    const { data, canTrade } = this.props
    const { search } = data

    const partner = canTrade.cata({
      Success: val => val || 'n/a',
      Loading: () => false,
      Failure: () => false,
      NotAsked: () => false
    })

    // Search for matching messages in the component subtree starting
    const containsRecursive = curry((search, x) => {
      if (path(['props', 'defaultMessage'], x)) {
        return contains(
          toLower(search),
          toLower(
            this.props.intl.messages[x.props.id] || x.props.defaultMessage
          )
        )
      } else if (path(['props', 'children'], x)) {
        // @ts-ignore
        return any(containsRecursive(search), path(['props', 'children'], x))
      } else {
        return false
      }
    })

    const whitelistContent = contentPart => {
      return contentPart.whitelist
        ? contentPart.whitelist.includes(partner)
        : true
    }

    const filterContent = contentPart => {
      if (search) {
        const filteredGroupQuestions = filter(
          q =>
            // @ts-ignore
            containsRecursive(search, q.question) ||
            // @ts-ignore
            containsRecursive(search, q.answer) ||
            containsRecursive(search, contentPart.groupTitleMsg)
        )(contentPart.groupQuestions)
        return assoc('groupQuestions', filteredGroupQuestions, contentPart)
      } else {
        return contentPart
      }
    }

    const whitelistedContent = filter(whitelistContent, FaqContent)
    const filteredContent = map(filterContent, whitelistedContent)
    const { position, total, close, userClickedOutside } = this.props

    return (
      <Flyout
        in={this.state.show}
        onClose={close}
        position={position}
        total={total}
        userClickedOutside={userClickedOutside}
        data-e2e='faqModal'
      >
        <Faq filteredContent={filteredContent} />
      </Flyout>
    )
  }
}

const mapStateToProps = state => ({
  data: getData(state),
  canTrade: selectors.exchange.getCanTrade(state)
})

const enhance = compose<any>(
  modalEnhancer('FAQ_MODAL', { transition: duration }),
  connect(mapStateToProps),
  injectIntl
)

export default enhance(FaqContainer)
