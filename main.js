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
    remember: "sessionOnly",
    scope: "public_profile, email, user_friends"
  })
}

window.logout = () => {
  ref.unauth()
}

view Main {
  let authUser

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }


  ref.onAuth(authData => {
    if(authData) {
      let userRef = ref.child('users').child(authData.uid)

      const newUserFields = {
        email: authData.facebook.email || null,
        displayName: authData.facebook.displayName,
        photoUrl: authData.facebook.profileImageURL,
        facebookProfileUrl: authData.facebook.cachedUserProfile.link,
        xPos: getRandomInt(0, 2000),
        yPos: getRandomInt(50, 1000)
      }

      authUser = Object.assign({uid: authData.uid}, newUserFields)

      userRef.transaction(currentUserFields => {
        const userFields = Object.assign(currentUserFields || {}, newUserFields)
        if (!userFields.createdTimestamp) {
          // New user
          userFields.createdTimestamp = Firebase.ServerValue.TIMESTAMP
        }
        userFields.seenTimestamp = Firebase.ServerValue.TIMESTAMP
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
