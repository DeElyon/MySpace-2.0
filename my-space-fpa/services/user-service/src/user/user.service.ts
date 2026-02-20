import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(limit = 10, offset = 0) {
    return this.prisma.user.findMany({
      take: limit,
      skip: offset,
      include: {
        skills: true,
        portfolio: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        skills: true,
        experience: true,
        portfolio: true,
        settings: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByMsfId(msfId: string) {
    return this.prisma.user.findUnique({
      where: { msf_id: msfId },
      include: {
        skills: true,
        portfolio: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return user;
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
    return { success: true };
  }

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        skills: true,
        experience: true,
        education: true,
        portfolio: true,
      },
    });
  }

  async updateProfile(userId: string, profileData: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        display_name: profileData.display_name,
        tagline: profileData.tagline,
        about: profileData.about,
        location: profileData.location,
        avatar_url: profileData.avatar_url,
        cover_url: profileData.cover_url,
      },
    });
  }

  async searchUsers(query: string, limit = 20) {
    return this.prisma.user.findMany({
      where: {
        OR: [
          { display_name: { contains: query, mode: 'insensitive' } },
          { username: { contains: query, mode: 'insensitive' } },
          { tagline: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: limit,
      include: {
        skills: true,
      },
    });
  }
}
