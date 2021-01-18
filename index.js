// Your code here
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

function createEmployeeRecords(records) {
    return records.map(function(record) {
        return createEmployeeRecord(record)
    });
}

function createTimeInEvent(record, timeIn) {
    let splitTime = timeIn.split(" "); 
    let newTimeIn = {
        type: "TimeIn",
        date: splitTime[0],
        hour: parseInt(splitTime[1])
    } 
    // console.log(newTimeIn)
    record["timeInEvents"].unshift(newTimeIn);
    return record
}

function createTimeOutEvent(record, timeOut) {
    let splitTime = timeOut.split(" "); 
    let newTimeOut = {
        type: "TimeOut",
        date: splitTime[0],
        hour: parseInt(splitTime[1])
    } 
    // console.log(newTimeIn)
    record["timeOutEvents"].unshift(newTimeOut);
    return record
}

function hoursWorkedOnDate(record, datea) { 
    
    let inDate = record["timeInEvents"].find(element => element["date"] == datea);
    let outDate = record["timeOutEvents"].find(element => element["date"] == datea);
    return outDate["hour"]/100 - inDate["hour"]/100;
}

function wagesEarnedOnDate(record, datea) {
    return hoursWorkedOnDate(record, datea) * record["payPerHour"];

}

function allWagesFor(record) {
    return record["timeInEvents"].reduce(function(total, element) {
        return total + wagesEarnedOnDate(record, element["date"]);         
    }, 0 
    );
    
}

function calculatePayroll(records) {
    return records.reduce(function(total, element) {
        return total + allWagesFor(element)
    }, 0)
}

function findEmployeeByFirstName(records, firsName) {
    return records.find(element => element.firstName == firsName);
}