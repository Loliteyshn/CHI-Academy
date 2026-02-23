import { BadGatewayException, BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ExhibitService } from "./exhibits.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ExhibitDto } from "./dto/exhibit.dto";
import { FileInterceptor } from '@nestjs/platform-express'
import { Multer } from 'multer'
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { plainToInstance } from "class-transformer";
import { Exhibits } from "./exhibits.entity";
import { QueryExhibitDto } from "./dto/query-exhibibt.dto";
import { NotificationsGateway } from "src/notifications/notifications.gateway";

@Controller('api/exhibits')
@ApiTags('exhibits')
export class ExhibitController {
    constructor(
        private exhibitService: ExhibitService,
        private readonly notificationService: NotificationsGateway,
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Creating a new exhibit' })
    @ApiResponse({ status: 201, description: 'The exhibit has been successfully created.' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: { type: 'string', format: 'binary' },
                description: { type: 'string' },
            },
        },
    })
    createExhibit(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: ExhibitDto,
        @Request() req
    ) {
        if (!file) {
            throw new BadRequestException('File not loaded')
        }

        if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif)$/)) {
            throw new BadGatewayException('The uploaded file must be an image')
        }

        if (file.size > 5 * 1024 * 1024) {
            throw new BadGatewayException('The image size must not exceed 5 MB')
        }

        if (!body.description || !body.description.length) {
            throw new BadGatewayException('The description of the exhibit must be indicated')
        }
        const exhibit = this.exhibitService.create(file, body.description, req.user.id)

        this.notificationService.handleNewPost({
            message: body.description,
            user: req.user.username
        });

        return exhibit;
    }

    @Get('/post/:id')
    @ApiOperation({ summary: 'Get exhibit by id' })
    @ApiResponse({ status: 200, description: 'Information about exhibit' })
    @ApiResponse({ status: 404, description: 'Exhibit not found' })
    getExhibitById(@Param('id') id: number) {
        const exhibit = this.exhibitService.findById(id)
        return plainToInstance(Exhibits, exhibit, { excludeExtraneousValues: true })
    }

    @Get()
    @ApiOperation({ summary: 'Get all exhibits' })
    @ApiResponse({ status: 200, description: 'List of all exhibits' })
    async getAllExhibits(@Query() query: QueryExhibitDto) {
        const { page = 1, limit = 10 } = query;
        const exhibits = await this.exhibitService.getAll(page, limit);
        return {
            ...exhibits,
            data: plainToInstance(Exhibits, exhibits.data, { excludeExtraneousValues: true })
        }
    }

    @Get('my-posts')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Viewing the current user`s exhibits' })
    @ApiResponse({ status: 200, description: 'List of users exhibits' })
    @ApiResponse({ status: 404, description: 'Exhibits not found' })
    async getMyPosts(@Query() query: QueryExhibitDto, @Request() req) {
        const { page = 1, limit = 10 } = query;
        const exhibits = await this.exhibitService.myPosts(page, limit, req.user.id)
        return plainToInstance(Exhibits, exhibits.data, { excludeExtraneousValues: true })
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Deleting an exhibit from the current user by ID' })
    @ApiResponse({ status: 200, description: 'The exhibit has been successfully removed' })
    @ApiResponse({ status: 404, description: 'The exhibit with the specified ID does not exist' })
    async deleteExhibit(@Param('id') id: number, @Request() req) {
        return await this.exhibitService.deleteExhibit(id, req.user.id);
    }
}