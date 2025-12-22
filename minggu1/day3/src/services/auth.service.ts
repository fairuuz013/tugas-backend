import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/env";
import type { IAuthRepository } from "../repository/auth.repository";

export interface IAuthService {
  register(data: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<any>;

  login(data: {
    email: string;
    password: string;
  }): Promise<any>;
}

export class AuthServices implements IAuthService {
  constructor(private authRepo: IAuthRepository) {}

  async register(data: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }) {
    const existingUser = await this.authRepo.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.authRepo.createUser({
      username: data.username,
      email: data.email,
      password_hash: hashedPassword,
      role: data.role ?? "USER",
    });

    return {
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.authRepo.findByEmail(data.email);
    if (!user) {
      throw new Error("Email atau password salah");
    }

    const isValid = await bcrypt.compare(data.password, user.password_hash);
    if (!isValid) {
      throw new Error("Email atau password salah");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      user: {
        email: user.email,
        username: user.username,
        role: user.role,
      },
      token,
    };
  }
}
