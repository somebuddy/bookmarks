import { moment } from 'meteor/momentjs:moment';

export const timePassed = (date) => {
  return moment(date).fromNow();
};
