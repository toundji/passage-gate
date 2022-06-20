/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { AuthService } from 'src/auth/services/auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entities/message.entity';
import { User } from 'src/commun/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(private readonly authService: AuthService, 
  @InjectRepository(Message)
  private messagesRepository: Repository<Message>,
  ) {}

  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    const { Authentication: authenticationToken } = parse(cookie);
    const user = await this.authService.verifyToken(authenticationToken);
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  async saveMessage(content: string, author: User) {
    const newMessage = new Message();
    newMessage.content = content;
    newMessage.user = author;
   return await this.messagesRepository.save(newMessage);
  }
 
  async getAllMessages() {
    return this.messagesRepository.find({
      relations: ['user']
    });
  }

  
}
