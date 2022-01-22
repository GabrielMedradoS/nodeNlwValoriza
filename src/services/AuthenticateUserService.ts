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
      "1e5c2308984a1d7b16e187448bdc96e4",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
