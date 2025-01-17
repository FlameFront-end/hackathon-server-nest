import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '../types/types'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService
	) {}

	async create(createUserDto: CreateUserDto) {
		const existUser = await this.userRepository.findOne({
			where: {
				email: createUserDto.email
			}
		})

		if (existUser) {
			throw new BadRequestException('Эта почта уже занята')
		}

		const user = await this.userRepository.save({
			...createUserDto,
			password: await argon2.hash(createUserDto.password),
			isAdmin: createUserDto.email === '5017_30@mail.ru'
		})

		const token = this.jwtService.sign({ email: createUserDto.email })

		return {
			...user,
			token
		}
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const user = await this.userRepository.findOne({
			where: { id }
		})
		if (!user) {
			throw new Error('Пользователь не найден')
		}

		Object.assign(user, updateUserDto)

		if (updateUserDto.password) {
			user.password = await argon2.hash(updateUserDto.password)
		}

		return this.userRepository.save(user)
	}

	async findOne(email: string) {
		return await this.userRepository.findOne({
			where: { email }
		})
	}

	async findBuId(id: number) {
		return await this.userRepository.findOne({
			where: { id }
		})
	}

	async getAllUsers() {
		return await this.userRepository.find()
	}

	async getUserByEmail(email: string) {
		return await this.userRepository.findOne({
			where: { email }
		})
	}

	async updatePassword(userId: number, newPassword: string): Promise<void> {
		await this.userRepository.update({ id: userId }, { password: newPassword })
	}

	async resetPassword(user: IUser, newPassword: string): Promise<void> {
		const hashedNewPassword = await argon2.hash(newPassword)
		await this.updatePassword(user.id, hashedNewPassword)
	}
}
