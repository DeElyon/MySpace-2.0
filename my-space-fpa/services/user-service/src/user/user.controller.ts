import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    return this.userService.findAll(limit, offset);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Get('msf/:msfId')
  findByMsfId(@Param('msfId') msfId: string) {
    return this.userService.findByMsfId(msfId);
  }

  @Get('search/:query')
  searchUsers(
    @Param('query') query: string,
    @Query('limit') limit: number = 20,
  ) {
    return this.userService.searchUsers(query, limit);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }

  @Get(':id/profile')
  getProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getProfile(id);
  }

  @Put(':id/profile')
  updateProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() profileData: any,
  ) {
    return this.userService.updateProfile(id, profileData);
  }
}
