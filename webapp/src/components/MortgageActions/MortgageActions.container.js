import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { locations } from 'locations'
import {
  cancelMortgageRequest,
  claimMortgageResolutionRequest
} from 'modules/mortgage/actions'
import { splitCoordinate } from 'shared/coordinates'
import MortgageActions from './MortgageActions'

const mapState = () => ({})

const mapDispatch = (dispatch, { mortgage }) => {
  const [x, y] = splitCoordinate(mortgage.asset_id)
  return {
    onCancel: () =>
      dispatch(cancelMortgageRequest(mortgage.mortgage_id, mortgage.asset_id)),
    onPay: () => dispatch(push(locations.payParcelMortgage(x, y))),
    onClaim: () =>
      dispatch(
        claimMortgageResolutionRequest(mortgage.loan_id, mortgage.asset_id)
      )
  }
}
export default connect(mapState, mapDispatch)(MortgageActions)
