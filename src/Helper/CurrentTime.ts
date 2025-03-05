export const CurrentTime = (): string => {
  const today = new Date();
  return today.toISOString().replace("T", " ").slice(0, 19); // "YYYY-MM-DD HH:mm:ss"
};

export const getDateOnly = (): Date => {
  const today = new Date();
  const day = today.getDate(); // No need to pad, since Date constructor handles raw numbers
  const month = today.getMonth(); // Months are already 0-based
  const year = today.getFullYear();

  // Return a Date object representing only the date part (time will be 00:00:00)
  return new Date(year, month, day);
};

export const calculateAge = (dateOfBirth) => {
  const dob = new Date(dateOfBirth); // Parse the given date
  const today = new Date(); // Current date

  let age = today.getFullYear() - dob.getFullYear(); // Calculate year difference
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();
  // Adjust age if the current month/day is earlier than the birth month/day
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

export const getTotalHoursBetween = (startTime: string, endTime: string) => {
  // Function to convert 12-hour format to 24-hour format
  const convertTo24HourFormat = (time: string) => {
    const [timePart, modifier] = time.split(" ");
    let [hour, minute] = timePart.split(":").map(Number);

    if (modifier === "PM" && hour < 12) {
      hour += 12; // Convert PM hour to 24-hour format
    }
    if (modifier === "AM" && hour === 12) {
      hour = 0; // Midnight case
    }

    return { hour, minute };
  };

  // Convert both times to 24-hour format
  const { hour: startHour, minute: startMinute } = convertTo24HourFormat(startTime);
  const { hour: endHour, minute: endMinute } = convertTo24HourFormat(endTime);

  // Set the date for both times
  const today = new Date();
  const startDate = new Date(today);
  startDate.setHours(startHour, startMinute, 0, 0);

  const endDate = new Date(today);
  endDate.setHours(endHour, endMinute, 0, 0);

  // If the end time is earlier than the start time, assume it's the next day
  if (endDate < startDate) {
    endDate.setDate(endDate.getDate() + 1);
  }

  // Calculate the difference in milliseconds
  const differenceMs = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to total hours
  const totalHours = differenceMs / (1000 * 60 * 60); // This will be a decimal value

  return totalHours;
};

export const calculateDaysDifference = (date1, date2) => {
  // Parse the dates
  const d1: any = new Date(date1);
  const d2: any = new Date(date2);

  // Calculate the difference in time (milliseconds)
  const diffInTime = Math.abs(d2 - d1);

  // Convert the difference to days
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
  return diffInDays;
};
