import { Module } from '@nestjs/common';
import { DiaristaModule } from './diarista/diarista.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diarista } from './diarista/diarista.entity';

@Module({
  imports: [
    DiaristaModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'docker',
      database: 'docker',
      entities: [Diarista],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
