import React, { FC, useEffect } from 'react'
import { connectStories } from '@/store/hn/stories'
import { StoryKind } from '@/models/hn'
import { HnItems } from '@/components/orgenisms/HnItems'

interface Props {
  kind: StoryKind
}
export const Page: FC<Props> = ({ kind }) => {
  const { stories, getStory } = connectStories()
  useEffect(() => {
    getStory(kind)
  }, [])
  if (!stories || !stories.hasOwnProperty(kind)) return <p>...loading</p>
  return (
    <div>
      {stories[kind].map((id: number) => (
        <HnItems id={id} />
      ))}
    </div>
  )
}
