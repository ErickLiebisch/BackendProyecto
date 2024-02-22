import UserManager from '../dao/MongoDB-managers/UserManager.js';

import UserRepository from './user.repository.js';

export const userRepository= new UserRepository(UserManager);