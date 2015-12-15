view HangoutMap {

  const randInt = () => {
    return Math.floor(Math.random() * (100 - 1) + 1)
  }

  const addRandomData = () => {

    let usersRef = ref.child('users')
    usersRef.update({
      GuyHadas: {
        x: randInt(),
        y: randInt(),
        message: "Hey I'm a meeces look at me",
        picUrl: "empty for now",
        updateTimestamp: new Date().getTime(),
        createTimestamp: new Date().getTime()

      },
      LironShapira: {
        x: randInt(),
        y: randInt(),
        message: "BLAH",
        picUrl: "Mine's empty too",
        updateTimestamp: new Date().getTime(),
        createTimestamp: new Date().getTime()
      }
    })
  }

  <arena>
    <dataButton-button onClick={addRandomData}>Change Your Data</dataButton-button>
  </arena>

  $arena = {
    width: 1600,
    height: 800,
    background: '#ccc',
    border: 'solid 1px black'
  }

  $button = {
    width: 100,
    height: 35,
    borderRadius: 10,
    background: 'yellow'
  }
}
