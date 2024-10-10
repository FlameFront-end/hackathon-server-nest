import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
	@ApiProperty({ example: 'user@example.com' })
	readonly email: string

	@ApiProperty({ example: 'password123' })
	readonly password: string

	@ApiProperty({ example: 'flame' })
	readonly nick: string

	@ApiProperty({ example: false })
	readonly isAdmin?: boolean
}
