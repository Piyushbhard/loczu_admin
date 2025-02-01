import moment from 'moment';
import { getHourFormat } from './getHourFormat';

export default function getFullDateTime(date) {
  if (date) {
    return moment(date).format(`DD-MM-YYYY, ${getHourFormat()}`);
  }
  return '';
}
