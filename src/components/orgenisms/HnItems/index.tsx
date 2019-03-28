import React, { FC, useEffect, useState, useCallback } from 'react'
import { Item } from '@/models/hn'
import { useHNItem } from '@/store/hn/item'
import styled from 'styled-components'

interface Props {
  id: number
}
export const HnItems: FC<Props> = ({ id }) => {
  const { items, getItem } = useHNItem()
  const [item, setItem] = useState<Item | null>(null)
  const loadItem = useCallback(() => {
    if (!items) return
    const findItem: Item | undefined = items.find((itm: Item) => itm.id === id)
    if (!findItem) return
    setItem(findItem)
  }, [items, id])
  useEffect(() => {
    getItem(id)
  }, [getItem, id])
  useEffect(() => {
    loadItem()
  }, [loadItem])
  if (!item) return <p>...loading</p>
  return (
    <List>
      <a href={item.url} rel="noopener noreferrer" target="_blank">
        {item.title}
        <span>{item.type}</span>
        <span>{item.id}</span>
      </a>
      <p>author: {item.by}</p>
      <p>{item.score}</p>
    </List>
  )
}

const List = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid #aaa;
`
