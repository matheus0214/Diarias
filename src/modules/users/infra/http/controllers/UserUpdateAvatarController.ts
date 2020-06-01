import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserUpdateAvatarService from '@modules/users/services/UserUpdateAvatarService';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const userUpdateAvatarService = container.resolve(UserUpdateAvatarService);

    const user = await userUpdateAvatarService.execute({
      id: request.user.id,
      filename: request.file.filename,
    });

    return response.json(user);
  }
}

export default UserAvatarController;
