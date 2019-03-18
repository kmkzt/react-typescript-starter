import React, { FC, useEffect } from 'react'
import { connectStories } from '@/store/hn/stories'
import { StoryKind } from '@/models/hn'
import { HnStory } from '@/components/orgenisms/HnStory'
import { withRouter, Switch, Route, Link } from 'react-router-dom'

export default withRouter(({}) => (
  <>
    <header>
      <nav>
        {['top', 'new', 'best', 'ask', 'show', 'job'].map((ki: string) => (
          <Link
            style={{
              display: 'inline-block',
              background: '#eee',
              marginRight: '.5rem',
              padding: '.3rem'
            }}
            to={`/${ki}`}
          >
            {ki}
          </Link>
        ))}
      </nav>
    </header>
    <main>
      <Switch>
        <Route
          exact
          path={'/:kind'}
          render={({
            match: {
              params: { kind }
            }
          }) => <HnStory kind={kind} />}
        />
      </Switch>
    </main>
  </>
))
