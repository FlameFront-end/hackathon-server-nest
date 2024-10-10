import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn
} from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'

@Entity('history')
export class HistoryEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: true })
	nick: string

	@Column()
	downloadSpeed: number

	@Column()
	uploadSpeed: number

	@Column({ type: 'json', default: [] })
	coordinates: number[]

	@CreateDateColumn()
	createdAt: Date

	@ManyToOne(() => UserEntity, user => user.histories)
	@JoinColumn({ name: 'userId' })
	user: UserEntity
}
