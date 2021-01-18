function createEmployeeRecord(array) {
    let empRecord = []
    return empRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord)
}

function createDateStamp(type, dateStamp) {
    return {
        type: type, 
        date: dateStamp.slice(0, 10), 
        hour: parseInt(dateStamp.slice(-4))
    }
}

function createTimeInEvent(employeeRecord, dateStamp) {
    employeeRecord.timeInEvents.push(createDateStamp("TimeIn", dateStamp))
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    employeeRecord.timeOutEvents.push(createDateStamp("TimeOut", dateStamp))
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find((e) => e.date === date).hour
    const timeOut = employeeRecord.timeOutEvents.find((e) => e.date === date).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employeeRecord, date) {
    const wage = employeeRecord.payPerHour
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    return wage * hoursWorked
}

function allWagesFor(employeeRecord) {
    const allWages = employeeRecord.timeInEvents.map((day) => {return wagesEarnedOnDate(employeeRecord, day.date)})
    return allWages.reduce((emp, dte) => emp + dte)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(emp) { return emp.firstName === firstName })
}

function calculatePayroll(array) {
    return array.reduce(function(notes, emp) { return notes + allWagesFor(emp)}, 0)
}

