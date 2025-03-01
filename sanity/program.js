#!/usr/bin/env babel-node

import { cli } from 'decentraland-server'
import { Log } from 'decentraland-commons'

import { SanityActions } from './SanityActions'
import { db } from '../src/database'
import { connectEth, PROVIDER_TYPES } from '../src/ethereum'
import { loadEnv } from '../scripts/utils'

const log = new Log('main')

export async function main(getActions = createSanityActions) {
  log.info('Connecting to database')
  await db.connect()

  log.info('Starting CLI')
  const sanityActions = getActions()

  cli.runProgram([getProgram(sanityActions)])
}

function getProgram(actions) {
  return {
    addCommands(program) {
      program
        .command('run')
        .option(
          '--skip [names]',
          'Skip validations. Names separated by commas, no spaces'
        )
        .option('--check-parcel [parcelId]', 'Check a specific parcel')
        .option(
          '--from-block [blockNumber]',
          'In order to not get from 0 to latest, set the started block to get events. Decentraland starts at 4900000'
        )
        .option(
          '--blocks-behind [blocks]',
          'Number of block to be substracted to the latest block used as a from-block'
        )
        .option(
          '--self-heal',
          'Try to fix found errors. Supports all flags supported by the monitor, except watch'
        )
        .option('--skip-logs', 'Skip logging errors at the end of the process')
        .option('--websocket', 'Should run doctors in a websocket')
        .action(async options => {
          log.info('Connecting to Ethereum node')
          await connectEth({
            providerType: options.websocket
              ? PROVIDER_TYPES.websocket
              : PROVIDER_TYPES.http
          })
          log.info('Starting sanity')
          await actions.run(options)
        })
    }
  }
}

function createSanityActions(...args) {
  return new SanityActions(...args)
}

if (require.main === module) {
  loadEnv('../src/.env')
  log.info('Batch size configurable via BATCH_SIZE')

  Promise.resolve()
    .then(main)
    .catch(console.error)
}
