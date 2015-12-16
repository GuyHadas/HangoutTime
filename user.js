view User {
  <wrapper>
    <notLoggedIn if={!view.props.authUser}>
      <loginButton-img src="/static/images/login.png" onClick={() => login()} />
    </notLoggedIn>
    <loggedIn if={view.props.authUser}>
      <profPic-img src={view.props.authUser.photoUrl}></profPic-img>
      <name>{view.props.authUser.displayName}</name>
      <logout-a ref="logout" href="#" onClick={logout}>
        Log Out
      </logout-a>
    </loggedIn>
  </wrapper>



  $wrapper = {
    margin: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }

  $loginButton = {
  cursor: 'pointer',
  maxHeight: 32
  }

  $notLoggedIn = {
    margin:10,
  }

  $loggedIn = {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }

  $profPic = {
    width: 25,
    height: 25,
    borderRadius: 50,
  }

  $name = {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '$666'
  }

  $logout = {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#666',
  textDecoration: 'none',
  hover:{textDecoration: 'underline'}
  }


}
