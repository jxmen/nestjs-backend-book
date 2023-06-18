import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UserStatus } from '../enum/user-status.enum';
import { UnauthorizedException } from '@nestjs/common';

@Entity('User')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  password: string;

  @Column({ length: 60 })
  signupVerifyToken: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.INVITED,
  })
  status: UserStatus;

  emailVerify() {
    this.status = UserStatus.VERIFIED;
  }
  checkEmailVerified() {
    if (this.status !== UserStatus.VERIFIED) {
      throw new UnauthorizedException('인증이 완료되지 않은 유저입니다.');
    }
  }
}
