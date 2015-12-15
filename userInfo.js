view UserInfo {
  <notLoggedIn if={!view.props.authUser}>
    <loginButton-img src="/static/images/login.png" onClick={() => login()} />
  </notLoggedIn>
  <loggedIn if={view.props.authUser}>
    <name>{view.props.authUser.displayName}</name>
    <profPic-img src={view.props.authUser.photoUrl}></profPic-img>
    <logout-a ref="logout" href="#" onClick={logout}>
      log out
    </logout-a>
  </loggedIn>

  $loginButton = {
  cursor: 'pointer',
  maxHeight: 32
  }

  $profPic = {
    width: 100,
    height: 100,
    borderRadius: 50
  }


}
