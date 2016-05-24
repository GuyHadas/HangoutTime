import React from 'react'
import ReactPlayer from 'react-player'

export default class Welcome extends React.Component {
  render() {
    return (
      <welcome
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          padding: 20,
          backgroundColor: 'rgba(146, 227, 209, .9)',
          boxShadow: '0px 6px 20px 0px rgba(0,0,0,0.75)',
        }}
      >
        <header
          style={{
            fontSize: 24,
            fontFamily: 'Helvetica-Neue',
            marginBottom: 15,
            color: "black"
          }}
        >
        Watch below to see HangoutTime in action!
        </header>


        <ReactPlayer
          url='https://player.vimeo.com/video/167927767'
        />
      </welcome>
    )
  }
}
