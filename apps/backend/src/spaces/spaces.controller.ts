import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateBookingDto, CreateSpaceDto, CreateSpaceReviewDto } from './spaces.dto';

@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  @UseGuards(AuthGuard)
  createSpace(@Body() dto: CreateSpaceDto) {
    return this.spacesService.createSpace(dto);
  }

  @Post(':id/review')
  @UseGuards(AuthGuard)
  leaveReview(@Body() dto: CreateSpaceReviewDto) {
    return this.spacesService.leaveReview(dto);
  }

  @Post(':id/book')
  @UseGuards(AuthGuard)
  bookSpace(@Body() dto: CreateBookingDto) {
    return this.spacesService.bookSpace(dto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  fetchMySpace(@Request() req) {
    return this.spacesService.mySpaces(req['x-session-id']);
  }

 @Get(':id')
  @UseGuards(AuthGuard)
  fetchSpace(@Param('id') id: string) {
    return this.spacesService.fetchSpace(id);
  }
}
