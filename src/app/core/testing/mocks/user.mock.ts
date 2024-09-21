import { User } from "@shared/types/interface.user";
import { AccountTypeEnum } from "@shared/types/types.enums";

export const MOCK_USER: User = {
  email: 'test@gmail.com',
  name: 'test',
  _id: 'test-id',
  account: AccountTypeEnum.USER,
  avatar: 'placeholder.png',
  stats: {
    friends: 2,
    likes: 10,
    views: 14
  },
  profile: {
    role: 'tester'
  }
}