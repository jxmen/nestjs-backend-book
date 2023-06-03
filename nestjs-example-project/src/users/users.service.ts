import * as uuid from 'uuid';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import EmailService from '../email/email.service';
import UserInfo from './dto/user-info.dto';
import { UserEntity } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(EmailService) private readonly emailService: EmailService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  async createUser(name: string, password: string, email: string) {
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.saveUserUsingTransaction(
      name,
      email,
      password,
      signupVerifyToken,
    );
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
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입할 수 없습니다.',
      );
    }
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new UserEntity();
    user.id = uuid.v1();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;

    await this.usersRepository.save(user);
  }

  private async saveUserUsingQueryRunner(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = new UserEntity();
      user.id = uuid.v1();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;

      await queryRunner.manager.save(user);

      // throw new InternalServerErrorException('일부러 에러 발생');

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();

      throw e;
    } finally {
      // 직접 생성한 QueryRunner는 해제시켜야 함
      await queryRunner.release();
    }
  }

  private async saveUserUsingTransaction(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    await this.dataSource.transaction(async (manager) => {
      const user = new UserEntity();
      user.id = uuid.v1();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;

      await manager.save(user);

      // throw new InternalServerErrorException('일부러 에러 발생');
    });
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
