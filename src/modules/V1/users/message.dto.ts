import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class MessageDto {
  @IsNotEmpty({ message: "Id do usuário é obrigatório." })
  @IsInt()
  userId: string;

  @IsNotEmpty({ message: "Menssagem é obrigatorio" })
  @IsString()
  @MaxLength(100, { message: "É permitido no máximo 100 caracteres." })
  message: string;
}
