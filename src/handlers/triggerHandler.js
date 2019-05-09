export default ({ bolt }) => {
  const { trigger } = bolt
  try {
    if (typeof trigger !== 'array') {
      throw new Exception('Bolt Trigger actions should return an object')
    }
    trigger.map()
  } catch (e) {
    console.error(e)
  }
}
