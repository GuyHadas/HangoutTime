import React from 'react'
import Firebase from 'firebase'

import Avatar from './avatar'
import Welcome from './welcome'

const BACK_IMAGE_URLS = ['/static/images/autumnTrees.jpg',
  '/static/images/kohPhiPhi.jpg',
  // '/static/images/sapaMountains.jpg',
  '/static/images/blueHole.jpg',
  '/static/images/greatWallOfChina.jpg',
  '/static/images/halongBay.jpg',
  '/static/images/angkorWat.jpg',
  '/static/images/fullMoonParty.jpg',
  '/static/images/luangPrabang.jpg',
  '/static/images/deathValley.jpg',
  '/static/images/royceHall.jpg',
  '/static/images/niagaraFalls.jpg',
  // '/static/images/westernWall.jpg',
  '/static/images/eiffelTower.jpg',
  '/static/images/bigBen.jpg',
  // '/static/images/shanghai.jpg',
  '/static/images/burningManEmbrace.jpg',
  '/static/images/hongKong.jpg',
  '/static/images/patagoniaGlaciers.jpg',
  // '/static/images/torresDelPaine.jpg',
  '/static/images/goldenGateBridge.jpg',
  // '/static/images/telAviv.jpg',
  // '/static/images/sagradaFamilia.jpg',
  '/static/images/muiNeSandDunes.jpg',
  '/static/images/romeCollosseum.jpg',
  '/static/images/lakeTahoe.jpg',
  '/static/images/chiangMai.jpg',
]

export default class HangoutMap extends React.Component {
  _keyDownListener
  _imageIntervalId
  _pingIntervalId
  _usersRefHandler

  static defaultProps = {
    moveSpeed: 15
  }

  constructor(props) {
    super()

    this.state = {
      activeUsers: [],
      imageNum: 0,
      xVal: props.authUser && props.authUser.xPos,
      yVal: props.authUser && props.authUser.yPos
    }

    this._usersRefHandler = usersSnapshot => {
      const activeUsers = []
      usersSnapshot.forEach(userSnapshot => {
        const user = userSnapshot.val()
        user.id = userSnapshot.key()
        if (isInArena(user.sessionPings)) {
          activeUsers.push(user)
        }
      })
      this.setState({activeUsers})
    }
    ref.child('users').on('value', this._usersRefHandler)

    if (props.authUser) {
      this._pingIntervalId = setInterval(() => {
        this.ping()
      }, 3000)
    }

    if (props.authUser) {
      this._imageIntervalId = setInterval(() => {
        this.setState({
          imageNum: (this.state.imageNum + 1) % BACK_IMAGE_URLS.length
        })
      }, 30000)
    }
  }

  ping() {
    const sessionRef = (
      ref.child('users').child(this.props.authUser.uid).child('sessionPings')
      .child(authToken)
    )
    sessionRef.set(Firebase.ServerValue.TIMESTAMP)
  }

  setPosition(newX, newY) {
    this.setState({
      xVal: newX,
      yVal: newY
    })
    ref.child('users').child(this.props.authUser.uid).update({
      xPos: this.state.xVal,
      yPos: this.state.yVal
    })
  }

  componentDidMount() {
    if (this.props.authUser) {
      this._keyDownListener = e => {
        if (e.keyCode == 39) {
          e.preventDefault()
          if (this.state.xVal < 1835) {
            this.setPosition(this.state.xVal + this.props.moveSpeed, this.state.yVal)
          }
        } else if (e.keyCode == 37) {
          e.preventDefault()
          if (this.state.xVal > 65) {
            this.setPosition(this.state.xVal - this.props.moveSpeed, this.state.yVal)
          }
        } else if (e.keyCode == 38) {
          e.preventDefault()
          if (this.state.yVal > 23) {
            this.setPosition(this.state.xVal, this.state.yVal - this.props.moveSpeed)
          }
        } else if (e.keyCode == 40) {
          e.preventDefault()
          if (this.state.yVal < 800) {
            this.setPosition(this.state.xVal, this.state.yVal + this.props.moveSpeed)
          }
        }
      }
      window.addEventListener('keydown', this._keyDownListener)
    }
  }

  componentWillUnmount() {
    if (this._keyDownListener) {
      window.removeEventListener('keydown', this._keyDownListener)
    }
    if (this._imageIntervalId) {
      clearInterval(this._imageIntervalId)
    }
    if (this._pingIntervalId) {
      clearInterval(this._pingIntervalId)
    }
    ref.child('users').off('value', this._usersRefHandler)
  }

  render() {
    return (
      <hangoutMap
        style={{
          flexShrink: 0,
          top: 50,
          height: 1000,
          width: 2000,
          opacity: '0.85',
          backgroundImage: `url(${BACK_IMAGE_URLS[this.state.imageNum]})`,
          backgroundSize: '100% 100%',
          transition: 'background-image 5s',
        }}
      >
        {!this.state.activeUsers &&
          <arenaLoading
          />
        }
        {this.state.activeUsers && this.state.activeUsers.length == 0 &&
          <arenaEmpty
          />
        }
        {this.state.activeUsers && this.state.activeUsers.length > 0 &&
          <arenaActive
          >
            {this.props.authUser && this.state.activeUsers.map(u => (
              <Avatar key={u.id} user={u} />
            ))}
          </arenaActive>
        }
        {!this.props.authUser &&
          <welcomeSec
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Welcome
            />
          </welcomeSec>
        }
        <preFetchImages>
          {BACK_IMAGE_URLS.map(backImageUrl => (
            <img className="preFetchImage"
              key={backImageUrl}
              src={backImageUrl}
              style={{
                width: 1,
                height: 1,
                opacity: 0,
              }}
            />
          ))}
        </preFetchImages>
      </hangoutMap>
    )
  }
}
