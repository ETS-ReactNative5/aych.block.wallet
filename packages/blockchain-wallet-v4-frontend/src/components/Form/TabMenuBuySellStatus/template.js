import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import {
  Image,
  Link,
  TabMenu,
  TabMenuItem,
  Text
} from 'blockchain-info-components'

const PartnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 992px) {
    display: none;
  }
`
const PartnerLink = styled(Link)`
  padding: 5px 8px 0;
`

const TabMenuBuySellStatus = props => {
  const { handleClick, partner, value } = props

  return (
    <>
      <TabMenu>
        <TabMenuItem
          className={value === 'buy' ? 'active' : ''}
          onClick={() => handleClick('buy')}
        >
          <FormattedMessage
            id='components.form.tabmenubuysell.buy'
            defaultMessage='Buy'
          />
        </TabMenuItem>
        <TabMenuItem
          className={value === 'sell' ? 'active' : ''}
          onClick={() => handleClick('sell')}
        >
          <FormattedMessage
            id='components.form.tabmenubuysell.sell'
            defaultMessage='Sell'
          />
        </TabMenuItem>
        <TabMenuItem
          className={value === 'order_history' ? 'active' : ''}
          onClick={() => handleClick('order_history')}
        >
          <FormattedMessage
            id='components.form.tabmenubuysell.orderhistory'
            defaultMessage='Order History'
          />
        </TabMenuItem>
      </TabMenu>
      {partner && (
        <PartnerWrapper>
          <Text size='12px' weight={400}>
            <FormattedMessage
              id='scenes.exchange.menutop.poweredby'
              defaultMessage='Powered by'
            />
          </Text>
          <PartnerLink href='https://www.coinify.com' target='_blank'>
            <Image name='coinify-logo' width='60px' height='25px' />
          </PartnerLink>
        </PartnerWrapper>
      )}
    </>
  )
}

TabMenuBuySellStatus.propTypes = {
  partner: PropTypes.string,
  value: PropTypes.oneOf(['buy', 'sell', 'order_history', '']),
  onClick: PropTypes.func
}

export default TabMenuBuySellStatus
