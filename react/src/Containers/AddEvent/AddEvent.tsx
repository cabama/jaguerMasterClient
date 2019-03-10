import {
  Paper,
  TextField,
  WithTheme,
  withTheme,
  Button
} from '@material-ui/core'
import View from '../View/View'
import { PaperStyle } from './AddEventStyle'
import { DateFormatInput, TimeFormatInput } from 'material-ui-next-pickers'
import * as React from 'react'
import MediaQuery from 'react-responsive';

interface IProps extends WithTheme {
  history: { push: (url: string) => void }
}

interface IState {
  name: string,
  description: string,
  date: Date,
  time: Date
}

export class AddEventView extends React.Component<IProps, IState> {

  public constructor(props: IProps, state: IState) {
    super(props, state)
    this.state = {
      name: '',
      description: '',
      date: new Date(),
      time: new Date(),
    }
  }

  public updateValue = (name: keyof IState, value: any) => {
    this.setState({
      name: value
    })
  }

  public sendEvent = () => {

  }

  public render() {
    return (
      <View MenuBar={true} SideMenu={true}>
        <MediaQuery maxDeviceWidth={1224} >
          {(matches) => <Paper className={PaperStyle(matches)}>
            <TextField
              label="Nombre del Evento"
              fullWidth={true}
            />
            <TextField
              label="Descripcion del Evento"
              fullWidth={true}
            />
            <div className='horizontal'>
              <DateFormatInput
                name='date-input'
                value={this.state.date}
                onChange={() => null}
                fullWidth={true}
              />
              <TimeFormatInput
                name='time-input'
                value={this.state.time}
                onChange={() => null}
                fullWidth={true}
              />
            </div>
            <div className='buttonForm'>
              <Button color="primary" onClick={this.sendEvent}>
                Crear
              </Button>
            </div>
          </Paper>
          }
        </MediaQuery >
      </View>
    )
  }
}

export const AddEvent = withTheme()(AddEventView as any)