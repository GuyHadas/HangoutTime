import React from 'react'
import Firebase from 'firebase'

import NavBar from './navBar'
import HangoutMap from './hangoutMap'

const firebaseName = 'hangouttime'
window.ref = new Firebase(`https://${firebaseName}.firebaseio.com/`)

window.login = (callback) => {
  ref.authWithOAuthPopup("facebook", (error, authData) => {
    if (error) {
      console.log("Login Failed!", error)
    } else {
      console.log("Authenticated successfully with payload:", authData)
    }
  }, {
    scope: "public_profile, email, user_friends"
  })
}

window.isInArena = sessionPings => {
  // loop through the sessions and if at least one of the sessions has a
  // lastPing that was at most 10000 ms ago then return true, else return false
  for (let sessionId in sessionPings) {
    if (Date.now() - sessionPings[sessionId] < 10000) {
      return true
    }
  }
  return false
}

window.logout = () => {
  let userRef = ref.child('users').child(authData.uid)
  let sessionRef = userRef.child('sessionPings').child(authToken)
  sessionRef.remove()

  userRef.child('sessionPings').once('value', sessionPingsSnapshot => {
    let sessionPings = sessionPingsSnapshot.val()
  })

  ref.unauth()
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export default class Main extends React.Component {
  userRef

  userHandler = (userSnapshot) => {
    this.setState({
      authUser: Object.assign({uid: userSnapshot.key()}, userSnapshot.val())
    })
  }

  componentWillMount() {
    ref.onAuth(authData => {
      if (authData) {
        window.authData = ref.getAuth()

        this.userRef = ref.child('users').child(authData.uid)

        window.authToken = (
          authData.token.replace(/[.#$/[]/g, "")
        ).slice(-10, authData.token.length)

        const newUserFields = {
          email: authData.facebook.email || null,
          displayName: authData.facebook.displayName,
          photoUrl: authData.facebook.profileImageURL,
          facebookProfileUrl: authData.facebook.cachedUserProfile.link,
          xPos: getRandomInt(50, 1848),
          yPos: getRandomInt(50, 810),
        }

        this.setState({
          authUser: Object.assign({uid: authData.uid}, newUserFields)
        })

        this.userRef.transaction(currentUserFields => {
          const userFields = Object.assign(
            currentUserFields || {},
            newUserFields
          )
          if (!userFields.createdTimestamp) {
            // New user
            userFields.createdTimestamp = Firebase.ServerValue.TIMESTAMP
          }
          if (!userFields.sessionPings) {
            // First session
            userFields['sessionPings'] = {}
          }
          userFields.seenTimestamp = Firebase.ServerValue.TIMESTAMP
          userFields.sessionPings[authToken] = Firebase.ServerValue.TIMESTAMP

          return userFields
        })
        this.userRef.on('value', this.userHandler)

      } else {
        this.setState({authUser: null})
        if (this.userRef) {
          this.userRef.off('value', this.userHandler)
          delete this.userRef
        }
      }
    })
  }

  render() {
    return (
      <main>
        <NavBar authUser={this.state.authUser} />
        <HangoutMap
          key={(this.state.authUser || {}).uid || ''}
          authUser={this.state.authUser}
        />
      </main>
    )
  }
}
