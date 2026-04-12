export interface AuthUser {
  id: number;
  username: string;
  nama_lengkap: string;
  role: "admin" | "petani";
}
