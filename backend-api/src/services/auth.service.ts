import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { ConflictError, UnauthorizedError } from "../utils/errors";
import type { RegisterInput, LoginInput } from "../schemas/auth.schema";

const SALT_ROUNDS = 10;

/**
 * Handles user registration and login.
 * Passwords are hashed with bcrypt; JWTs are signed with the app secret.
 */
export class AuthService {
  /**
   * Register a new user.
   * Hashes the password and persists the user in the database.
   * @throws ConflictError if the email is already taken.
   */
  async register(data: RegisterInput) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictError("A user with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Authenticate a user and return a signed JWT.
   * @throws UnauthorizedError if credentials are invalid.
   */
  async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const expiresIn = process.env.JWT_EXPIRATION || "1h";

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] },
    );

    const { password: _, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword,
    };
  }
}

export const authService = new AuthService();

