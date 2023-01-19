function datetimeToStringDate(datetime) {
  const date = datetime.split("T")[0];
  const [a, m, d] = date.split("-");
  return d + "/" + m + "/" + a;
}

function datetimeToString(datetime) {
  const [date, time] = datetime.split("T");
  const [a, m, d] = date.split("-");
  const [h, min] = time.split(".")[0].split(":");
  return d + "/" + m + "/" + a + " " + h + ":" + min;
}

function dateJsToJSON(d) {
  const date = d.toJSON().split("T")[0];
  const time = d.toLocaleTimeString() + ".000";
  return date + "T" + time;
}

function dateTimeNow() {
  var today = new Date();
  var date =
    today.getFullYear() +
    "-" +
    formatMinDigits(today.getMonth() + 1, 2) +
    "-" +
    formatMinDigits(today.getDate(), 2);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + "T" + time;
}

function formatMinDigits(s, n) {
  let output = `${s}`;
  let initialLength = output.length;
  if (n && initialLength < n) {
    for (let i = 0; i < n - initialLength; i++) {
      output = "0" + output;
    }
  }
  return output;
}
export { datetimeToStringDate, datetimeToString, dateJsToJSON, dateTimeNow };
