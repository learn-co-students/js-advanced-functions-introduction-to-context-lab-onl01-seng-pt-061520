// Your code here
function createEmployeeRecord(record){
    const records = {}

        records.firstName = record[0]
        records.familyName = record[1]
        records.title = record[2]
        records.payPerHour = record[3]
        records.timeInEvents = []
        records.timeOutEvents = []

        return records
}

function createEmployeeRecords(arrays){
    return arrays.map(createEmployeeRecord)
}

function createTimeInEvent(employee, eventTime){
    return addTimeInOrOut(employee, eventTime, "TimeIn")
}

function createTimeOutEvent(employee, eventTime){
    return addTimeInOrOut(employee, eventTime, "TimeOut")
}

function addTimeInOrOut(employee, eventTime, type){
    const time = eventTime.split(" ")
    const event = {}

    event.type = type
    event.date = time[0]
    event.hour = parseInt(time[1], 10)
    
    type === "TimeIn" ? employee.timeInEvents.push(event) : employee.timeOutEvents.push(event)

    return employee
}

function hoursWorkedOnDate(employee, date){
    const timeOutRecord = employee.timeOutEvents.find(record => record.date === date)
    const timeInRecord = employee.timeInEvents.find(record => record.date === date)
    const timeOut = timeOutRecord.hour
    const timeIn = timeInRecord.hour

    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee){
    const dates = employee.timeOutEvents.map(record => record.date)
    const dailyTotals = dates.map(date => wagesEarnedOnDate(employee, date))
    return dailyTotals.reduce(function(memo, total){
        return memo + total 
    })
}

function calculatePayroll(employees){
    return employees.map(allWagesFor).reduce(function(memo, total){
        return memo + total
    })
}

function findEmployeeByFirstName(employees, target){
    const lostEmployee = employees.find(employee => employee.firstName === target)
    return lostEmployee
}