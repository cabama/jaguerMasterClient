import * as React from 'react'
import { View } from 'Components/View/View'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { useRouter } from 'Shared/router'

export const MainPage = () => {
  const router = useRouter()
  return <div>
    <View MenuBar={true} SideMenu={false}>
        <Card style={{ margin: '20px 0' }}>
          <CardHeader title="Juegos Deportivos Municipales"/>
        <CardContent>
          <p>Web no Oficial de los juegos deportivos de madrid. <br></br>
          <a href="https://www-2.munimadrid.es/ResultadosCompeticionesDeportivas/competicion.form">
            Enlace a la página oficial
          </a>
          </p>
          <p>
          En esta pagina se mostraran las
          clasifiaciones, resultados y próximos encuentros de los juegos deportivos municipales.
          </p>
        </CardContent>
        <CardActions style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button size="medium" color="primary" onClick={() => router.history.push('/buscar')}>
          Busca tu equipo
        </Button>
        </CardActions>
        </Card>
    </View>
  </div>
}
