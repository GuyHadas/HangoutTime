import React from 'react'

export default class Comment extends React.Component {
  constructor(props) {
    super()

    this.state = {
      displayFirstName: props.authUser.displayName.split(' ')[0],
      comment: ''
    }
  }

  submit() {
    if (this.state.comment && this.props.authUser) {
      const userRef = ref.child('users').child(this.props.authUser.uid)
      userRef.update({comment: this.state.comment})
    }
    this.refs.commentBox.focus()
    this.refs.commentBox.value = ''
    this.setState({comment: ''})
  }

  componentDidMount() {
    this.refs.commentBox.focus()
  }

  render() {
    return (
      <comment
        style={{
          width: '40%',
          flexGrow: 1,
          marginLeft: 10,
          marginRight: 10,
          flexDirection:'row',
          justifyContent: 'center',
        }}
      >
        <input className="commentBox"
          ref="commentBox"
          type="text"
          maxLength="140"
          placeholder={`What's on your mind ${this.state.displayFirstName}?`}
          value={this.state.comment}
          onChange={e => this.setState({comment: e.target.value})}
          onKeyDown={e => {
            if (e.key == 'Enter') this.submit()
          }}
          style={{
            width: '60%',
            borderRadius: 8,
            paddingLeft: 5,
            height: 30,
            border: '1px solid rgba(68, 139, 134, 0.29)',
            overflow: 'scroll'
          }}
        />
        <button className="submit"
          onClick={e => this.submit()}
          style={{
            alignSelf: 'center',
            marginLeft: 10,
            fontWeight: 'bold',
            backgroundColor: 'rgba(125, 177, 82, 0.01)',
            borderRadius: 10,
            border: '3px solid rgba(68, 139, 134, 0.29)',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </comment>
    )
  }
}
