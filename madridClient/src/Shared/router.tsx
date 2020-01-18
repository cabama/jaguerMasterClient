import { Context, useContext } from 'react'
import { __RouterContext, RouteComponentProps } from 'react-router-dom'

declare module 'react-router-dom' {
  // tslint:disable-next-line: variable-name
  export const __RouterContext: Context<RouteComponentProps<{}>>
}

export const routerContext = __RouterContext

export const useRouter = () => {
  return useContext(routerContext)
}

export function useQuery() {
  const router = useRouter()
  return new URLSearchParams(router.location.search)
}