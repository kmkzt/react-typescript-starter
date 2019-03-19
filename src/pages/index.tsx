import React, { FC, useEffect } from 'react'
import { HnStory } from '@/components/orgenisms/HnStory'
import { withRouter, Switch, Route, Link } from 'react-router-dom'
import { Reset } from '@/components/utils/reset'

export default withRouter(({}) => (
  <>
    <Reset />
    <header>
      <nav>
        {['top', 'new', 'best', 'ask', 'show', 'job'].map((ki: string) => (
          <Link
            key={ki}
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
