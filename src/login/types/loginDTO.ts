export interface LoginDTO {
  username: string;
  password: string;
}

export interface LoginResponse{
   token: string,
   id: number,
   username: string,
   role: string 
}
