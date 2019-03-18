import { Item, User, StoryKind, Update, Stories } from '@/models/hn'
import { request } from '@/utils/request'

const domain = 'https://hacker-news.firebaseio.com'
const version = 'v0'

const host = `${domain}/${version}`

export const fetchItem = ({ id }: { id: number }): Promise<Item> =>
  request<Item>(`${host}/item/${id}.json`)

export const fetchUser = ({ id }: { id: string }): Promise<User> =>
  request<User>(`${host}/user/${id}.json`)

export const fetchStories = ({ kind }: { kind: StoryKind }): Promise<Stories> =>
  request<Stories>(`${host}/${kind}stories.json`)

export const fetchUpdates = (): Promise<Update> =>
  request<Update>(`${host}/updates.json`)
