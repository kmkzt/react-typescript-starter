import React, { FC, useEffect, useState, useCallback } from 'react'
import { useHNStories } from '@/store/hn/stories'
import { StoryKind } from '@/models/hn'
import { HnItems } from '@/components/orgenisms/HnItems'

interface Props {
  kind: StoryKind
}

function pageMaxNumber(items: any[], num: number): number {
  return Math.ceil(items.length / num)
}
function pageItem<T>(items: T[], page: number): T[] {
  return items.slice(page * 10, page * 10 + 10)
}
export const HnStory: FC<Props> = ({ kind }) => {
  const { stories, getStory } = useHNStories()
  const [page, setPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const changePage = (p: number) => (e: React.MouseEvent<HTMLAnchorElement>) =>
    setPage(p)
  useEffect(() => {
    if (loading) {
      getStory(kind)
      setLoading(false)
    }
  }, [loading, getStory, kind])
  useEffect(() => {
    setPage(0)
    setLoading(true)
  }, [kind])
  if (!stories || !stories.hasOwnProperty(kind)) return <p>...loading</p>

  return (
    <div>
      {Array.from({ length: pageMaxNumber(stories[kind], 10) }).map(
        (n: any, i: number) => (
          <a
            key={i}
            style={{
              display: 'inline-block',
              padding: '.3rem',
              background: page === i ? '#03a' : '#ddd'
            }}
            onClick={changePage(i)}
          >
            {i}
          </a>
        )
      )}
      {pageItem<number>(stories[kind], page).map((id: number) => (
        <HnItems key={id} id={id} />
      ))}
    </div>
  )
}
