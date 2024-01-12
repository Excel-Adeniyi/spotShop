const {v4: uuidv4} = require('uuid')

const UUID = () => {
    const uuid = uuidv4()
   return uuid
}

module.exports = UUID