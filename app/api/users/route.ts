import { USERS } from "../_store/demoStore";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const comInfo = searchParams.get("comInfo");

  if (!comInfo) {
    return Response.json({ message: "comInfo is required" }, { status: 400 });
  }

  return Response.json({ users: USERS });
}
