interface Odds {
  UUID: string
  betValue: number
  exchangeOdds: number
}

export interface BetExecution {
  id: number
  league: string
  fixture: string
  outcome: string
  createdAt: Date
  odds: Odds
}
