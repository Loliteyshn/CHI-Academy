import { BadRequestException, Body, Controller, Post, Res, UnauthorizedException } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 201, description: 'The user has been successfully logged in' })
    @ApiResponse({ status: 400, description: 'Incorrect data' })
    async login(@Body() body: LoginDto, @Res() res: any) {

        if (!body.username || !body.password) {
            throw new BadRequestException('All fields must be filled in');
        }

        const user = await this.authService.validateUser(body.username, body.password)
        const { access_token, refresh_token } = await this.authService.login(user);

        const response = {
            access_token,
            refresh_token,
            userName: body.username,
            userId: user.id,
        };

        return res.status(200).json(response);
    }
}