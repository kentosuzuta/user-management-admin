import { USERS } from "../../_store/demoStore";
import type { UserOutDto } from "@/app/services/users/dto";

type UsersUpdateBody = Partial<Pick<UserOutDto, "name" | "email" | "role" | "status">>;

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const user = USERS.find((u) => u.id === id);

  if (!user) return new Response(null, { status: 404 });
  return Response.json(user);
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const index = USERS.findIndex((u) => u.id === id);

  if (index === -1) return new Response(null, { status: 404 });

  USERS.splice(index, 1);
  return new Response(null, { status: 204 });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const index = USERS.findIndex((u) => u.id === id);
  if (index === -1) return new Response(null, { status: 404 });

  const body = (await request.json()) as UsersUpdateBody;

  USERS[index] = {
    ...USERS[index],
    ...body,
  };

  return Response.json(USERS[index]);
}
