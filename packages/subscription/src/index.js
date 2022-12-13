import server from './grpc.js'
import { port } from './config.js'
import Logger from './logger.js'
import { producer } from './kafka.js'
import { listenToQueue } from './queue-consumer.js'

async function run() {
  const logger = Logger.create().withScope('application').withTag('run')
  server.start(`0.0.0.0:${port}`)
  await producer.connect()
  await listenToQueue()
  logger.info('Kafka connection established')
}

run()
