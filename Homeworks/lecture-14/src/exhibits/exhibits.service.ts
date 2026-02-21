import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Exhibits } from "./exhibits.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ExhibitService {
    constructor(
        @InjectRepository(Exhibits)
        private readonly exhibitRepository: Repository<Exhibits>
    ) { }

    async getAll(page: number, limit: number) {
        if (page < 1 || !page) {
            page = 1
        }

        if (limit < 1 || !limit) {
            limit = 10
        }

        const [result, total] = await this.exhibitRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' }
        })

        return {
            data: result,
            total,
            page,
            lastPage: Math.ceil(total / limit)
        }
    }

    async create(file: Express.Multer.File, description: string, userId: number) {
        const uploadPath = path.join(__dirname, '../..', 'uploads')
        const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
        const filePath = path.join(uploadPath, uniqueFileName);

        try {
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }

            fs.writeFileSync(filePath, file.buffer);
        } catch (err) {
            console.error('File save error:', err);
            throw new InternalServerErrorException('Failed to save file');
        }

        const exhibit = this.exhibitRepository.create({
            description,
            imageUrl: `static/${uniqueFileName}`,
            userId,
        });

        return await this.exhibitRepository.save(exhibit);
    }

    async findById(id: number) {
        const exhibit = await this.exhibitRepository.findOneBy({ id })
        if (!exhibit) {
            throw new NotFoundException();
        }

        return exhibit;
    }

    async myPosts(page: number, limit: number, id: number) {
        if (page < 1 || !page) {
            page = 1
        }

        if (limit < 1 || !limit) {
            limit = 10
        }

        const [result, total] = await this.exhibitRepository.findAndCount({
            where: { userId: id },
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' }
        })

        return {
            data: result,
            total,
            page,
            lastPage: Math.ceil(total / limit)
        }
    }

    async deleteExhibit(id: number, userId: number) {
        const exhibit = await this.exhibitRepository.findOne({ where: { id } })
        if (!exhibit) {
            throw new NotFoundException()
        }

        if (exhibit.userId !== userId) {
            throw new ForbiddenException(`You are not allowed to delete this exhibit`);
        }

        await this.exhibitRepository.delete(id);

        return { message: 'Exhibit successfully deleted', id };
    }
}
