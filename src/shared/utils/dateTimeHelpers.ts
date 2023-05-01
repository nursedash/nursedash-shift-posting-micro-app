import moment from 'moment';
import 'moment-timezone';

const getDateFromDateTimeStamp = (dateTimeStamp: string): string => {
  return moment(dateTimeStamp).format('MMMM D, YYYY');
}

const getTimeFromDateTimeStamp = (dateTimeStamp: string, timeZone: string): string => {
  return moment.tz(dateTimeStamp, timeZone).format('hh:mm A (z)');
}

const formatTimeRangeFromDateTimeStamps = (startDateTimeStamp: string, endDateTimeStamp: string, timeZone: string): string => {
  const startTime = getTimeFromDateTimeStamp(startDateTimeStamp, timeZone);
  const endTime = getTimeFromDateTimeStamp(endDateTimeStamp, timeZone);
  return `${startTime} - ${endTime}`;
}

export { getDateFromDateTimeStamp, getTimeFromDateTimeStamp, formatTimeRangeFromDateTimeStamps};
