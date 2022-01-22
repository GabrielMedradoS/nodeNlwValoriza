import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UsersRepositories);

    // Verificar se email existe
    const user = await userRepositories.findOne({
      email,
    });
    if (!user) {
      throw new Error("Email ou Password incorrect");
    }

    // Verificar se senha está correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email ou Password incorrect");
    }

    // Gerar token
    const token = sign(
      {
        email: user.email,
      },
      process.env.MD5_HASH,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
