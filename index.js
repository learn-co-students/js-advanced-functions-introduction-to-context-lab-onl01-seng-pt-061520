// Your code here
function createEmployeeRecord(employeeArray){
    const employeeRecord =  { 
       firstName: employeeArray[0],
       familyName: employeeArray[1],
       title: employeeArray[2],
       payPerHour: employeeArray[3],
       timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(arrayOfArrays){
    const employeeRecordsArray = arrayOfArrays.map(function(arrayOfInfo){
        return createEmployeeRecord(arrayOfInfo)
    })
    return employeeRecordsArray
}

function createTimeInEvent(employeeRecordObject, dateStamp){
   let number = dateStamp.slice(11,15)
    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt(number),
        date: dateStamp.slice(0,10)

    }
    employeeRecordObject.timeInEvents.push(timeInEvent)
    return employeeRecordObject
}

function createTimeOutEvent(employeeRecordObject, dateStamp){
    let number = dateStamp.slice(11,15)
     let timeOutEvent = {
         type: "TimeOut",
         hour: parseInt(number),
         date: dateStamp.slice(0,10)
 
     }
     employeeRecordObject.timeOutEvents.push(timeOutEvent)
     return employeeRecordObject
 }

 function hoursWorkedOnDate(employeeRecordObject, dateObject){
    let foundTimeInRecord = employeeRecordObject.timeInEvents.find(element => element.date === dateObject)
    let foundTimeOutRecord = employeeRecordObject.timeOutEvents.find(element => element.date === dateObject)
   let  hoursWorked = (foundTimeOutRecord.hour - foundTimeInRecord.hour)/100
    return hoursWorked
 }

 function wagesEarnedOnDate(employeeRecordObject, dateObject){
   let hours =  hoursWorkedOnDate(employeeRecordObject, dateObject)
   let payrate = employeeRecordObject.payPerHour
   return payrate * hours
 }

 function allWagesFor(employeeRecordObject){
   let datesWorked = employeeRecordObject.timeInEvents.map(function(timeInEventRecord){
       return timeInEventRecord.date
    })
    let payForEachDay = datesWorked.map(function(date){
        return wagesEarnedOnDate(employeeRecordObject, date)
    })
    let payOwed = payForEachDay.reduce(function (accumulator, current) {
        return accumulator + current;
    })
    return payOwed    
 }

 function findEmployeeByFirstName(srcArray, firstName){
     let foundEmployee = srcArray.find(element => element.firstName === firstName)
     return foundEmployee
 }

 function calculatePayroll(employeeRecordsArray){
     let arrayOfPayPerEmp = employeeRecordsArray.map(function(employee){
        return allWagesFor(employee)
     })
     let totalPay = arrayOfPayPerEmp.reduce(function (accumulator, current) {
        return accumulator + current;
    })
    return totalPay
 }