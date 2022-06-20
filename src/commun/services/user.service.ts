/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
// import { RoleService } from "./roles.service";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { RoleName } from 'src/enums/role-name';
import { Logger } from '@nestjs/common';
import { UserDto } from "src/commun/dto/user.dto";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: UserDto): Promise<User> {
    const user: User = new User();
    Object.keys(createUserDto).forEach((cle) => {
      user[cle] = createUserDto[cle];
    });

      return this.userRepository.save(user).catch((e)=>{
        Logger.error(e);
        throw new BadRequestException(
          "Les données que nous avons réçues ne sont pas celle que nous espérons",
        );
      });
  }


  async createAll(createUserDto: User[]): Promise<User[]> {
  

      return this.userRepository.save(createUserDto).catch((e)=>{
        Logger.error(e);
        throw new BadRequestException(
          "Les données que nous avons réçues ne sont pas celle que nous espérons",
        );
      });
  }

  // init(){
  //  const users:User[]= [
  //     {
  //       "id": 1,
  //       "name": "admin",
  //       "email": "Admin@gmaiL.com",
  //       "password": "Admin@1234",
  //       "role": "ADMIN",
  //       "api_token": "",
  //       "account_number": 1,
  //       "remember_token": "",
  //       "email_verified_at": "2022-06-07T09:48:57.458Z",
  //       "created_at": "2022-06-07T09:49:33.201Z",
  //       "updated_at": "2022-06-07T09:49:33.201Z"
  //     },
  //     {
  //       "id": 2,
  //       "name": "user",
  //       "email": "User@gmaiL.com",
  //       "password": "User@1234",
  //       "role": "USER",
  //       "api_token": "",
  //       "account_number": 1,
  //       "remember_token": "",
  //       "email_verified_at": "2022-06-07T09:48:57.458Z",
  //       "created_at": "2022-06-07T09:50:30.430Z",
  //       "updated_at": "2022-06-07T09:50:30.430Z"
  //     },
  //     {
  //       "id": 3,
  //       "name": "manager",
  //       "email": "Manager@gmaiL.com",
  //       "password": "Manager@1234",
  //       "role": "MANAGER",
  //       "api_token": "",
  //       "account_number": 1,
  //       "remember_token": "",
  //       "email_verified_at": "2022-06-07T09:48:57.458Z",
  //       "created_at": "2022-06-07T09:51:17.594Z",
  //       "updated_at": "2022-06-07T09:51:17.594Z"
  //     },
  //     {
  //       "id": 4,
  //       "name": "informaticien",
  //       "email": "Informaticien@gmaiL.com",
  //       "password": "Informaticien@1234",
  //       "role": "INFORMATICIEN",
  //       "api_token": "",
  //       "account_number": 1,
  //       "remember_token": "",
  //       "email_verified_at": "2022-06-07T09:48:57.458Z",
  //       "created_at": "2022-06-07T09:51:50.693Z",
  //       "updated_at": "2022-06-07T09:51:50.693Z"
  //     }
  //   ];
  //   this.userRepository.save(users);
  // }

  findAll(): Promise<User[]> {
    return this.userRepository.find({  }).catch((error)=>{
      Logger.error(error);

      throw new InternalServerErrorException("Erreur inconnue. Viellez réessaier ou contacter l'administeur si cella persiste")
    });
  }

  findOne(id: number): Promise<User> {
      return this.userRepository.findOneBy( { id:id
      }).catch((e)=>{
        Logger.error(e);

        throw new NotFoundException(
          "L'utilisateur avec l'id " + id + " est introuvable",
        );
      });
    
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne( { where: {email : email}
    }).catch((e)=>{
      Logger.error(e);

      throw new NotFoundException(
        "L'utilisateur avec l'id " + email + " est introuvable",
      );
    });
  
}

  edit(id: number, updateUserDto: User) {
    this.findOne(id);
    updateUserDto.id = id;
    return this.userRepository.save(updateUserDto);
  }

  
  changeWithoutControle(updateUserDto: User) {
    try {
      return this.userRepository.save(updateUserDto);

    } catch (error) {

      throw new BadRequestException("Les données que nous avons réçues ne sont pas celles que nous espérons")
    }
  }

  async update(id: number, updateUserDto: UserDto) {
    return this.userRepository.update(id, {...updateUserDto}).catch((e)=>{
      console.log(e);
      throw new NotFoundException("L'utilisateur spécifier n'existe pas");
    });
  }

  async updateAll() {
   try{ const users: User[] = await this.findAll();
    return this.userRepository.save(users);}catch(e){
      console.log(e);

      throw new BadRequestException("L'utilisateur spécifier n'existe pas");
    }
  }

  remove(id: number) {
    try {
      return this.userRepository.delete(id);

    } catch (error) {
      console.log(error);

      throw new NotFoundException("L'utilisateur spécifier n'existe pas")
    }
  }

  async initOneAdmin() {
    const user :User = new User();
   
    user.name = "Ola";
    user.role = RoleName.USER;
    user.email = "Baba@gmail.com";
    user.password = "Baba@1234";

    await this.userRepository.save(user).catch((error)=>{
      console.log(error);
      throw new BadRequestException("Une erreur est survenue. Veuillez reprendre ou contacter l'administrateur si cela persiste");
    });
  }

  async grandAllRole() {
    const user: User = await this.findOne(1);
    this.userRepository.save(user);
  }
}
