<template>
  <h4>Stats</h4>

  <div class="mt-4">
    <ul>
      <li>Profit: {{ profit }}</li>
      <li>Settled orders count: {{ settledOrdersCount }}</li>
    </ul>
  </div>

  <!-- <div class="mt-4">
    {{ strategy }}
    <select class="form-select" v-model="strategy">
      <option v-for="strategy in strategies" :key="strategy">
        {{ strategy }}
      </option>
    </select>
  </div> -->

  <table class="table table-striped table-dark mt-4">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">League</th>
        <th scope="col">Fixture</th>
        <th scope="col">Outcome</th>
        <th scope="col">Order Placed At</th>
        <th scope="col">Sharp Odds</th>
        <th scope="col">Exchange Odds</th>
        <th scope="col">Exchange UI Odds</th>
        <th scope="col">Bet Value</th>
        <th scope="col">Settled</th>
        <th scope="col">Price Matched</th>
        <th scope="col">Fixture Commence Time</th>
        <th scope="col">Side</th>
        <th scope="col">Strategy</th>
        <th scope="col">Profit</th>
      </tr>
    </thead>

    <tbody>
      <BetStatsRowItem
        v-for="(bet, index) in betsExecuted"
        :key="index"
        :stats="bet"
        :index="index"
        :settledOrders="settledOrders"
      >
        {{ bet }}
      </BetStatsRowItem>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { onMounted } from '@vue/runtime-core'
import dayjs from 'dayjs'
import {
  getBetExecutions,
  getSettledClearedOrders,
} from '../http/redwoodApi.http'
import { OrderSide, type BetExecution } from '../types'
import BetStatsRowItem from '../components/BetStatsRowItem.vue'

// const strategies = [ 'BlackStone', 'RedStone']

let betsExecuted = ref<BetExecution[]>([])
let settledOrders = ref<any[]>([])
// let strategy = ref<string>(strategies[0])

// strategy.value = 'RedStone'

const strategy = 'BlackStone';

const profit = computed(() =>
  settledOrders.value.reduce((acc, order) => acc + order.profit, 0),
)

const settledOrdersCount = computed(() => settledOrders.value.length)


onMounted(() => {
  loadBetExecutions()
  loadSettledOrders()
})

async function loadBetExecutions() {
  console.log('load bet executions ()');
  console.log(OrderSide);

  betsExecuted.value = []

  // @ts-ignore
  betsExecuted.value = await getBetExecutions(OrderSide.Lay, strategy)
}

async function loadSettledOrders() {
  settledOrders.value = await getSettledClearedOrders()
}

function readableDate(date: Date) {
  return dayjs(date).format('DD MM YYYY')
}

watch(strategy, () => {
  console.log('strategy changed!');
  loadBetExecutions();
})
</script>
