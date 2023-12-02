import { Fragment } from 'react'
import { useRoutes } from 'react-router'
import routes from './router'
import { useUserInfoToLocalHook } from './hooks/userInfoLogin'
function App(): JSX.Element {
  const element = useRoutes(routes)
  const { userPersistence } = useUserInfoToLocalHook()
  userPersistence()
  return <Fragment>{element}</Fragment>
}

export default App
