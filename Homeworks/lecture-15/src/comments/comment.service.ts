import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comments } from "./comments.entity";
import { Repository } from "typeorm";
import { Exhibits } from "src/exhibits/exhibits.entity";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comments)
        private readonly commentsRepository: Repository<Comments>,
        @InjectRepository(Exhibits)
        private readonly exhibitRepository: Repository<Comments>,
    ) { }

    async getAll(id: number) {
        return await this.commentsRepository.find({ where: { exhibit: { id } } })
    }

    async createComment(exhibitId: number, text: string, userId: number) {
        const exhibit = await this.exhibitRepository.findOne({ where: { id: exhibitId } });
        if (!exhibit) {
            throw new NotFoundException('Exhibit not found');
        }

        const comment = this.commentsRepository.create({
            text,
            user: { id: userId }, 
            exhibit: exhibit       
        });

        const savedComment = await this.commentsRepository.save(comment);
        return savedComment;
    }

    async deleteComment(exhibitId: number, id: number, userId: number) {
        const comment = await this.commentsRepository.findOne({ where: { id, exhibit: { id: exhibitId } }, relations: { user: true } })
        if (!comment) {
            throw new NotFoundException();
        }

        if (comment.user.id !== userId) {
            throw new ForbiddenException(`You are not allowed to delete this comment`);
        }

        await this.commentsRepository.delete(id);

        return { message: 'Comment successfully deleted', id };
    }
}