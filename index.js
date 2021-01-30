// Your code here
function createEmployeeRecord(row) {
	return {
		firstName: row[0],
		familyName: row[1],
		title: row[2],
		payPerHour: row[3],
		timeInEvents: [],
		timeOutEvents: []
	};
}

function createEmployeeRecords(rows) {
	return rows.map(function(row) {
		return createEmployeeRecord(row);
	});
}

function createTimeInEvent(record, datetime) {
	let [date, time] = datetime.split(" ");
	record.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(time, 10),
		date: date
	});
	return record;
}

function createTimeOutEvent(record, datetime) {
	let [date, time] = datetime.split(" ");
	record.timeOutEvents.push({
		type: "TimeOut",
		hour: parseInt(time, 10),
		date: date
	});
	return record;
}

function hoursWorkedOnDate(record, date) {
	const timeIn = record.timeInEvents.find(function(event) {
		return event.date === date;
	}).hour;
	const timeOut = record.timeOutEvents.find(function(event) {
		return event.date === date;
	}).hour;

	return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(record, date) {
	return record.payPerHour * hoursWorkedOnDate(record, date);
}

function allWagesFor(record) {
	let dates = record.timeInEvents.map(function(event) {
		return event.date;
	});

	let allWages = dates.reduce(function(memo, date) {
		return memo + wagesEarnedOnDate(record, date);
	}, 0);

	return allWages;
}

function findEmployeeByFirstName(records, firstName) {
	return records.find(function(record) {
		return record.firstName === firstName;
	});
}

function calculatePayroll(records) {
	return records.reduce(function(memo, record) {
		return memo + allWagesFor(record);
	}, 0);
}