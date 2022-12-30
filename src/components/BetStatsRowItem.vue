<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ stats.league }}</td>
    <td>{{ stats.fixture }}</td>
    <td>{{ stats.outcome }}</td>
    <td>{{ createdAt }}</td>
    <td>{{ odds }}</td>
    <td>{{ betValue }}</td>
    <td>
      <i v-if="hasSettledOrder" class="fa-solid fa-check text-success"></i>
      <i v-if="!hasSettledOrder" class="fa-solid fa-x text-danger"></i>
    </td>
    <td>
      {{ priceMatched }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed, ref, defineProps } from 'vue'
import dayjs from 'dayjs'

const props = defineProps(['stats', 'index', 'settledOrders'])

const stats = ref<any[]>(props.stats)
const index = ref<number>(props.index)
const createdAt = ref<string>(readableDate(props.stats.createdAt))
const odds = ref<number>(props.stats.odds?.exchangeOdds || null)
const betValue = ref<number>(props.stats.odds?.betValue || null)

const settledOrder = computed(() => {
  const { marketId, selectionId } = abstractIds(props.stats.id)

  return props.settledOrders.find(
    (order: any) =>
      Number(order.marketId) === marketId && order.selectionId === selectionId,
  )
})

const hasSettledOrder = computed(() => Boolean(settledOrder.value))

const priceMatched = computed(() => settledOrder.value?.priceMatched)

function readableDate(date: Date) {
  return dayjs(date).format('DD MM YYYY')
}

function abstractIds(id: string) {
  const ids = id.split('_')

  return {
    marketId: Number(ids[0]),
    selectionId: Number(ids[1]),
  }
}
</script>
