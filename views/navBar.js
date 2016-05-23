import React from 'react'

import Comment from './comment'
import User from './user'

export default class NavBar extends React.Component {
  render() {
    return (
      <navBar
        style={{
          background: 'rgba(146, 227, 209, 1)',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: 50,
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          borderBottom: '1px solid black'
        }}
      >
        {this.props.authUser &&
          <Comment authUser={this.props.authUser} />
        }
        <User authUser={this.props.authUser}/>
      </navBar>
    )
  }
}
