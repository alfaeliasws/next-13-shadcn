import jwt from "jsonwebtoken";
import { tokenLoginArray } from "@/types/apiType";
import query from "@/config/db";
import { validateFilter } from "@/utils/helper";
// import { verifyPassword } from '@/utils/password';
import { returner } from "@/utils/returner";
import { config } from "@/config/config";
import bcrypt from "bcrypt";

export type registerResult = {
  message: string;
  status: number;
  action: "register";
  success: number;
  data: {} | [];
};

export async function POST(req: Request) {
  const request = await req.json();

  const key: string = config.jwt2;

  const { email, phone, name, password } = request;

  const validate = `SELECT name, email, password, salt FROM users WHERE email='${email}' AND deleted_at IS NULL`;

  const fetchQueryValidate = await query(validate);

  const dataValidate: tokenLoginArray = validateFilter(fetchQueryValidate);

  let storedPassword: string = "";
  let storedSalt: string = "";
  let storedName: string = "";
  let storedEmail: string = "";

  if (
    JSON.stringify(dataValidate) !== JSON.stringify({}) &&
    JSON.stringify(dataValidate) !== JSON.stringify([]) &&
    dataValidate
  ) {
    storedPassword = dataValidate[0].password;
    storedEmail = dataValidate[0].email;
    storedName = dataValidate[0].name;
  } else {
    return returner(
      "Email And Password Doesn't Match",
      0,
      "login/failed1",
      204,
      [],
    );
  }

  const valid = await bcrypt.compare(password, storedPassword);

  if (valid) {
    const encrypted: string | undefined = jwt.sign(
      { name: storedName, email: storedEmail },
      key,
      { algorithm: "HS256", expiresIn: "30m" },
    );

    return returner("Login Succeeded", 1, "login/success", 200, {
      token: encrypted,
    });
  } else {
    return returner("Wrong Password", 0, "login/failed2", 204, []);
  }
}
