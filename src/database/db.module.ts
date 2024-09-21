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
        const dbConfig = new ConfigService();
        return {
          dialect: 'mysql',
          host: dbConfig.get<string>('DATABASE_HOST'),
          port: dbConfig.get<number>('DATABASE_PROT'),
          username: dbConfig.get<string>('DATABASE_USER'),
          password: dbConfig.get<string>('DATABASE_PASSWORD'),
          database: dbConfig.get<string>('DATABASE_NAME'),
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
    }),
  ],
  providers: [],
})
export class DatabaseModule {}
