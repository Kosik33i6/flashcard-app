import { User } from '@/models';
import {
  UserInterface,
  UserDocument,
  UpdateUserDTO,
  UpdatePasswordDTO,
} from '@/@types';

export class UserService {
  async createUser(userData: UserInterface): Promise<UserDocument> {
    const user = await User.findOne({ email: userData.email });
    if (!user) throw new Error('User with this email already exists');
    return await User.create(userData);
  }
  async getAllUsers() {
    const users = await User.find({ role: { $ne: 'admin' } });
    return { users, count: users.length };
  }

  async getUserById(id: string): Promise<Omit<UserDocument, 'password'>> {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async showCurrentUser(user: string) {
    return user;
  }

  async updateUser(id: string, { email, name }: UpdateUserDTO) {
    const user = await User.findByIdAndUpdate(
      id,
      { email, name },
      { runValidators: true, new: true },
    );
    if (!user) throw new Error('User not found');

    // ! Add token user

    return user;
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDTO,
  ) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if (!isPasswordCorrect) throw new Error('Invalid credentials');

    user.password = newPassword;
    await user.save();
  }

  async deleteUser(id: string) {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    await user.deleteOne();
  }

  async deleteCurrentUser(id: string) {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    await user.deleteOne();
  }

  public async deleteAllUsers() {
    const users = await User.deleteMany({ role: { $ne: 'admin' } });
    return { message: 'Users were removed', users };
  }
}
