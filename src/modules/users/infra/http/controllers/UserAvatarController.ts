import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserAvatarService from '@modules/users/services/UserAvatarService';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const userAvatarService = container.resolve(UserAvatarService);

    const user = await userAvatarService.execute({
      id: request.user.id,
      filename: request.file.filename,
    });

    return response.json(user);
  }
}

export default UserAvatarController;
