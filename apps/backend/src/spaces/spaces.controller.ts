import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateSpaceDto } from './spaces.dto';

@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  @UseGuards(AuthGuard)
  createSpace(@Body() dto: CreateSpaceDto) {
    return this.spacesService.createSpace(dto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  fetchMySpace(@Request() req) {
    return this.spacesService.mySpaces(req['x-session-id']);
  }
}
