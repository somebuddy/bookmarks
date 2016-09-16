import { moment } from 'meteor/momentjs:moment';

const timePassed = date => moment(date).fromNow();

export { timePassed as default };
