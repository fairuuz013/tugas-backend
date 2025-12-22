import type {
  Prisma,
  PrismaClient,
  Profile,
} from "../generated/client";

export interface IProfileRepository {
  findByUserId(userId: number): Promise<Profile | null>;
  findById(id: number): Promise<Profile | null>;
  create(data: Prisma.ProfileCreateInput): Promise<Profile>;
  update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile>;
}

export class ProfileRepository implements IProfileRepository {
  constructor(private prisma: PrismaClient) {}

  async findByUserId(userId: number): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { userId },
      include: { user: true },
    });
  }

  async findById(id: number): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async create(
    data: Prisma.ProfileCreateInput
  ): Promise<Profile> {
    return this.prisma.profile.create({ data });
  }

  async update(
    id: number,
    data: Prisma.ProfileUpdateInput
  ): Promise<Profile> {
    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }
}
