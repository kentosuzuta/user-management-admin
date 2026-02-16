import { DEMO_EMAIL, DEMO_PASSWORD, DEMO_TOKEN } from "../../_store/demoStore";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBody;

  if (body.email === DEMO_EMAIL && body.password === DEMO_PASSWORD) {
    return Response.json({ accessToken: DEMO_TOKEN });
  }

  return Response.json({ message: "Invalid credentials" }, { status: 401 });
}
