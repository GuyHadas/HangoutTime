view Navbar {
  <Comment if={view.props.authUser} authUser={view.props.authUser}/>
  <User authUser={view.props.authUser}/>

  $ = {
    backgroundColor: 'rgba(27, 218, 175, 0.19)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }

  $Comment = {
    width: '40%',
    flexGrow: 1,
  }

}
