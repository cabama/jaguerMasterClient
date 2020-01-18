import { Drawer } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import * as React from 'react'

interface IDrawerMenuResposiveProps {
  classes: any
  theme?: any
  visible: any
  close: any
  items: any
}

class DrawerMenuResposive extends React.Component<any, any> {

  constructor (props: IDrawerMenuResposiveProps, state: any) {
    super(props)
    this.state = { mobileOpen: true }
  }

  public render () {
    return (
      <Drawer
        variant="temporary"
        anchor={'left'}
        open={this.props.visible}
        onClose={this.props.close}
        ModalProps={{ keepMounted: true }}
      >
        {this.props.items}
        <Divider />
        <div style={{ position: 'absolute', bottom: '5px', left: '15px' }}>
          <a href="/indice">Indice</a>
        </div>
      </Drawer>
    )
  }

}

export const LeftMenuResposive = DrawerMenuResposive
