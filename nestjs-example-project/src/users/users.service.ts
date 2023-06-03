import * as uuid from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import EmailService from '../email/email.service';
import UserInfo from './dto/user-info.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(EmailService) private readonly emailService: EmailService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    return `유저 생성 - 이름: ${name}, 이메일: ${email}, 패스워드: ${password}`;
  }

  async createUser(name: string, password: string, email: string) {
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO:
    // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 확인하고 없다면 에러 처리
    // 2. 바로 로그인 상태가 되도록 JWT 발급

    throw new Error('Method not Implemented');
  }

  async login(email: string, password: string): Promise<string> {
    // TODO:
    // 1. email, password를 DB에서 조회하고 없다면 에러 처리
    // 2. JWT 발급

    throw new Error('Method not Implemented');
  }

  async getUserInfo(userId: number): Promise<UserInfo> {
    // TODO:
    // 1. userId를 가진 유저가 존재하는지 확인하고 없다면 에러 처리
    // 2. 조회된 데이터를 UserInfo 타입으로 응답

    throw new Error('Method not Implemented');
  }

  async findAll() {
    throw new Error('Method not Implemented');
  }

  private async checkUserExists(email: string) {
    return; // TODO: DB 연동 후 구현
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return; // TODO: DB 연동 후 구현
  }

  private async sendMemberJoinEmail(
    email: string,
    signupVerifyToken: string,
  ): Promise<void> {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
}
