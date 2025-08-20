import { Controller, Delete, Get, Param, Request, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  fetchMySpace(@Request() req) {
    return this.bookingService.myBookings(req['x-session-id']);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  cancelBooking(@Param('id') id: string) {
    return this.bookingService.cancelBooking(id);
  }
}
