import { Item, User, StoryKind, Update } from '@/models/hn'
import { request } from '@/utils/request'

const domain = 'https://hacker-news.firebaseio.com'
const version = 'v0'

const host = `${domain}/${version}`

export const getItem = ({ id }: { id: Pick<Item, 'id'> }): Promise<Item> =>
  request<Item>(`${host}/item/${id}.json`)

export const getUser = ({ id }: { id: Pick<User, 'id'> }): Promise<User> =>
  request<User>(`${host}/user/${id}.json`)

export const getStories = ({ kind }: { kind: StoryKind }): Promise<Number[]> =>
  request<Number[]>(`${host}/${kind}stories.json`)

export const getUpdates = (): Promise<Update[]> =>
  request<Update[]>(`${host}/updates.json`)
