import { UserOutDto } from "./dto";

export const mapUserOutDtoToUser = (dto: UserOutDto): UserOutDto => {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    role: dto.role,
    status: dto.status,
    createdAt: dto.createdAt,
  };
};
