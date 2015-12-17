view Avatar {
  let x, y

  let uid = view.props.authUser.uid

  let userRef = ref.child('users').child(uid)

  userRef.on("value", (userSnapshot) => {
    user = userSnapshot.val()
    x = user.xPos
    y = user.yPos
  })


  <avatarPic-img src={view.props.authUser.photoUrl}></avatarPic-img>

  $avatarPic = {
    width: 50,
    height: 50,
    borderRadius: 15,
    position: 'absolute',
    left: x,
    top: y,
  }
}
