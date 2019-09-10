import * as React from 'react'
import { View } from 'Components/View/View'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

export const MainPage = () => {
  return <div>
    <View MenuBar={true} SideMenu={true}>
        <Card style={{ margin: '20px 0' }}>
        <CardContent>
        <Typography variant="h6" component="h1" gutterBottom>
        Juegos Deportivos Municipales de Madrid
        </Typography>

          <p>Web no Oficial de los juegos deportivos de madrid.</p>
          <p>
          En esta pagina se mostraran las
          clasificaciones, resultados y próximos encuentros de los juegos deportivos municipales.
          </p>

          <p>
            Los Juegos Deportivos cumplen 40 ediciones con la misma filosofía con
            la que se crearon: la participación y la deportividad como los principales objetivos,
            por encima de los grandes resultados.
          </p>

          <p>Inscripciones del 18 de marzo al 10 de abril de 2020 para los deportes de equipo.</p>
        </CardContent>
        <CardActions style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Button variant="contained" size="medium" color="primary" href="/buscar">
          Busca tu equipo
        </Button>
        </CardActions>
        </Card>
    </View>
  </div>
}
