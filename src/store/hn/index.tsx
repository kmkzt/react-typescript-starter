import React, { FC } from 'react'
import * as Item from './item'
import * as User from './user'
import * as Updates from './updates'
import * as Stories from './stories'

export const HNProvider: FC<{}> = ({ children }) => (
  <Item.Provider>
    <User.Provider>
      <Updates.Provider>
        <Stories.Provider>{children}</Stories.Provider>
      </Updates.Provider>
    </User.Provider>
  </Item.Provider>
)
