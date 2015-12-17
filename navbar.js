view Navbar {
  <Comment if={view.props.authUser} authUser={view.props.authUser}/>
  <User authUser={view.props.authUser}/>

  $ = {
    background: 'rgba(146, 227, 209, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 50,
    position: 'fixed',
    zIndex: 1,
    width: '100%'
  }

  $Comment = {
    width: '40%',
    flexGrow: 1,
  }

}
