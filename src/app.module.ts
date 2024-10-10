import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { UserEntity } from './user/entities/user.entity'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { UploadModule } from './upload/upload.module'

@Module({
	imports: [
		UserModule,
		AuthModule,
		UploadModule,
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRESS_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRESS_PASSWORD,
			database: process.env.POSTGRES_DB,
			entities: [UserEntity],
			synchronize: true
		}),
		TypeOrmModule.forFeature([UserEntity])
	],
	controllers: [],
	providers: []
})
export class AppModule {}
