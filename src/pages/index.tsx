import React, { FC, useEffect } from 'react'
import { HnStory } from '@/components/orgenisms/HnStory'
import { withRouter, Switch, Route, Link } from 'react-router-dom'
import { Reset } from '@/components/utils/Reset'

const NavStyle = {
  display: 'inline-block',
  background: '#eee',
  marginRight: '.5rem',
  padding: '.3rem'
}
export default withRouter(({}) => (
  <>
    <Reset />
    <header>
      <nav>
        <Link to="/" style={NavStyle}>
          Top
        </Link>
        {['new', 'best', 'ask', 'show', 'job'].map((ki: string) => (
          <Link key={ki} style={NavStyle} to={ki}>
            {ki}
          </Link>
        ))}
      </nav>
    </header>
    <main>
      <Switch>
        <Route exact path="/" render={() => <HnStory kind="top" />} />
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
