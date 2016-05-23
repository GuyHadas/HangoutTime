import React from 'react'

export default class Avatar extends React.Component {
  render() {
    return (
      <avatar
        style={{
          position: 'absolute',
          left: this.props.user.xPos,
          top: this.props.user.yPos,
          alignItems: 'center',
          flexDirection: 'column',
          width: 100,
        }}
      >
        <img className="avatarPhoto"
          src={this.props.user.photoUrl}
          style={{
            width: 75,
            height: 75,
            borderRadius: 100,
            border: '1px solid black'
          }}
        />
        <avatarChatBubble
          style={{
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
          }}
        >
          {this.props.user.comment}
        </avatarChatBubble>
      </avatar>
    )
  }
}
