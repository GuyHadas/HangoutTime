import React from 'react'

export default class User extends React.Component {
  render() {
    return (
      <user
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        {!this.props.authUser &&
          <notLoggedIn
            style={{
              margin: 10
            }}
          >
            <img className="loginButton"
              src="/static/images/login.png"
              onClick={() => login()}
              style={{
                cursor: 'pointer',
                maxHeight: 32
              }}
            />
          </notLoggedIn>
        }
        {this.props.authUser &&
          <loggedIn
            style={{
              margin: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <img className="profPic"
              src={this.props.authUser.photoUrl}
              style={{
                width: 25,
                height: 25,
                borderRadius: 50,
              }}
            />
            <name
              style={{
                marginLeft: 5,
                marginRight: 20,
                fontSize: 14,
                fontWeight: 'bold',
                color: '$666',
                cursor: 'default'
              }}
            >
              {this.props.authUser.displayName}
            </name>
            <a ref="logout" className="logout"
              href="#"
              onClick={logout}
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#666',
                textDecoration: 'none'
              }}
            >
              Log Out
            </a>
          </loggedIn>
        }
      </user>
    )
  }
}
