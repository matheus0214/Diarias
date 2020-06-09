import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import IUserTokens from '@modules/users/entities/IUserTokens';

@Entity('user_tokens')
class UserTokens implements IUserTokens {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserTokens;
