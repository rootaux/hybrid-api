const User = require('../../models/users')
const bcrypt = require('bcrypt')
const saltRounds = 10

const saveUser = async ({ username, password, userType }) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const user = await new User({
    username,
    password: hashedPassword,
    userType
  }).save()
  return user
}

const getUser = async ({ username, password }) => {
  const user = await User.findOne({
    username
  })
  const res = await bcrypt.compare(password, user.password)
  if (res) {
    return user
  } else {
    throw new Error('Invalid password')
  }
}

module.exports.saveUser = saveUser
module.exports.getUser = getUser