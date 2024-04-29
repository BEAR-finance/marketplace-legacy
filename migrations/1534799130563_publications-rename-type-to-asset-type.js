import { Publication } from '../src/Listing'

exports.up = pgm => {
  pgm.renameColumn(Publication.tableName, 'type', 'asset_type')
}

exports.down = pgm => {
  pgm.renameColumn(Publication.tableName, 'asset_type', 'type')
}
