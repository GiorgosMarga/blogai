import prisma from "../db/client";
import {
  DBConnectionError,
  BadRequestError,
  NotFoundError,
} from "@giorgosmarga/errors";
import { Password } from "./password";
import { transporter } from "./email";
import type { User } from "@prisma/client";
import crypto from "crypto";
import { TRPCError } from "@trpc/server";
interface CreateUserInput {
  email: string;
  password: string;
  fullName: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

export class UserClass {
  static async fetchUserByEmail(email: string): Promise<User | null> {
    let fetchedUser: User | null;

    try {
      fetchedUser = await prisma.user.findUnique({ where: { email } });
    } catch (error) {
      throw new DBConnectionError("DB_ERROR while fetching the user.");
    }
    return fetchedUser;
  }
  static async fetchUserById(id: string): Promise<User> {
    let fetchedUser: User | null;

    try {
      fetchedUser = await prisma.user.findFirst({ where: { id } });
    } catch (error) {
      throw new DBConnectionError("DB_ERROR while fetching the user.");
    }
    if (!fetchedUser) {
      throw new NotFoundError(`User with id: ${id} was not found.`);
    }
    return fetchedUser;
  }
  static async createUser(createUserInput: CreateUserInput): Promise<User> {
    let createdUser: User;
    const emailAlreadyExists = await this.fetchUserByEmail(
      createUserInput.email
    );
    if (emailAlreadyExists) {
      throw new BadRequestError(
        "This email is already taken. Please try another one."
      );
    }
    createUserInput.password = Password.hashPassword(createUserInput.password);
    try {
      createdUser = await prisma.user.create({ data: createUserInput });
    } catch (error) {
      console.log(error);
      throw new DBConnectionError("DB_ERROR while creating the user.");
    }
    return createdUser;
  }
  static async loginUser(loginUserInput: LoginUserInput): Promise<User> {
    const user = await this.fetchUserByEmail(loginUserInput.email);
    if (!user) {
      throw new BadRequestError("Bad credentials. Please try again");
    }
    const isMatch = Password.comparePasswords(
      loginUserInput.password,
      user.password
    );
    if (!isMatch) {
      throw new BadRequestError("Bad credentials. Please try again");
    }
    return user;
  }
  static async deleteUser(email: string): Promise<User> {
    let user = await this.fetchUserByEmail(email);
    if (!user) {
      throw new NotFoundError("Use does not exist.");
    }
    try {
      user = await prisma.user.delete({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new DBConnectionError("DB_ERROR deleting user.");
    }
    return user;
  }
  static async setVerificationCode(email: string): Promise<string> {
    const user = await this.fetchUserByEmail(email);
    if (!user) {
      throw new NotFoundError("User does not exist.");
    }
    const newVerificationCode = crypto.randomBytes(20).toString("hex");
    const newVerificationCodeTimestamp = new Date(Date.now() + 3 * 3600000);
    try {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          verificationId: newVerificationCode,
          verificationIdTimestamp: newVerificationCodeTimestamp,
        },
      });
    } catch (err) {
      throw new DBConnectionError("DB_ERROR while setting verification...");
    }
    return newVerificationCode;
  }
  static async sendVerificationEmail(user: User) {
    try {
      await transporter.sendMail({
        from: '"BlogAI <foo@example.com>', // sender address
        to: user.email, // list of receivers
        subject: "Verify your BlogAI account ✔", // Subject line
        text: `Hello ${user.fullName}, 
                Click the link below to verify your account.
                If you did not request this, then you can ignore this email.
                link: http://localhost:3000/verifyAccount?id=${user.id}&verificationId=${user.verificationId}`, // plain text body

        html: `
                <h1>Hello ${user.fullName}</h1>
                <p>Click the button to verify your account.If you did not request this, please ignore this message</p>
                <a href="http://localhost:3000/verifyAccount?id=${user.id}&verificationId=${user.verificationId}"/>Verify Account</a>`, // html body
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Email was not sent.",
      });
    }
    return true;
  }
}
