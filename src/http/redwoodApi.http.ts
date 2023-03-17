import axios from 'axios'
import type { BetExecution, OrderSide } from '@/types'

const host = import.meta.env.VITE_REDWOOD_API_URL

export async function getBetExecutions(
  side: OrderSide,
): Promise<BetExecution[]> {
  const params = {
    order: ['createdAt DESC'],
    where: { side },
    include: [
      {
        relation: 'odds',
        scope: {
          include: [{ relation: 'fixture' }],
        },
      },
    ],
  }
  const paramsEncoded = encodeURIComponent(JSON.stringify(params))

  return axios
    .get(`${host}/bet-executions?filter=${paramsEncoded}`)
    .then((response) => {
      console.log('response row e.g ', response.data[0])
      return response.data
    })
    .catch((e) => {
      console.log(e.message)
      throw new Error('Failed to get bet executions')
    })
}

export async function getSettledClearedOrders() {
  return axios
    .get(`${host}/cleared-orders/SETTLED`)
    .then((response) => response.data)
    .catch(() => {
      throw new Error('Failed to get settled cleared orders')
    })
}
