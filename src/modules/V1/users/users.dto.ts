import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UserDto {
  @IsNotEmpty({ message: "Primeiro nome é obrigatorio" })
  @IsString()
  @MaxLength(35, { message: "É permitido no máximo 35 caracteres." })
  firstName: string;

  @IsNotEmpty({ message: "Último nome é obrigatorio" })
  @IsString()
  @MaxLength(35, { message: "É permitido no máximo 35 caracteres." })
  lastName: string;

  @IsNotEmpty({ message: "Idade é obrigatorio" })
  @IsNumber()
  age: number;

  @IsNotEmpty({ message: "Email é obrigatório." })
  @IsEmail()
  @MaxLength(100, { message: "É permitido no máximo 100 caracteres." })
  email: string;

  @IsNotEmpty({ message: "Senha é obrigatório." })
  @IsString()
  @MinLength(8, { message: "É necessário no mínimo 8 caracteres." })
  password: string;
}
