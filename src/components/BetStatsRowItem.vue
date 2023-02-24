<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ stats.league }}</td>
    <td>{{ stats.fixture }}</td>
    <td>{{ stats.outcome }}</td>
    <td>{{ createdAt }}</td>
    <td>{{ sharpOddsAverage }}</td>
    <td>{{ odds }}</td>
    <td>{{ exchangeUIOdds }}</td>
    <td>{{ betValue }}</td>
    <td>
      <i v-if="hasSettledOrder" class="fa-solid fa-check text-success"></i>

      <template v-if="!hasSettledOrder">
        <i v-if="hasStarted" class="fa-solid fa-x text-danger"></i>
        <i v-else class="fa-solid fa-minus text-warning"></i>
      </template>
    </td>
    <td>
      {{ priceMatched }}
    </td>
    <td>{{ fixtureCommenceTime }}</td>
    <td>{{ profit }}</td>
  </tr>
</template>

<script setup lang="ts">
import { computed, ref, defineProps } from 'vue'
import dayjs from 'dayjs'

const props = defineProps(['stats', 'index', 'settledOrders'])

const stats = ref<any[]>(props.stats)
const index = ref<number>(props.index)
const createdAt = ref<string>(readableDateTime(props.stats.createdAt))
const sharpOddsAverage = ref<number>(props.stats.odds?.sharpOddsAverage || null)
const odds = ref<number>(props.stats.odds?.exchangeOdds || null)
const exchangeUIOdds = ref<number>(props.stats.odds?.exchangeUIOdds || null)
const betValue = ref<number>(props.stats.odds?.betValue || null)

const fixtureCommenceTime = ref<string>(
  readableDateTime(props.stats.odds?.fixture?.commenceTime),
)

const settledOrder = computed(() => {
  const { marketId, selectionId } = abstractIds(props.stats.id)

  return props.settledOrders.find(
    (order: any) =>
      Number(order.marketId) === marketId && order.selectionId === selectionId,
  )
})

const hasSettledOrder = computed(() => Boolean(settledOrder.value))

const priceMatched = computed(() => settledOrder.value?.priceMatched)

const hasStarted = computed(() => {
  const now = new Date()
  const commenceTime = props.stats.odds?.fixture?.commenceTime

  if (!commenceTime) {
    return true
  }

  return new Date(commenceTime) < now
})

const profit = computed(() => settledOrder.value?.profit)

function readableDate(date: Date) {
  return dayjs(date).format('DD MM YYYY')
}

function readableDateTime(date: Date) {
  return dayjs(date).format('DD/MM/YYYY HH:MM')
}

function abstractIds(id: string) {
  const ids = id.split('_')

  return {
    marketId: Number(ids[0]),
    selectionId: Number(ids[1]),
  }
}
</script>
