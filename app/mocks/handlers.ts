import { http, HttpResponse } from "msw";
import { UserOutDto } from "../services/users/dto";

const USERS: UserOutDto[] = [
  {
    id: "u_001",
    name: "テスト 太郎",
    email: "taro@example.com",
    role: "admin",
    status: "active",
    createdAt: "2026-02-01T10:00:00.000Z",
  },
  {
    id: "u_002",
    name: "鈴木 花子",
    email: "hanako@example.com",
    role: "member",
    status: "invited",
    createdAt: "2026-02-03T12:30:00.000Z",
  },
  {
    id: "u_003",
    name: "伊藤 健",
    email: "ken@example.com",
    role: "viewer",
    status: "suspended",
    createdAt: "2026-02-05T08:15:00.000Z",
  },

  {
    id: "u_004",
    name: "山本 一郎",
    email: "ichiro@example.com",
    role: "member",
    status: "active",
    createdAt: "2026-02-06T09:10:00.000Z",
  },
  {
    id: "u_005",
    name: "佐藤 美咲",
    email: "misaki@example.com",
    role: "member",
    status: "active",
    createdAt: "2026-02-07T14:22:00.000Z",
  },
  {
    id: "u_006",
    name: "高橋 翔",
    email: "sho@example.com",
    role: "viewer",
    status: "invited",
    createdAt: "2026-02-08T16:45:00.000Z",
  },
  {
    id: "u_007",
    name: "中村 優",
    email: "yu@example.com",
    role: "viewer",
    status: "active",
    createdAt: "2026-02-09T11:05:00.000Z",
  },
  {
    id: "u_008",
    name: "小林 直樹",
    email: "naoki@example.com",
    role: "member",
    status: "suspended",
    createdAt: "2026-02-10T13:40:00.000Z",
  },
  {
    id: "u_009",
    name: "加藤 彩",
    email: "aya@example.com",
    role: "admin",
    status: "active",
    createdAt: "2026-02-11T18:00:00.000Z",
  },
  {
    id: "u_010",
    name: "吉田 陸",
    email: "riku@example.com",
    role: "viewer",
    status: "invited",
    createdAt: "2026-02-12T20:12:00.000Z",
  },

  {
    id: "u_011",
    name: "松本 大輔",
    email: "daisuke@example.com",
    role: "member",
    status: "active",
    createdAt: "2026-02-13T09:30:00.000Z",
  },
  {
    id: "u_012",
    name: "井上 真央",
    email: "mao@example.com",
    role: "viewer",
    status: "active",
    createdAt: "2026-02-14T10:10:00.000Z",
  },
  {
    id: "u_013",
    name: "木村 拓海",
    email: "takumi@example.com",
    role: "member",
    status: "invited",
    createdAt: "2026-02-15T12:00:00.000Z",
  },
  {
    id: "u_014",
    name: "林 さくら",
    email: "sakura@example.com",
    role: "viewer",
    status: "suspended",
    createdAt: "2026-02-16T08:50:00.000Z",
  },
  {
    id: "u_015",
    name: "清水 大和",
    email: "yamato@example.com",
    role: "admin",
    status: "active",
    createdAt: "2026-02-17T17:25:00.000Z",
  },
];

export const handlers = [
  http.get("/api/users", () => {
    return HttpResponse.json({ users: USERS });
  }),
];
