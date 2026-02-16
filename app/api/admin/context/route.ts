import { DEMO_COM_INFO } from "../../_store/demoStore";

export async function GET() {
  return Response.json({ comInfo: DEMO_COM_INFO });
}
