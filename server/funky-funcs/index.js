const intersection = (...args) => {
  return args.reduce(function(total,current){
    let ans = []
    for (let i = 0; i < total.length; i++) {
      if (current.includes(total[i])) {
        ans.push(total[i])
      }
    }
    return ans
  },args[0])
}

const flattenDeep = (arr) => {
  let ans = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      let temp = flattenDeep(arr[i])
      ans = ans.concat(temp)
    } else {
      ans.push(arr[i])
    }
  }
  return ans
}

const flipArguments = (func) => {
  return function(...args) {
    let newArgs = []
    for (let i = args.length - 1; i >= 0; i--) {
      newArgs.push(args[i])
    }
    return func(...newArgs)
  }
}

const invert = (obj) => {
  let newObj = {}
  for (let key in obj) {
    newObj[obj[key]] = key
  }
  return newObj
}

const camelCase = (str) => {
 // turn into an array, based on what it has
  let arr
  if (str.includes(" ") === true) {
  arr = str.split(" ")
 } else if (str.includes("_") === true) {
  arr = str.split("_")
 }
 // remove any spaces or underscores in the array
 let trimmed = []
 arr.map(function(element) {
  if (element !== " " && element !== "_" && element) {
    trimmed.push(element)
  }
 })
// turn it into camelCase and then return after Joining
 let ans = []
 for (let i = 0; i < trimmed.length; i++) {
  if (i === 0) {
    trimmed[i] = trimmed[i].charAt(0).toLowerCase() + trimmed[i].slice(1)
    ans.push(trimmed[i])
  } else {
    trimmed[i] = trimmed[i].charAt(0).toUpperCase() + trimmed[i].slice(1)
    ans.push(trimmed[i])
  }
 }
 return ans.join("")
}

module.exports = {
  intersection,
  flattenDeep,
  flipArguments,
  invert,
  camelCase
}
