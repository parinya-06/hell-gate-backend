export class CreateUserDto {
    readonly username: string;
    readonly password: string;
    readonly firstname: string;
    readonly lastname: string;
    // readonly status: number;
    readonly role: string;
    readonly enabled: Boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
  }
  
  