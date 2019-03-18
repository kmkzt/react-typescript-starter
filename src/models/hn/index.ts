export type Item = {
  id: number
  index: number
  deleted?: boolean
  type?: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'
  by?: string
  time?: number
  text?: string
  dead?: boolean
  parent?: number
  poll?: number
  kids?: number[]
  subItems?: Item[]
  level?: number
  url?: string
  score?: number
  title?: string
  parts?: number[]
  descendants?: number
  domain?: string
  moment?: string
}

export type User = {
  id: string
  delay?: number
  created: number
  karma: number
  about?: string
  submitted?: number[]
}

export type Stories = number[]
export type StoryKind = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job'

export type Update = {
  items: number[]
  profiles: string[]
}
