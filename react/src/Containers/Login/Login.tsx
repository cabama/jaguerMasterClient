import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  withTheme,
  WithTheme
} from '@material-ui/core'
import * as React from 'react'
import { connect } from 'react-redux'
import * as yup from 'yup'
import { UserTypes } from '../../Redux/Actions/UserActions'
import { yupValidateForm } from '../../Services/YupHelper'
import { mcPrimary } from '../../shared/colors'
import View from '../View/View'
import { CardStyle, ContainerStyle } from './LoginStyle'

const formSchema: yup.ObjectSchema<any> = yup.object({
  email: yup.string().required('Email is Requerided').email('Is not email valid.'),
  password: yup.string().required(),
})

const blueDivStyle: React.CSSProperties = {
  backgroundColor: mcPrimary,
  height: '45%',
  width: '100%',
  position: 'absolute',
  zIndex: -1,
}

interface IProps extends IDispatchProps, IStateToProps, WithTheme {
  state: { user: any }
  dispatch: { loginWithEmail: (email: string, password: string) => void }
  history: { push: (url: string) => void },
}

interface IState {
  email: string
  password: string
}

export class LoginPage extends React.Component<IProps, IState> {
  public constructor(props: IProps, state: IState) {
    super(props, state)
    this.state = {
      email: '',
      password: '',
    }
  }

  public login = () => {
    this.props.dispatch.loginWithEmail(this.state.email, this.state.password)
  }

  public render() {
    const formValues = { email: this.state.email, password: this.state.password }
    const validationErrors = yupValidateForm(formSchema, formValues)
    const isValidForm = formSchema.isValidSync(formValues)


    if (this.props.state.user.singIn === true) this.props.history.push('/')
    return (

        <View className={ContainerStyle} MenuBar={false} SideMenu={false}>
          <Card className="Azuron" style={{...blueDivStyle, background: this.props.theme.palette.primary.dark }} />
          <Grid container={true} justify="center" alignItems="center">
            <Grid item={true} xs={11} xl={6}>
              <Card className={CardStyle}>
                <CardHeader title="LOGIN" />
                <CardContent>
                  <Grid
                    container={true}
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={24}
                  >
                    <Grid item={true} md={6} xs={12} style={{ width: '100%' }}>
                      <TextField
                        error={(this.state.email !== '' && validationErrors && !!validationErrors.email)}
                        label="Email"
                        value={this.state.email}
                        onChange={(event) => this.setState({ email: event.target.value })}
                        margin="normal"
                        style={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid item={true} md={6} xs={12} style={{ width: '100%' }}>
                      <TextField
                        label="Password"
                        type="password"
                        value={this.state.password}
                        onChange={(event) => this.setState({ password: event.target.value })}
                        margin="normal"
                        style={{ width: '100%' }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>

                <CardActions style={{ justifyContent: 'space-around' }}>
                  <Button color="primary" disabled={!isValidForm} onClick={() => this.login()}>Login</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </View>

    )
  }
}

interface IStateToProps {
  state: { user: any },
}

const mapStateToProps: (state: any) => IStateToProps = (state: any) => {
  return {
    state: {
      user: state.user,
    },
  }
}

interface IDispatchProps {
  dispatch: {
    loginWithEmail: ((email: string, password: string) => any),
  },
}

const mapDispatchToProps: (dispatch: any) => IDispatchProps = (dispatch: any) => {
  return {
    dispatch: {
      loginWithEmail: (email: string, password: string) =>
        dispatch({
          type: UserTypes.loginEmail,
          action: {
            email,
            password,
            dispatch,
          },
        }),
    },
  }
}


const LoginRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage)

export const Login = withTheme()(LoginRedux)