import React, { FC, useEffect, useState } from 'react'
import { Item } from '@/models/hn'
import { connectItem } from '@/store/hn/item'

interface Props {
  id: number
}
export const HnItems: FC<Props> = ({ id }) => {
  const { items, getItem } = connectItem()
  const [item, setItem] = useState<Item | null>(null)
  useEffect(() => {
    getItem(id)
  }, [])
  useEffect(() => {
    if (!items) return
    const findItem: Item | undefined = items.find((itm: Item) => itm.id === id)
    if (!findItem) return
    setItem(findItem)
  }, [items])
  if (!item) return <p>...loading</p>
  return <>{JSON.stringify(item)}</>
}
