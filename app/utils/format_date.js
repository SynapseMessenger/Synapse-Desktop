const formatDate = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  const hoursMinutes = hours + ':' + minutes + ' ' + amPm;
  const daysMonthsYears = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
  return hoursMinutes + " - " + daysMonthsYears;
};

export default formatDate;
