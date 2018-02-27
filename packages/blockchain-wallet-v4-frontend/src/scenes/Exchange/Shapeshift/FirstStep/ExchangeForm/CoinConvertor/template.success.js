import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { HeartbeatLoader, Icon, Link, Text } from 'blockchain-info-components'
import CoinInput from './CoinInput'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 45%;
  flex-grow: 2;
`
const ContainerMiddle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10%;
  min-width: 50px;
  flex-grow: 1;
  margin-top: 20px;

  & > :first-child:hover { color: ${props => props.theme['brand-primary']}; }
`
const Error = styled(Text)`
  position: absolute;
  display: block;
  top: -18px;
  right: 0;
  height: 15px;
`

const getErrorState = (meta) => {
  return !meta.touched ? 'initial' : (meta.invalid ? 'invalid' : 'valid')
}

const CoinConvertor = props => {
  const { sourceCoin, targetCoin, source, target, currency, btcRates, ethRates, meta, ...rest } = props
  const { handleChangeSource, handleChangeTarget, loading } = rest
  const errorState = getErrorState(meta)

  return (
    <Wrapper>
      <Row>
        <Container>
          <CoinInput
            coinName={sourceCoin}
            coin={source}
            currency={currency}
            btcRates={btcRates}
            ethRates={ethRates}
            handleChange={handleChangeSource}
            disabled={loading}
          />
        </Container>
        <ContainerMiddle>
          {loading
            ? <HeartbeatLoader width='20px' height='20px' />
            : <Icon name='right-arrow' size='24px' weight={500} cursor />
          }
        </ContainerMiddle>
        <Container>
          <CoinInput
            coinName={targetCoin}
            coin={target}
            currency={currency}
            btcRates={btcRates}
            ethRates={ethRates}
            handleChange={handleChangeTarget}
            disabled={loading}
          />
        </Container>
      </Row>
      {/* <Row>
        {meta.touched && meta.error && <Error size='13px' weight={300} color='error'>{meta.error}</Error>}
      </Row> */}
    </Wrapper>
  )
}

CoinConvertor.propTypes = {
  sourceCoin: PropTypes.string.isRequired,
  targetCoin: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  btcRates: PropTypes.object.isRequired,
  ethRates: PropTypes.object.isRequired,
  handleChangeSource: PropTypes.func.isRequired,
  handleChangeTarget: PropTypes.func.isRequired
}

export default CoinConvertor
