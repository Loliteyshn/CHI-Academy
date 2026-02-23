import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/User.dto';
import { plainToInstance } from 'class-transformer';
import { Users } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully registered' })
    @ApiResponse({ status: 400, description: 'Incorrect data' })
    register(@Body() body: CreateUserDto) {
        const user = this.userService.create(body);
        return plainToInstance(Users, user, { excludeExtraneousValues: true });
    }

    @Get('/')
    @ApiOperation({ summary: 'Get user by id or username' })
    @ApiQuery({ name: 'id', required: false, description: 'User id' })
    @ApiQuery({ name: 'username', required: false, description: 'User name' })
    @ApiResponse({ status: 200, description: 'User found' })
    @ApiResponse({ status: 400, description: 'ID or username must be specified' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async getUser(
        @Query('id') id?: number,
        @Query('username') username?: string
    ) {
        if (!id && !username) {
            throw new BadRequestException('ID or username must be specified');
        }

        const user = id
            ? await this.userService.findUserById(id)
            : await this.userService.findByName(username!)

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return plainToInstance(Users, user, { excludeExtraneousValues: true })
    }

    @Get('my-profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get information about the current user' })
    @ApiResponse({ status: 200, description: 'Information about the current user' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async getProfile(@Request() req) {
        const user = await this.userService.findUserById(req.user.id)
        if (!user) {
            throw new UnauthorizedException();
        }
        return plainToInstance(Users, user, { excludeExtraneousValues: true });
    }
}
