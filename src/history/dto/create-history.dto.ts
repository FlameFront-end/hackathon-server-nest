import {
	IsNotEmpty,
	IsOptional,
	IsString,
	IsArray,
	IsNumber
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateHistoryDto {
	@ApiProperty({ example: 'nick' })
	@IsOptional()
	@IsString()
	nick?: string

	@ApiProperty({ example: 60 })
	@IsNotEmpty()
	@IsString()
	downloadSpeed: number

	@ApiProperty({ example: 50 })
	@IsNotEmpty()
	@IsString()
	uploadSpeed: number

	@ApiProperty({ example: [40, 45] })
	@IsNotEmpty()
	@IsArray()
	@IsNumber({}, { each: true })
	coordinates: number[]

	@ApiProperty({ example: 1 })
	@IsOptional()
	userId?: number
}
