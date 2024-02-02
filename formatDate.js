function formatDate(dateString) {
  // Convert dateString to a string if it's not already
  dateString = dateString.toString();

  // Extract date parts
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  const hour = dateString.substring(8, 10);
  const minute = dateString.substring(10, 12);
  const second = dateString.substring(12, 14);

  // Create a new Date object
  const date = new Date(year, month - 1, day, hour, minute, second);

  // Get current date
  const currentDate = new Date();

  // Format the date
  let formattedDate = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" : ""
  }${date.getMinutes()}`;
  if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    formattedDate += " Today";
  }

  return formattedDate;
}

export { formatDate };
