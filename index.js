function createEmployeeRecord(values) {
    let record = {
        firstName: values[0],
        familyName: values[1],
        title: values[2],
        payPerHour: values[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record
}

function createEmployeeRecords (records) {
    return records.map(createEmployeeRecord)
    // return result
}

function createTimeInEvent(record, date) {
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    }
    record["timeInEvents"].push(timeIn)
    return record
}

function createTimeOutEvent(record, date) {
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    }
    record["timeOutEvents"].push(timeOut)
    return record
}

function hoursWorkedOnDate(record, date) {
    let timeIn = record["timeInEvents"].find(event => event['date'] === date)
    let timeOut = record["timeOutEvents"].find(event => event['date'] === date)
    if (timeIn && timeOut) {
        let hoursWorked = (timeOut['hour'] - timeIn['hour']) / 100
        return hoursWorked
    } else {
        return 0
    }
}

function wagesEarnedOnDate(record, date) {
    let pay = (hoursWorkedOnDate(record, date) * record.payPerHour)
    return pay
}

function allWagesFor(record) {
    let dates = record['timeInEvents'].map(event => event.date)
    let total = dates.reduce(function(base, date) { return base + wagesEarnedOnDate(record, date)}, 0)
    return total
}

function findEmployeeByFirstName(srcArray, firstName) {
    let result = srcArray.find(emp => emp.firstName === firstName)
    return result
}

function calculatePayroll(records) {
    let total = records.reduce(function(base, emp){return base + allWagesFor(emp)}, 0)
    return total
}