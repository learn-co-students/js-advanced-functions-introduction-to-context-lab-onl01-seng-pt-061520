// Your code here

//The payroll system:

//1.populates a record from an Array
//has a function called createEmployeeRecord
let createEmployeeRecord = function(employeeData){
    return{
        //populates a firstName field from the 0th element
        firstName: employeeData[0],
        //populates a familyName field from the 1th element
        familyName: employeeData[1],
        //populates a title field from the 2th element
        title: employeeData[2],
        //populates a payPerHour field from the 3th element
        payPerHour: employeeData[3],
        //initializes a field, timeInEvents, to hold an empty Array
        timeInEvents: [],
        //initializes a field, timeOutEvents, to hold an empty Array
        timeOutEvents: []
    }
}

//2.process an Array of Arrays into an Array of employee records
//has a function called createEmployeeRecords
    //creates two records
    //correctly assigns the first names
    //creates more than 2 records
let createEmployeeRecords= function(employeeData){
    return employeeData.map(createEmployeeRecord)
}

//3.it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record
//has a function called createTimeInEvent
function createTimeInEvent(obj, timeStamp) {
    //extracts the correct hour
    let hour = parseInt(timeStamp.split(' ')[1])
    //extracts the correct date
    let date = timeStamp.split(' ')[0]
    //creates the correct type
    obj.timeInEvents.push({type: "TimeIn", hour: hour, date: date})
    //returns the updated record
    return obj
}

//4.it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
//has a function called createTimeOutEvent
function createTimeOutEvent(obj, timeStamp) {
    //extracts the correct hour
    let hour = parseInt(timeStamp.split(' ')[1])
    //extracts the correct date
    let date = timeStamp.split(' ')[0]
    //creates the correct type
    obj.timeOutEvents.push({type: "TimeOut", hour: hour, date: date})
    //returns the updated record
    return obj
}


//5.Given an employee record with a date-matched timeInEvent and timeOutEvent
//hoursWorkedOnDate calculates the hours worked when given an employee record and a date
function hoursWorkedOnDate(obj, timeStamp){
    let timeIn = obj.timeInEvents.find(x => x.date === timeStamp)
    let timeOut = obj.timeOutEvents.find(x => x.date === timeStamp)
    let result = (timeOut.hour - timeIn.hour) / 100
    return result
}
//wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
function wagesEarnedOnDate(obj, timeStamp){
    return hoursWorkedOnDate(obj, timeStamp) * obj.payPerHour
}

//allWagesFor aggregates all the dates' wages and adds them together
function allWagesFor(obj){
    let eligibleDates = obj.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(obj, d)
    }, 0)

    return payable
}

//Given an array of multiple employees
//calculatePayroll aggregates all the dates' wages and adds them together

function createEmployeeRecords(arryOfArrays) {
    let theArray = []
    arryOfArrays.forEach(element => {
        theArray.push(createEmployeeRecord(element))
    });
    return theArray
}
//Dependent functions: findEmployeeByFirstName
let findEmployeeByFirstName = function(emps, testName) {
    return emps.find(emp => emp.firstName === testName)
}
//calculatePayroll aggregates all the dates' wages and adds them together
//calculates that the employees earned 770 dollars
function calculatePayroll(array){
    let sum = array.map((e) => allWagesFor(e))
    return sum.reduce((num, sum) => num + sum)
}