"use client";

import type { UserOutDto } from "@/app/services/users/dto";
import { useMemo } from "react";

type DistributionRow = {
  key: string;
  label: string;
  count: number;
  ratio: number;
};

export const useDashboardHandler = (users: UserOutDto[]) => {
  const {
    total,
    statusCount,
    roleCount,
    recentUsers,
    newUsersLast7Days,
    activeRate,
    roleDistribution,
    statusDistribution,
  } = useMemo(() => {
    const nextStatusCount = {
      active: 0,
      invited: 0,
      suspended: 0,
    };
    const nextRoleCount = {
      admin: 0,
      member: 0,
      viewer: 0,
    };

    for (const user of users) {
      nextStatusCount[user.status] += 1;
      nextRoleCount[user.role] += 1;
    }

    const nextTotal = users.length;

    const sortedRecentUsers = [...users]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 5);

    const latestTimestamp = sortedRecentUsers.length
      ? Date.parse(sortedRecentUsers[0].createdAt)
      : 0;
    const sevenDaysAgo = latestTimestamp - 7 * 24 * 60 * 60 * 1000;
    const nextNewUsersLast7Days = users.filter((user) => {
      const timestamp = Date.parse(user.createdAt);
      if (Number.isNaN(timestamp)) return false;
      return timestamp >= sevenDaysAgo && timestamp <= latestTimestamp;
    }).length;

    const toRatio = (count: number) =>
      nextTotal === 0 ? 0 : Math.round((count / nextTotal) * 100);

    const nextRoleDistribution: DistributionRow[] = [
      {
        key: "admin",
        label: "Admin",
        count: nextRoleCount.admin,
        ratio: toRatio(nextRoleCount.admin),
      },
      {
        key: "member",
        label: "Member",
        count: nextRoleCount.member,
        ratio: toRatio(nextRoleCount.member),
      },
      {
        key: "viewer",
        label: "Viewer",
        count: nextRoleCount.viewer,
        ratio: toRatio(nextRoleCount.viewer),
      },
    ];

    const nextStatusDistribution: DistributionRow[] = [
      {
        key: "active",
        label: "Active",
        count: nextStatusCount.active,
        ratio: toRatio(nextStatusCount.active),
      },
      {
        key: "invited",
        label: "Invited",
        count: nextStatusCount.invited,
        ratio: toRatio(nextStatusCount.invited),
      },
      {
        key: "suspended",
        label: "Suspended",
        count: nextStatusCount.suspended,
        ratio: toRatio(nextStatusCount.suspended),
      },
    ];

    return {
      total: nextTotal,
      statusCount: nextStatusCount,
      roleCount: nextRoleCount,
      recentUsers: sortedRecentUsers,
      newUsersLast7Days: nextNewUsersLast7Days,
      activeRate: toRatio(nextStatusCount.active),
      roleDistribution: nextRoleDistribution,
      statusDistribution: nextStatusDistribution,
    };
  }, [users]);

  return {
    total,
    statusCount,
    roleCount,
    recentUsers,
    newUsersLast7Days,
    activeRate,
    roleDistribution,
    statusDistribution,
  };
};
