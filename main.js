import Firebase from 'firebase'

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


window.logout = () => {
  let userRef = ref.child('users').child(authData.uid)
  let sessionRef = userRef.child('sessionPings').child(authToken)
  sessionRef.remove()

  userRef.child('sessionPings').once('value', sessionPingsSnapshot => {
    let sessionPings = sessionPingsSnapshot.val()
    if (!sessionPings) {
      userRef.child('isInArena').set(false)
    }
  })

  ref.unauth()
}

view Main {
  let authUser

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  ref.onAuth(authData => {
    if(authData) {
      window.authData = ref.getAuth()

      let userRef = ref.child('users').child(authData.uid)

      window.authToken = ((authData.token).replace(/[.#$/[]/g, "")).slice(-10, authData.token.length)

      const newUserFields = {
        email: authData.facebook.email || null,
        displayName: authData.facebook.displayName,
        photoUrl: authData.facebook.profileImageURL,
        facebookProfileUrl: authData.facebook.cachedUserProfile.link,
        xPos: getRandomInt(0, 2000),
        yPos: getRandomInt(50, 1000),
      }

      authUser = Object.assign({uid: authData.uid}, newUserFields)

      userRef.transaction(currentUserFields => {
        const userFields = Object.assign(currentUserFields || {}, newUserFields)
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
      userRef.on('value', data => {
        Object.assign(authUser, data.val())
      })
    } else {
      authUser = null
    }


  })



  <Navbar authUser={authUser}/>
  <HangoutMap authUser={authUser}/>


}
