import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExhibitModule } from './exhibits/exhibits.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'museum',
    password: 'museum',
    database: 'museum_db',
    synchronize: false,
    entities: [__dirname + '/**/*.entity.{ts,js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
  }),
    UserModule,
    AuthModule,
    ExhibitModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
