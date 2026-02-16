import {
  DEFAULT_SETTINGS,
  SETTINGS_BY_COM,
} from "../_store/demoStore";
import type { SettingsOutDto } from "@/app/services/settings/dto";

type SettingsUpdateBody = Partial<SettingsOutDto>;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const comInfo = searchParams.get("comInfo");

  if (!comInfo) {
    return Response.json({ message: "comInfo is required" }, { status: 400 });
  }

  const settings = SETTINGS_BY_COM[comInfo] ?? { ...DEFAULT_SETTINGS };
  SETTINGS_BY_COM[comInfo] = settings;

  return Response.json({ settings });
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const comInfo = searchParams.get("comInfo");

  if (!comInfo) {
    return Response.json({ message: "comInfo is required" }, { status: 400 });
  }

  const body = (await request.json()) as SettingsUpdateBody;
  const current = SETTINGS_BY_COM[comInfo] ?? { ...DEFAULT_SETTINGS };

  SETTINGS_BY_COM[comInfo] = {
    ...current,
    ...body,
  };

  return Response.json({ settings: SETTINGS_BY_COM[comInfo] });
}
