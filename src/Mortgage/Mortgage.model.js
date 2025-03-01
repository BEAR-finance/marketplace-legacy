import { Model } from 'decentraland-server'

import { SQL } from '../database'
import { MORTGAGE_STATUS } from '../shared/mortgage'

export class Mortgage extends Model {
  static tableName = 'mortgages'
  static columnNames = [
    'tx_hash',
    'tx_status',
    'block_number',
    'status',
    'asset_id',
    'asset_type',
    'borrower',
    'lender',
    'loan_id',
    'mortgage_id',
    'amount',
    'expires_at',
    'is_due_at',
    'payable_at',
    'started_at',
    'paid',
    'interest_rate',
    'punitory_interest_rate',
    'outstanding_amount',
    'block_time_created_at',
    'block_time_updated_at'
  ]
  static primaryKey = 'tx_hash'

  static findByMortgageId(id) {
    return this.find({ mortgage_id: id })
  }

  static findByBorrower(borrower, status = Object.values(MORTGAGE_STATUS)) {
    return this.query(
      SQL`SELECT *
        FROM ${SQL.raw(this.tableName)}
        WHERE borrower = ${borrower}
          AND status = ANY(${status})
          ORDER BY created_at DESC`
    )
  }

  static async findByLoanId(loan_id) {
    return this.findOne({ loan_id })
  }

  static findInCoordinate(assetId, status = Object.values(MORTGAGE_STATUS)) {
    return this.query(
      SQL`SELECT *
        FROM ${SQL.raw(this.tableName)}
        WHERE asset_id = ${assetId}
          AND status = ANY(${status})
          ORDER BY created_at DESC`
    )
  }
}
