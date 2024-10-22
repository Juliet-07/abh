import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { LogisticService } from '../service/logistic.service';
import { PickupRequestDto } from '../dto/pickupDto.dto';

@Controller('logistic')
export class LogisticController {
  constructor(private readonly logisticService: LogisticService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  auth() {
    return this.logisticService.getAuthToken();
  }

  @Get('states')
  async getStates() {
    const token = await this.logisticService.getAuthToken();
    if (token) {
      return await this.logisticService.fetchAvailableStates(token);
    }
    return { error: 'Unable to fetch states, authentication failed.' };
  }

  @Get('cities')
  async getCities() {
    const token = await this.logisticService.getAuthToken();
    if (token) {
      return await this.logisticService.fetchAllCities(token);
    }
    return { error: 'Unable to fetch cities, authentication failed.' };
  }

  @Get('/state/cities')
  async getCitiesInState(@Query() query: any) {
    console.log('Received query:', query); // This will log the entire query object
    const stateName = query.stateName || query.StateName; // Fallback in case of different casing
    if (!stateName) {
      return { error: 'State name is required' };
    }
    const token = await this.logisticService.getAuthToken();
    if (token) {
      return await this.logisticService.fetchCitiesInState(token, stateName);
    }
    return { error: 'Unable to fetch cities, authentication failed.' };
  }

  @Get('delivery-towns')
  async getDeliveryTowns(@Query() query: any) {
    const token = await this.logisticService.getAuthToken();
    const cityCode = query.cityCode || query.CityCode;
    if (token) {
      return await this.logisticService.fetchDeliveryTowns(token, cityCode);
    }
    return { error: 'Unable to fetch delivery towns, authentication failed.' };
  }

  @Post('delivery-fee')
  async calculateFee(
    @Body()
    payload: {
      Origin: string;
      Destination: string;
      Weight: number;
      PickupType?: string;
      OnforwardingTownID: string;
    },
  ) {
    console.log('Received payload for delivery fee calculation:', payload);

    const token = await this.logisticService.getAuthToken();
    if (token) {
      return await this.logisticService.calculateDeliveryFee(token, payload);
    }
    return {
      error: 'Unable to calculate delivery fee, authentication failed.',
    };
  }

  @Post('pickup-request')
  async submitPickupRequest(@Body() payload: PickupRequestDto) {
    const token = await this.logisticService.getAuthToken();
    if (token) {
      const result = await this.logisticService.submitPickupRequest(
        token,
        payload,
      );

      return result;
    }
    return { error: 'submitPickupRequest, authentication failed.' };
  }
  @Get('track-shipment')
  async trackShipment(@Query('waybillno') waybillNo: string) {
    if (!waybillNo) {
      return { error: 'Waybill number is required.' };
    }

    try {
      // Get the authentication token
      const token = await this.logisticService.getAuthToken();
      if (!token) {
        return { error: 'Authentication failed.' };
      }

      // Track the shipment using the waybill number
      const trackingInfo = await this.logisticService.trackShipment(token, waybillNo);
      if (!trackingInfo) {
        return { error: 'Failed to track the shipment. Please try again.' };
      }

      return trackingInfo; // Return the tracking information
    } catch (error) {
      console.error('Error tracking shipment:', error.message);
      return { error: 'An error occurred while tracking the shipment.' };
    }
  }
  
}
