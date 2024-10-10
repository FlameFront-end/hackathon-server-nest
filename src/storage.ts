import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import * as path from 'path'

const normalizeFileName = (req, file, callback) => {
	const fileExtName = path.extname(file.originalname)
	const fileName = `${uuidv4()}${fileExtName}`
	callback(null, fileName)
}

export const imagesStorage = diskStorage({
	destination: './uploads/images',
	filename: normalizeFileName
})
