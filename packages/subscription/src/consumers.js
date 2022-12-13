import Logger from './logger.js'
import { producer } from './kafka.js'
import { sendEmailTopic } from './config.js'

const logger = Logger.create().withScope('consumers')

export async function findAll(ctx) {
  ctx.res = {
    // TODO: Add findall to here.
    rows: []
  }
}

export async function findOne(ctx) {
  const { subscription_id } = ctx.req
  // TODO: Add find by id here.
  ctx.res = {}
}

export async function create(ctx) {
  logger.withTag('create').info(`Sending an email to ${ctx.req.email}`)

  // TODO: Add create subscription to here.
  ctx.res = {}
}

export async function cancel(ctx) {
  const { subscription_id } = ctx.req

  // TODO: Add delete functionality here.
  ctx.res = {}
}
