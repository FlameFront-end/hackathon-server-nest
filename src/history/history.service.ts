import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateHistoryDto } from './dto/create-history.dto'
import { UpdateHistoryDto } from './dto/update-history.dto'
import { HistoryEntity } from './entities/history.entity'
import { UserEntity } from '../user/entities/user.entity'

@Injectable()
export class HistoryService {
	constructor(
		@InjectRepository(HistoryEntity)
		private readonly historyRepository: Repository<HistoryEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async create(createHistoryDto: CreateHistoryDto): Promise<HistoryEntity> {
		const history = this.historyRepository.create(createHistoryDto)

		if (createHistoryDto.userId) {
			const user = await this.userRepository.findOne({
				where: { id: createHistoryDto.userId }
			})
			if (!user) {
				throw new NotFoundException(
					`User with ID ${createHistoryDto.userId} not found`
				)
			}
			history.user = user
		}

		return this.historyRepository.save(history)
	}

	async findAll(): Promise<HistoryEntity[]> {
		return this.historyRepository.find({ relations: ['user'] })
	}

	async findByIdUser(userId: number): Promise<HistoryEntity[]> {
		const histories = await this.historyRepository.find({
			where: { user: { id: userId } },
			relations: ['user']
		})
		if (!histories.length) {
			throw new NotFoundException(`No histories found for User ID ${userId}`)
		}
		return histories
	}

	async findOne(id: number): Promise<HistoryEntity> {
		const history = await this.historyRepository.findOne({
			where: { id },
			relations: ['user']
		})
		if (!history) {
			throw new NotFoundException(`History with ID ${id} not found`)
		}
		return history
	}

	async update(
		id: number,
		updateHistoryDto: UpdateHistoryDto
	): Promise<HistoryEntity> {
		await this.findOne(id)
		await this.historyRepository.update(id, updateHistoryDto)
		return this.historyRepository.findOne({
			where: { id },
			relations: ['user']
		})
	}

	async remove(id: number): Promise<void> {
		const history = await this.findOne(id)
		await this.historyRepository.remove(history)
	}
}
