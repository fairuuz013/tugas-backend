import type {
  Prisma,
  Profile,
} from "../generated/client";
import type { IProfileRepository } from "../repository/profile.repository";

export interface IProfileService {
  getMyProfile(userId: number): Promise<Profile>;
  create(
    userId: number,
    data: Prisma.ProfileCreateInput
  ): Promise<Profile>;
  update(
    userId: number,
    data: Prisma.ProfileUpdateInput
  ): Promise<Profile>;
}

export class ProfileServices implements IProfileService {
  constructor(private profileRepo: IProfileRepository) {}

  // GET PROFILE BY USER LOGIN
  async getMyProfile(userId: number): Promise<Profile> {
    const profile = await this.profileRepo.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile belum dibuat");
    }

    return profile;
  }

  // CREATE PROFILE (1 USER 1 PROFILE)
  async create(
    userId: number,
    data: Prisma.ProfileCreateInput
  ): Promise<Profile> {
    const exists = await this.profileRepo.findByUserId(userId);

    if (exists) {
      throw new Error("Profile sudah ada");
    }

    return this.profileRepo.create({
      ...data,
      user: { connect: { id: userId } },
    });
  }

  // UPDATE PROFILE
  async update(
    userId: number,
    data: Prisma.ProfileUpdateInput
  ): Promise<Profile> {
    const profile = await this.profileRepo.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile tidak ditemukan");
    }

    return this.profileRepo.update(profile.id, data);
  }
}
