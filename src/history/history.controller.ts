import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { HistoryService } from './history.service'
import { CreateHistoryDto } from './dto/create-history.dto'
import { UpdateHistoryDto } from './dto/update-history.dto'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@ApiTags('history')
@Controller('history')
export class HistoryController {
	constructor(private readonly historyService: HistoryService) {}

	@Post()
	@ApiBody({ type: CreateHistoryDto })
	create(@Body() createHistoryDto: CreateHistoryDto) {
		return this.historyService.create(createHistoryDto)
	}

	@Get()
	findAll() {
		return this.historyService.findAll()
	}

	@Get('/user/:id')
	findByIdUser(@Param('id') id: string) {
		return this.historyService.findByIdUser(+id)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.historyService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
		return this.historyService.update(+id, updateHistoryDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.historyService.remove(+id)
	}
}
