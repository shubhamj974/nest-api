import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      name: 'shubham',
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'mysql',
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'), // Fixed typo
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          define: {
            underscored: false,
          },
          dialectOptions: {
            multipleStatements: true,
          },
          retry: {
            max: 3,
            match: [
              'SequelizeDatabaseError : Deadlock found when trying to get lock; try restarting transaction',
              'ER_LOCK_DEADLOCK',
            ],
          },
          logging: console.log,
          autoLoadModels: true,
          synchronize: false,
        };
      },
      inject: [ConfigService], // Inject ConfigService properly
    }),
  ],
  providers: [],
})
export class DatabaseModule {}
