// Your code here
function createEmployeeRecord(input) {
    const records = {}
  
    records.firstName = input[0]
    records.familyName = input[1]
    records.title = input[2]
    records.payPerHour = input[3]
    records.timeInEvents = []
    records.timeOutEvents = []
  
    return records
  }
  
  function createEmployeeRecords(rows) {
    return rows.map(createEmployeeRecord)
  }
  
  function createTimeInEvent(emp, eventTime) {
    return addTimeInOrOut(emp, eventTime, "TimeIn")
  }
  
  function createTimeOutEvent(emp, eventTime) {
    return addTimeInOrOut(emp, eventTime, "TimeOut")
  }
  
  function addTimeInOrOut(emp, eventTime, type) {
    const time = eventTime.split(" ")
    const event = {}
  
    event.type = type
    event.date = time[0]
    event.hour = parseInt(time[1], 10)
  
    type === "TimeIn" ? emp.timeInEvents.push(event) : emp.timeOutEvents.push(event)
  
    return emp
  }
  
  function hoursWorkedOnDate(emp, date) {
    const timeOutRecord = emp.timeOutEvents.find(record => record.date === date)
    const timeInRecord = emp.timeInEvents.find(record => record.date === date)
    const timeOut = timeOutRecord.hour
    const timeIn = timeInRecord.hour
  
    return (timeOut - timeIn) / 100
  }
  
  function wagesEarnedOnDate(emp, date) {
    return hoursWorkedOnDate(emp, date) * emp.payPerHour
  }
  
  function allWagesFor(emp) {
    const dates = emp.timeOutEvents.map(record => record.date)
    const dailyTotals = dates.map(date => wagesEarnedOnDate(emp, date))
    return dailyTotals.reduce(function(memo, total) { return memo + total } )
  }
  
  function calculatePayroll(emps) {
    return emps.map(allWagesFor).reduce(function(memo, total) { return memo + total })
  }
  
  function findEmployeeByFirstName(emps, target) {
    const lostEmp = emps.find(emp => emp.firstName === target)
    return lostEmp
  }