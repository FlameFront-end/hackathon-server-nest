import { Module } from '@nestjs/common'
import { HistoryService } from './history.service'
import { HistoryController } from './history.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HistoryEntity } from './entities/history.entity'
import { UserEntity } from '../user/entities/user.entity'

@Module({
	imports: [TypeOrmModule.forFeature([HistoryEntity, UserEntity])],
	controllers: [HistoryController],
	providers: [HistoryService]
})
export class HistoryModule {}
