const fs = require('fs')

const moduleMasses = []

const getFuelRequiredForMass = mass => {
  const fuel = Math.floor(mass / 3) - 2
  if (fuel <= 0) return 0

  return getFuelRequiredForMass(fuel) + fuel
}

const getTotalFuelRequired = array => {
  return array.reduce((acc, curr) => acc + getFuelRequiredForMass(curr), 0)
}

fs.readFile(__dirname + '/inputs', 'utf8', function(err, data) {
  if (err) throw err
  moduleMasses.push(...data.split('\n'))
  console.log(getTotalFuelRequired(moduleMasses))
})
