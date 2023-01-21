import { User, userModel } from '../model/user.model';

function findUserById(userId: string) {
  return userModel.findById(userId);
}

function findUserByEmail(email: User['email']) {
  return userModel.findOne({ email });
}

async function updateUserParams(userDetails: object, value: object) {
  return userModel.updateOne(userDetails, value, {
    new: true,
  });
}

async function getAllUsers() {
  return userModel.find().lean();
}

async function createUser(user: Omit<User, 'comparePassword'>) {
  return userModel.create(user);
}

const getUser = async (filter: object, option?: string) => {
  const user = await userModel.findOne(filter).select('-password').lean<User>().exec();
  return user;
};

export { findUserByEmail, findUserById, updateUserParams, getAllUsers, getUser, createUser };
