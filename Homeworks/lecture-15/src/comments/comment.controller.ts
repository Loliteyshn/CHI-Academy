import { BadGatewayException, BadRequestException, Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommentDto } from "./dto/comment.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { plainToInstance } from "class-transformer";
import { Comments } from "./comments.entity";

@Controller('api/exhibits')
@ApiTags('comments')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Post('/:id/comments')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Add comment to exhibit' })
    @ApiResponse({ status: 200, description: 'Comment added successfully' })
    async createComment(
        @Param('exhibitId') id: number,
        @Body() body: CommentDto,
        @Request() req
    ) {
        if (!body.text || !body.text.length) {
            throw new BadRequestException('The text of the comment must be specified')
        }

        const comment = await this.commentService.createComment(id, body.text, req.user.id);
        return plainToInstance(Comments, comment, {
            excludeExtraneousValues: true
        });
    }

    @Get('/:exhibitId/comments')
    @ApiOperation({ summary: 'Get all exhibit comments' })
    @ApiResponse({ status: 200, description: 'List of all exhibit comments' })
    async getExhibitComment(@Param('exhibitId') id: number) {
        const comments = await this.commentService.getAll(id);
        return plainToInstance(Comments, comments, { excludeExtraneousValues: true })
    }


    @Delete('/:exhibitId/comments/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Delete comment' })
    @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
    async deleteComment(
        @Param('exhibitId') exhibitId: number,
        @Param('id') id: number,
        @Request() req
    ) {
        return await this.commentService.deleteComment(exhibitId, id, req.user.id)
    }
}