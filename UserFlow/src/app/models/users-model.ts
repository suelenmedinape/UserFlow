import z from "zod";
import { PhoneType } from "../enum/phone-type";

export interface UsersModel { 
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  phoneType: PhoneType;
}

export type CreateUserDTO = Omit<UsersModel, 'id'>;
export type UpdateUserDTO = Partial<CreateUserDTO>;

export const CreateUserSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('O email deve ser válido'),
  cpf: z.string().min(11, 'O CPF deve ter pelo menos 11 caracteres'),
  phone: z.string().min(11, 'O telefone deve ter pelo menos 11 caracteres'),
  phoneType: z.nativeEnum(PhoneType),
});
export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial();
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;