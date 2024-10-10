import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { UserEntity } from './user/entities/user.entity'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { HistoryModule } from './history/history.module'
import { HistoryEntity } from './history/entities/history.entity'

@Module({
	imports: [
		UserModule,
		AuthModule,
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'jelani.db.elephantsql.com',
			port: 5432,
			username: 'yemrjdkh',
			password: 'PZZIbeyBdQpQ79Pase1C43w3Tt40Mr-N',
			database: 'yemrjdkh',
			entities: [UserEntity, HistoryEntity],
			synchronize: true
		}),
		TypeOrmModule.forFeature([UserEntity, HistoryEntity]),
		HistoryModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
