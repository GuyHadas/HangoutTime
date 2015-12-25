view Avatar {
  let x, y, avatarPic
  let user, comment

  const avatarWidth = 75
  const avatarHeight = 75

  on.props(() => {
    x = view.props.user.xPos
    y = view.props.user.yPos
    avatarPic = view.props.user.photoUrl
    comment = view.props.user.comment
  })

  <avatarBuilder>
    <avatarPhoto-img src={avatarPic}/>
    <avatarChatBubble>{comment}</avatarChatBubble>
  </avatarBuilder>

  $avatarBuilder = {
    position: 'absolute',
    left: x,
    top: y,
    alignItems: 'center',
    flexDirection: 'column',
    width: 100,
  }

  $avatarPhoto = {
    width: avatarWidth,
    height: avatarHeight,
    borderRadius: 100,
    border: '1px solid black'
  }

  $avatarChatBubble = {
    border: '1px solid black',
    background: 'rgba(146, 227, 209, 1)',
    paddingLeft: 10,
    marginTop: 5,
    paddingRight: 10,
    borderRadius: 5,
    order: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'light',
    fontFamily: 'helvetica-neue',
    fontSize: 12,
    width: 200,
    cursor: 'default'
  }
}
