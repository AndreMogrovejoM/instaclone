import * as React from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'

const moreStyle = {
  color: '#aaa',
}

const MenuPopupState = (props) => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
  return (
    <div>
      { <MoreHorizIcon style={moreStyle} variant="contained" {...bindTrigger(popupState)}  aria-controls="fade-menu" aria-haspopup="true" /> }
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>
          <span onClick={props.functiontopass.bind(this, props.datatopass)}>{props.labeltopass}</span>
        </MenuItem>
        {
          props.topmenu && (
            (props.topmenu && props.user) ? (
              <MenuItem onClick={popupState.close}>
                <span onClick={props.signout}>{props.signoutlabel}</span>
              </MenuItem>
            ) : (
              <div>
                <MenuItem onClick={popupState.close}>
                  <span onClick={props.signin}>{props.signinlabel}</span>
                </MenuItem>
                <MenuItem onClick={popupState.close}>
                  <span onClick={props.signup}>{props.signuplabel}</span>
                </MenuItem>
              </div>
            )
          )
        }
        <MenuItem onClick={popupState.close}>
          <span><strong>{props.lang ? "ANNULER":"CANCEL"}</strong></span>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default MenuPopupState