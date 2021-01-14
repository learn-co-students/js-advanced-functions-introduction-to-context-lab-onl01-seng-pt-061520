// Your code here
function createEmployeeRecord(array) {
    const employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(array) {
    return array.map(arr => createEmployeeRecord(arr))
}

function createTimeInEvent(employee, timeIn) {
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timeIn.slice(11)),
        date: timeIn.slice(0, 10)
    })
    return employee
}

function createTimeOutEvent(employee, timeOut) {
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timeOut.slice(11)),
        date: timeOut.slice(0, 10)
    })
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const inHr = employee.timeInEvents.find(workIn => workIn.date === date).hour / 100
    const outHr = employee.timeOutEvents.find(workOut => workOut.date === date).hour / 100
    return outHr - inHr
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
    const allDates = employee.timeInEvents.map(inEvent => inEvent.date)
    const allWages = allDates.map(date => wagesEarnedOnDate(employee, date))
    const total = allWages.reduce((total, wage) => total + wage)
    return total
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employees) {
    const wageArr = employees.map(employee => allWagesFor(employee))
    return wageArr.reduce((total, wage) => total + wage)
}