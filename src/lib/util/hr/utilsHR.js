export function formatDate(dateTime) {
    var formatted = dateTime.toLocaleString('default', {
        day: '2-digit',
        month: 'long',
        year: 'numeric' 
      });
    return formatted
}

export function formatDate2(dateTime){
  //should return YYYY-MM-DD
  return formatDateTime(dateTime).substring(0,10);
}

export function formatDateTime(dateTime) {
  const year = dateTime.getFullYear();
  const month = padZero(dateTime.getMonth() + 1);
  const day = padZero(dateTime.getDate());
  const hours = padZero(dateTime.getHours());
  const minutes = padZero(dateTime.getMinutes());
  const seconds = padZero(dateTime.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDateTimeForForm(dateTime) {
  if (dateTime instanceof Date) {
    return formatDateTime(dateTime);
  }
  else { //string
    return dateTime;
  }
}

export function formatDateForForm(dateTime) {
  if (dateTime instanceof Date) {
    const year = dateTime.getFullYear();
    const month = padZero(dateTime.getMonth() + 1);
    const day = padZero(dateTime.getDate());

    return `${year}-${month}-${day}`
  }
  else { //string
    return dateTime.substring(0, 10)
  }
}

function padZero(value) {
  return value < 10 ? `0${value}` : value;
}

export function genRD(x) {
  var digits = '';

  // Prevents digits to have zero in the most significant digit
  if (x >= 1) {
    digits += (Math.floor(Math.random() * 9)+1);
  }

  for (var i = 1; i < x; i++) {
    var rng = Math.floor(Math.random() * 10);
    digits += rng;
  }
  return parseInt(digits);
}

export function generateEmail(fname, mname, lname, company = "onetwentyseven") {
  return (fname.charAt(0) + (mname? mname.charAt(0): "") + lname.replaceAll(/[^a-zA-Z]/g, '') + "@" + company + ".com").toLowerCase();
}

export function hasNoNumbers(string) {
  return !/\d/.test(string);
}

export function isNumber(value) {
  return !isNaN(parseFloat(value));
}

export function isValidDateTime(string) {
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}(T|\s)(?:[01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;
  return dateTimeRegex.test(string);
}

export function isValidDate(string) {
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  return regex.test(string);
}

export function isValidTime(string) {
  const regex = /^(?:[01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/
  return regex.test(string);
}

export function isValidYear(string) {
  const regex = /^\d{4}$/;
  return regex.test(string);
}

export function isValidPhoneNumber(string) {
  const regex = /^(\(?(\+\d{1,2})?\)?\s?|0)?(\(\d{1,4}\))?\s?(\d{3}[-|\s]?\d{3}[-|\s]?\d{4}|\d{10})$/;
  return regex.test(string);
}