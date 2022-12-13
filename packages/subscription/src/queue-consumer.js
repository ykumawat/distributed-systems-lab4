import { consumer } from './kafka.js'
import {
  subscriptionCreateTopic,
  subscriptionDeleteTopic,
  sendEmailTopic,
} from './config.js'
import Logger from './logger.js'

export async function listenToQueue() {
  const logger = Logger.create().withScope('listenToQueue')
  await consumer.connect()
  logger.info(`Listening to queue on Kafka consumer`)
  await consumer.subscribe({
    topic: subscriptionCreateTopic,
    fromBeginning: true,
  })
  await consumer.subscribe({
    topic: subscriptionDeleteTopic,
    fromBeginning: true,
  })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      logger
        .withTag('consumer.eachMessage')
        .info(`Received message with topic=${topic} on partition=${partition}`)

      if (topic === subscriptionCreateTopic) {
        logger.withTag('consumer.eachMessage').info('Consumer create message')
      } else if (topic === subscriptionDeleteTopic) {
        logger.withTag('consumer.eachMessage').info('Consumer delete message')
      } else {
        logger
          .withTag('consumer.eachMessage')
          .warn(`Received unknown topic=${topic} on partition=${partition}`)
      }
    },
  })
}
