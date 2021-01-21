// Your code here
function createEmployeeRecord(array) {
  let employeeObj = {
  firstName: array[0],
  familyName: array[1],
  title: array[2],
  payPerHour: array[3],
  timeInEvents: [],
  timeOutEvents: []
  }
  return employeeObj
}

function createEmployeeRecords(arrayOfArrays) {
  let employeesArray = arrayOfArrays.map( employee => {
    // console.log("employeeRecord= " + employee)
    return createEmployeeRecord(employee)
  })
  //console.log("employeesArray= "+ employeesArray);
  return  employeesArray
}

function createTimeInEvent(employeeObj, dateStamp) {
  let dateStampArray = dateStamp.split(' ')
  //console.log('dateStampArray[1]= ' + dateStampArray[1]);
  employeeObj.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(dateStampArray[1]),
      date: dateStampArray[0]
    }
  )
  //console.log(employeeObj.timeInEvents)
  return employeeObj
}

function createTimeOutEvent(employeeObj, dateStamp) {
  let dateStampArray = dateStamp.split(' ')
  employeeObj.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(dateStampArray[1]),
    date: dateStampArray[0]
  })
  return employeeObj
}

function logTime(timeEvent, date, hour=0) {
  timeEvent.forEach( element => {
    if (element.date === date) {
      console.log("Hey I was called " + element.hour);
      element.hour = hour
      return hour
    }
  })
}

function hoursWorkedOnDate(employeeObj, date) {
  let timeIn = 0
  let timeOut = 0
  employeeObj.timeInEvents.forEach( element => {
    if (element.date === date) {
      //console.log(element.hour + "= element.hour");
      timeIn = element.hour
    }
  })

  employeeObj.timeOutEvents.forEach( element => {
    if (element.date === date) {
      timeOut = element.hour
    }
  })

  return (timeOut - timeIn) * 0.01
}

function wagesEarnedOnDate(employeeObj, date) {
  let hoursWorked = hoursWorkedOnDate(employeeObj, date)
  return hoursWorked * employeeObj.payPerHour
}

function allWagesFor(employeeObj) {

  const total = (runningTotal, currentValue) => runningTotal + currentValue

  let pay = employeeObj.timeInEvents.map( element => {
    let amount = wagesEarnedOnDate(employeeObj, element.date)
    console.log("amount= " + amount);
  })
  console.log("pay= " + pay);
//  return payOwedForAllDates
}
