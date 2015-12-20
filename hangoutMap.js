view HangoutMap {

  //Checks to make sure that sessionPings exists, if it does it goes through all
  //of the keys of sessionPings and updates serverValue.TIMESTAMP every 3 seconds.
  on.every(3000, () => {
    if (view.props.authUser) {
      sessionsRef = ref.child('users').child(view.props.authUser.uid).child('sessionPings').child(authToken)
      sessionsRef.set(Firebase.ServerValue.TIMESTAMP)

      isInArenaRef = ref.child('users').child(view.props.authUser.uid).child('isInArena')
      isInArenaRef.set(true)
    }
  })


  on.every(10000, () => {
    if (view.props.authUser) {
      sessionRef = ref.child('users').child(view.props.authUser.uid).child('sessionPings').child(authToken)
      sessionRef.once("value", sessionSnapshot => {
        lastPing = sessionSnapshot.val()
        if (Date.now() - lastPing > 10000) {
          ref.child('users').child(view.props.authUser.uid).child('isInArena').set("false")
        }
      })
    }
  })

  <arena>
    <Avatar if={view.props.authUser} user={view.props.authUser}/>
  </arena>

  $arena = {
    position: 'absolute',
    top: 50,
    height: 1000,
    width: 2000,
    opacity: '0.8',
    background: 'rgba(68, 139, 134, 0.29)',

   }

}


//-img src={"/static/images/waterfallMap.jpg"}
