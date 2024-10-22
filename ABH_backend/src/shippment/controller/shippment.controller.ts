import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ShippingService } from '../service/shippment.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateShippingDto } from '../dto/shipping.dto';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth('JWT-auth')
  create(@Body() payload: CreateShippingDto, @Request() req) {
    const userId = req.user._id;
    return this.shippingService.checkoutFromInventory(payload, userId);
  }

  @Get('users')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  ListShipping(@Request() req) {
    const userId = req.user;
    return this.shippingService.listShipping(userId);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async handleCallbackSub(@Body('TransactionRef') TransactionRef: string) {
    return await this.shippingService.updateDropshippingPayment(TransactionRef);
  }

  @Get('verify')
  async verifyPayment(@Query('TransactionRef') TransactionRef: string) {
    return await this.shippingService.updateDropshippingPayment(TransactionRef);
  }
}
