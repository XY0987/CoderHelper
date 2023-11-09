import React, { Fragment } from 'react'
import { useRoutes } from 'react-router'
import routes from './router'

function App(): JSX.Element {
  const element = useRoutes(routes)
  return <Fragment>{element}</Fragment>
}

export default App
