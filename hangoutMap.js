view HangoutMap {
  let sessionPings, activeUsers, user
  let xVal, yVal

  const moveSpeed = 15

  on.every(3000, () => {
    if (view.props.authUser) {
      let sessionsRef = ref.child('users').child(view.props.authUser.uid).child('sessionPings').child(authToken)
      sessionsRef.set(Firebase.ServerValue.TIMESTAMP)
    }
  })

  if (view.props.authUser) {
    const userXRef = ref.child('users').child(view.props.authUser.uid).child('xPos')
    const userYRef = ref.child('users').child(view.props.authUser.uid).child('yPos')

    userXRef.once("value", userXSnapshot => {
      xVal = userXSnapshot.val()
    })

    userYRef.once("value", userYSnapshot => {
      yVal = userYSnapshot.val()
    })

    const onArrowKeyDown = e => {
      if (e.keyCode == 39) {
        e.preventDefault()
        if (xVal < 1835) {
          xVal += moveSpeed
          userXRef.set(xVal)
        }
      }
      else if (e.keyCode == 37) {
        e.preventDefault()
        if (xVal > 65) {
          xVal -= moveSpeed
          userXRef.set(xVal)
        }
      }
      else if (e.keyCode == 38) {
        e.preventDefault()
        if (yVal > 23) {
          yVal -= moveSpeed
          userYRef.set(yVal)
        }
      }
      else if (e.keyCode == 40) {
        e.preventDefault()
        if (yVal < 800) {
          yVal += moveSpeed
          userYRef.set(yVal)
        }
      }
    }

    view.on.keydown(onArrowKeyDown)
  }


  on.frame(() => {
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
    <Avatar if={view.props.authUser}  repeat={activeUsers} user={_}></Avatar>
  </arenaActive>

  $arenaActive = {
    position: 'absolute',
    top: 50,
    height: 1000,
    width: 2000,
    opacity: '0.8',
    background: 'rgba(68, 139, 134, 0.29)',
   }

   $arenaEmpty = {
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
