import React, { FC, useEffect } from 'react'
import { connectStories } from '@/store/hn/stories'

export const Page: FC<{}> = () => {
  const { stories, getStory } = connectStories()
  useEffect(() => {
    getStory('top')
  }, [])

  return <>{JSON.stringify(stories)}</>
}
