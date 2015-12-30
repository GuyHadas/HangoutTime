view HangoutMap {
  let sessionPings, activeUsers, user
  let xVal, yVal
  let userRef


  const moveSpeed = 15

  on.every(3000, () => {
    if (view.props.authUser) {
      let sessionsRef = ref.child('users').child(view.props.authUser.uid).child('sessionPings').child(authToken)
      sessionsRef.set(Firebase.ServerValue.TIMESTAMP)
    }
  })

  if (view.props.authUser) {
    userRef = ref.child('users').child(view.props.authUser.uid)
    xVal = view.props.authUser.xPos
    yVal = view.props.authUser.yPos

    const onArrowKeyDown = e => {
      if (e.keyCode == 39) {
        e.preventDefault()
        if (xVal < 1835) {
          setPosition(xVal + moveSpeed, yVal)
        }
      }
      else if (e.keyCode == 37) {
        e.preventDefault()
        if (xVal > 65) {
          setPosition(xVal - moveSpeed, yVal)
        }
      }
      else if (e.keyCode == 38) {
        e.preventDefault()
        if (yVal > 23) {
          setPosition(xVal, yVal - moveSpeed)
        }
      }
      else if (e.keyCode == 40) {
        e.preventDefault()
        if (yVal < 800) {
          setPosition(xVal, yVal + moveSpeed)
        }
      }
    }

    view.on.keydown(onArrowKeyDown)
  }

  const setPosition = (newX, newY) => {
      xVal = newX
      yVal = newY
      userRef.update({xPos: xVal, yPos: yVal})
  }

  ref.child('users').on("value", usersSnapshot => {
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


  const backImages = [`url(/static/images/autumnTrees.jpg)`,
    `url(/static/images/kohPhiPhi.jpg)`,
    // `url(/static/images/sapaMountains.jpg)`,
    `url(/static/images/blueHole.jpg)`,
    `url(/static/images/greatWallOfChina.jpg)`,
    `url(/static/images/halongBay.jpg)`,
    `url(/static/images/angkorWat.jpg)`,
    `url(/static/images/fullMoonParty.jpg)`,
    `url(/static/images/luangPrabang.jpg)`,
    `url(/static/images/deathValley.jpg)`,
    `url(/static/images/royceHall.jpg)`,
    `url(/static/images/niagaraFalls.jpg)`,
    // `url(/static/images/westernWall.jpg)`,
    `url(/static/images/eiffelTower.jpg)`,
    `url(/static/images/bigBen.jpg)`,
    // `url(/static/images/shanghai.jpg)`,
    `url(/static/images/burningManEmbrace.jpg)`,
    `url(/static/images/hongKong.jpg)`,
    `url(/static/images/patagoniaGlaciers.jpg)`,
    // `url(/static/images/torresDelPaine.jpg)`,
    `url(/static/images/goldenGateBridge.jpg)`,
    // `url(/static/images/telAviv.jpg)`,
    // `url(/static/images/sagradaFamilia.jpg)`,
    `url(/static/images/muiNeSandDunes.jpg)`,
    `url(/static/images/romeCollosseum.jpg)`,
    `url(/static/images/lakeTahoe.jpg)`,
    `url(/static/images/chiangMai.jpg)`,
  ]

  let imageNum = 0
  let backImage = backImages[imageNum]

  on.every(30000, () => {
    if (imageNum < backImages.length - 1) {
      imageNum += 1
    } else {
      imageNum = 0
    }
    backImage = backImages[imageNum]
  })

  <arenaLoading if={activeUsers === undefined}></arenaLoading>
  <arenaEmpty if={activeUsers === null}></arenaEmpty>
  <arenaActive if={activeUsers && activeUsers.length > 0}>
    <Avatar if={view.props.authUser}  repeat={activeUsers} user={_}></Avatar>
  </arenaActive>
  <preFetchImages>
    <img class="preFetchImage" repeat={backImages} src={_}/>
  </preFetchImages>

 $ = {
   position: 'absolute',
   top: 50,
   height: 1000,
   width: 2000,
   opacity: '0.85',
   backgroundImage: backImage,
   backgroundSize: '100% 100%',
   transition: 'background-image 5s',
  }

  $preFetchImage = {
    width: 1,
    height: 1,
    opacity: 0,
  }


}
