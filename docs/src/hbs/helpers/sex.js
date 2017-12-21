module.exports = (num) => {
  const sexMap = ['女', '男']

  return sexMap[num] || sexMap[0]
}
