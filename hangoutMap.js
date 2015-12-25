view HangoutMap {
  let sessionPings
  let activeUsers
  let user
  //Checks to make sure that sessionPings exists, if it does it goes through all
  //of the keys of sessionPings and updates serverValue.TIMESTAMP every 3 seconds.
  on.every(3000, () => {
    if (view.props.authUser) {
      let sessionsRef = ref.child('users').child(view.props.authUser.uid).child('sessionPings').child(authToken)
      sessionsRef.set(Firebase.ServerValue.TIMESTAMP)
    }
  })


  on.props(() => {
    ref.child('users').once("value", usersSnapshot => {
      activeUsers = []
      usersSnapshot.forEach(userSnapshot => {
        user = userSnapshot.val()
        if(isInArena(user.sessionPings)) {
          activeUsers.push(user)
        }
      })
      if (activeUsers.length == 0) {
        activeUsers = null
      }
    })
  })



  <arenaLoading if={activeUsers === undefined}> Arena is currently Loading </arenaLoading>
  <arenaEmpty if={activeUsers === null}>Arena is Empty</arenaEmpty>
  <arenaActive if={activeUsers && activeUsers.length > 0}>
    <Avatar if={view.props.authUser} repeat={activeUsers} user={_}></Avatar>
  </arenaActive>

  $arenaActive = {
    position: 'absolute',
    top: 50,
    height: 1000,
    width: 2000,
    opacity: '0.8',
    background: 'rgba(68, 139, 134, 0.29)',
   }

   $arenaLoading = {
     position: 'absolute',
     top: 50,
     height: 1000,
     width: 2000,
     opacity: '0.8',
     background: 'rgba(68, 139, 134, 0.29)',
    }

}
