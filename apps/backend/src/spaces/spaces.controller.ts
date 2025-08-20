import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateBookingDto,
  CreateSpaceReviewDto,
} from './spaces.dto';

@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  @UseGuards(AuthGuard)
  createSpace(@Body() dto: any) {
    return this.spacesService.createSpace(dto);
  }

  @Get()
  allSpaces(
    @Query()
    query: {
      category?: string[];
      country?: string;
      city?: string;
      minPrice?: string;
      maxPrice?: string;
      minRating?: string;
    },
  ) {
    return this.spacesService.allSpaces(query);
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
  fetchSpace(@Param('id') id: string) {
    return this.spacesService.fetchSpace(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteSpace(@Param('id') id: string) {
    return this.spacesService.deleteSpace(id);
  }
}
