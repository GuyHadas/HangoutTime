import React from 'react'

export default class Welcome extends React.Component {
  render() {
    return (
      <welcome
        style={{
          borderRadius: 20,
          padding: 20,
          backgroundColor: 'white'
        }}
      >
        <message
          style={{
            fontSize: 24,
            marginBottom: 8
          }}
        >
          Welcome to Hangout Time!
        </message>
        <iframe
          style={{
            width: 420,
            height: 315
          }}
          src="https://www.youtube.com/embed/g-zCt8DPs3E"
          frameborder="0"
          allowfullscreen
        />
      </welcome>
    )
  }
}
