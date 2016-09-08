import { Meteor } from 'meteor/meteor';

export const getUserName = (user_id) => {
  Meteor.subscribe('userName', user_id);
  let user = Meteor.users.findOne({ _id: user_id });
  return user ? user.username : 'anonymous user';
}
