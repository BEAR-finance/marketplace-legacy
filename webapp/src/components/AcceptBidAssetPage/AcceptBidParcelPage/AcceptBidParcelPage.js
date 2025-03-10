import React from 'react'
import PropTypes from 'prop-types'
import { t, T } from '@dapps/modules/translation/utils'

import { splitCoordinate } from 'shared/coordinates'
import ParcelModal from 'components/ParcelModal'
import ParcelDetailLink from 'components/ParcelDetailLink'
import Parcel from 'components/Parcel'
import Mana from 'components/Mana'
import { walletType, bidType } from 'components/types'

export default class AcceptBidParcelPage extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    wallet: walletType,
    bid: bidType,
    isOpen: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isConnected: PropTypes.bool.isRequired,
    bidderHasBalance: PropTypes.bool.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  render() {
    const {
      id,
      bid,
      isTxIdle,
      onCancel,
      handleConfirm,
      isOpen,
      bidderHasBalance
    } = this.props
    const [x, y] = splitCoordinate(id)
    const { price } = bid

    return (
      <Parcel x={x} y={y} shouldBeOwner>
        {parcel => {
          return (
            <div className="AcceptBidParcelPage">
              <ParcelModal
                x={x}
                y={y}
                title={t('asset_accept_bid.accept_bid_asset', {
                  asset_type: t('name.parcel')
                })}
                subtitle={
                  !isOpen ? (
                    t('asset_accept_bid.expired')
                  ) : (
                    <T
                      id="asset_accept_bid.about_to_accept_bid"
                      values={{
                        name: <ParcelDetailLink parcel={parcel} />,
                        price: <Mana amount={Math.floor(price)} size={14} />
                      }}
                    />
                  )
                }
                onCancel={onCancel}
                onConfirm={handleConfirm}
                isDisabled={isTxIdle || !isOpen || !bidderHasBalance}
                isTxIdle={isTxIdle}
              />
            </div>
          )
        }}
      </Parcel>
    )
  }
}
