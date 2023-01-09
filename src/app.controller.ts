import { Controller, Get, Inject } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(@Inject('WORKER_SERVICE') private readonly client: ClientProxy) { }

  @Inject('OTPservice') privateclient: ClientProxy;

  @Get()
  async getHello(): Promise<any> {
    const data = await this.privateclient.send('createTicket', '');
    return data;
  }

  @Post()
  async registerNews() {
    const date = new Date();
    const otp = Math.floor((Math.random() * 100) + 1);
    let time = date.getTime();
    const message = {
      date: `${date.toLocaleDateString()}`,
      time: `${time}`,
      content:
        `welcome to ParkingApp your OTP is ${otp} do not share your otp with any one, i will remain for 10 min`,
    };

    this.client.emit('register_news', message);

    return message;
  }
}



