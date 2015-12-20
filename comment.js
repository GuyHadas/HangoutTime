view Comment {
  let displayFirstName = view.props.authUser.displayName.split(" ")[0]
  let comment = ""


  let submit = comment => {
    if (comment && view.props.authUser) {
      let userRef = ref.child('users').child(view.props.authUser.uid)
      userRef.update({comment: comment})
    }
    view.refs.commentBox.focus()
  }

  on.mount(() => {
    view.refs.commentBox.focus()
  })


  <wrapper>
    <commentBox-input
    ref="commentBox"
    type="text"
    maxLength="140"
    placeholder={`What\'s on your mind ${displayFirstName}?`}
    sync={comment}
    onEnter={submit} />
    <submit-button onClick={() => submit(comment)} >Submit</submit-button>
  </wrapper>
  $wrapper = {
    marginLeft: 10,
    marginRight: 10,
    flexDirection:'row',
    justifyContent: 'center',
  }

  $commentBox = {
    width: '60%',
    borderRadius: 8,
    paddingLeft: 5,
    height: 30,
    border: '1px solid rgba(68, 139, 134, 0.29)',
    overflow: 'scroll'
  }

  $submit = {
    alignSelf: 'center',
    marginLeft: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(125, 177, 82, 0.01)',
    borderRadius: 10,
    border: '3px solid rgba(68, 139, 134, 0.29)',
    cursor: 'pointer',
    hover:{backgroundColor: 'rgba(68, 139, 134, 0.29)'}

  }

}
