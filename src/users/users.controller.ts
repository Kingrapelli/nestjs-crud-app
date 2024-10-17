import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() user: User) {
        try{
            return this.usersService.create(user);
        }catch(err){
            console.log("Error while creating new User",err);
            throw new Error(err);
        }
    }

    @Get()
    findAll(){
        try{
            return this.usersService.findAll();
        }catch(err){
            console.log("Error while fetching all users",err);
            throw new Error(err);
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        try{
           return this.usersService.findOne(+id);
        }catch(err){
            console.log("Error while fetching User",err);
            throw new Error(err);
        }
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: Partial<User>) {
        try{
            return this.usersService.update(+id, user);
        }catch(err){
            console.log("Error while updating User",err);
            throw new Error(err);
        }
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        try{
            return this.usersService.remove(+id);
        }catch(err){
            console.log("Error while deleting User",err);
            throw new Error(err);
        }
    }
}
