import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from 'src/admin/admin.module';
import { AdminSchema } from 'src/admin/schema/admin.schema';
import { CartModule } from 'src/cart/cart.module';
import { CartSchema } from 'src/cart/schema/cart.schema';
import { PaymentModule } from 'src/payment/payment.module';
import { PaymentService } from 'src/payment/service/payments.service';
import { ProductSchema } from 'src/products/schema/product.schema';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { TransactionSchema } from 'src/transaction/schema/transaction.schema';
import { TransactionModule } from 'src/transaction/transaction.module';
import { UserSchema } from 'src/user/schema/user.schema';
import { UserModule } from 'src/user/user.module';
import { HelpersService } from 'src/utils/helpers/helpers.service';
import { VendorsModule } from 'src/vendors/vendors.module';
import { DropshippingService } from './service/dropshipping.service';
import { DropshippingSchema } from './schema/dropshipping.schema';
import { SubscriptionSchema } from 'src/subscription/schema/subscription.schema';
import { OrdersService } from 'src/orders/orders.service';
import { OrderSchema } from 'src/orders/schema/order.schema';
import { DropshippingController } from './controller/dropshipping.controller';
import { VendorSchema } from 'src/vendors/schema/vendor.schema';
import { LogisticService } from 'src/logistics/service/logistic.service';
import { SingleOrderSchema } from 'src/orders/schema/singleOreder.schema';
import { SingleDropshippingSchema } from './schema/singledropshipping.schema';
import { InventorySchema } from './schema/inventory.schema';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationSchema } from 'src/notification/schema/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Dropshipping', schema: DropshippingSchema },
      { name: 'Cart', schema: CartSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Transaction', schema: TransactionSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Admin', schema: AdminSchema },
      { name: 'Subscription', schema: SubscriptionSchema },
      { name: 'Order', schema: OrderSchema },
      { name: 'Vendor', schema: VendorSchema },
      { name: 'SingleOrder', schema: SingleOrderSchema },
      { name: 'SingleDropshipping', schema: SingleDropshippingSchema },
      { name: 'Inventory', schema: InventorySchema },
      { name: 'Notification', schema: NotificationSchema },
    ]),
    UserModule,
    VendorsModule,
    TransactionModule,
    CartModule,
    AdminModule,
    PaymentModule,
    SubscriptionModule,
  ],
  exports: [],
  controllers: [DropshippingController],
  providers: [
    DropshippingService,
    HelpersService,
    PaymentService,
    OrdersService,
    LogisticService,
    NotificationService
  ],
})
export class DropshippingModule {}
