export class CreateUserDto {
  userId: string;
  entries: string[];
  invisibleEntries: string[];
}

export class UpdateUserDto {
  entries: string[];
  invisibleEntries: string[];
}
