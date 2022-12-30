import axios from 'axios'
import type { BetExecution } from '@/types'

const host = import.meta.env.VITE_REDWOOD_API_URL

export async function getBetExecutions(): Promise<BetExecution[]> {
  const params = {
    'filter[order][]': 'createdAt DESC',
    'filter[include][]': 'odds',
  }

  return axios
    .get(`${host}/bet-executions`, { params })
    .then((response) => response.data)
    .catch(() => {
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
