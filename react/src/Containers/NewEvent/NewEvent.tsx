import { Grid, TextField, Button } from '@material-ui/core'
import {DateFormatInput, TimeFormatInput} from 'material-ui-next-pickers'

import * as React from 'react'
// import * as yup from 'yup'
// import { yupValidateForm } from '../../Services/YupHelper'
import View from '../View/View'
import {style} from 'typestyle' 

// const formSchema: yup.ObjectSchema<any> = yup.object({
//   email: yup.string().required('Email is Requerided').email('Is not email valid.'),
//   password: yup.string().required(),
// })

const inputStyles = style({
  '$nest': {
    '& > *': {
      width: '100%',
      height: '50px',
      marginTop: '16px',
      marginBottom: '8px'
    }
  }
})

interface IState {
  eventName: string
  ubicacion: string
  time: Date
  date: Date
}

export class NewEventPage extends React.Component<any, IState> {
  public constructor(props: any, state: IState) {
    super(props, state)
    this.state = {
      eventName: '',
      ubicacion: '',
      time: new Date(),
      date: new Date()
    }
  }



  public render() {
    // const formValues = { email: this.state.email, password: this.state.password }
    // const validationErrors = yupValidateForm(formSchema, formValues)
    // const isValidForm = formSchema.isValidSync(formValues)

    return (
        <View MenuBar={true} SideMenu={true}>
          <Grid container={true} justify="center" alignItems="center">
            <Grid item={true} xs={11} xl={6} className={inputStyles}>
              <TextField
                id="standard-name"
                label="Nombre del evento"
                value={this.state.eventName}
                onChange={e => this.setState({eventName: e.target.value})}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="URl de la Ubicacion"
                value={this.state.ubicacion}
                onChange={e => this.setState({ubicacion: e.target.value})}
                margin="normal"
              />
              <DateFormatInput 
                name='date-input'
                value={this.state.date}
                onChange={date => this.setState({date})}
                fullWidth
              />
              <TimeFormatInput
                name='time-input'
                value={this.state.time}
                onChange={time => this.setState({time})}
                fullWidth
              />
              <Button color="primary">Create Event</Button>
            </Grid>
            
          </Grid>
        </View>

    )
  }
}

// export const NewEvent = withTheme()(NewEventPage)