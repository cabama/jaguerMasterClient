import * as React from 'react'
import { View } from 'Components/View/View'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { JagerFetch } from 'Services/FetchService'
import { jagerServiceBaseUrl } from '../../Enviroments'

export const IndexTeamPage = () => {
  const [teams, setTeams] = React.useState([])

  React.useEffect(() => {
    JagerFetch({ url: jagerServiceBaseUrl + '/api/sizemap/getAllTeamsURl' })
    .then(async (value) => {
      const teamsFetched = await value.json()
      setTeams(teamsFetched)
    })
  }, [])

  return <div>
    <View MenuBar={true} SideMenu={false}>
        <Card style={{ margin: '20px 0' }}>
        <CardHeader title="Indice de equipos"/>
        <CardContent>
            {teams.map((team: string) => (
              <a
                style={{ display: 'block' }}
                href={'team/' + team}>{
                  decodeURIComponent(team.split('::')[0])
                }
              </a>
            ))}
        </CardContent>
        </Card>
    </View>
  </div>
}
