import { Meteor } from 'meteor/meteor';

const getUserName = (userId) => {
  Meteor.subscribe('userName', userId);
  const user = Meteor.users.findOne({ _id: userId });
  return user ? user.username : 'anonymous user';
};

export { getUserName as default };
