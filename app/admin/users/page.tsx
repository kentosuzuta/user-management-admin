"use client";

import {
  UserOutDto,
  UsersListResponseOutDto,
  UserStatusOutDto,
} from "@/app/services/users/dto";
import { usersService } from "@/app/services/users/service";
import { formatDateYmd } from "@/app/utils/utils";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { getUserStatusChip } from "./utils/status";

export default function UsersPage() {
  const [query, setQuery] = useState("");

  const { data, isLoading, error } = useSWR<UsersListResponseOutDto>(
    ["users", query],
    ([, q]) => usersService.list({ query: String(q) }),
    { revalidateOnFocus: false },
  );

  const rows: UserOutDto[] = data?.users ?? [];

  const columns = useMemo<GridColDef<UserOutDto>[]>(
    () => [
      { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
      { field: "email", headerName: "Email", flex: 1, minWidth: 220 },
      { field: "role", headerName: "Role", width: 140 },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        renderCell: (
          params: GridRenderCellParams<UserOutDto, UserStatusOutDto>,
        ) => {
          const meta = getUserStatusChip(params.value ?? "active");
          return <Chip size="small" label={meta.label} color={meta.color} />;
        },
        sortable: false,
      },
      {
        field: "createdAt",
        headerName: "Created",
        width: 140,
        valueFormatter: (value) => formatDateYmd(String(value)),
      },
    ],
    [],
  );

  return (
    <Stack spacing={2.5}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Users
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
          ユーザー一覧（検索・並び替え・ページネーションの土台）
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="Search"
              placeholder="name / email / role / status"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="small"
              fullWidth
              disabled={isLoading}
            />

            {error && (
              <Alert severity="error">
                ユーザーの取得に失敗しました: {String(error.message ?? error)}
              </Alert>
            )}

            <Box sx={{ width: "100%", height: 620 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10, 25]}
                loading={isLoading}
                slots={{
                  loadingOverlay: () => (
                    <Box sx={{ display: "grid", placeItems: "center", p: 3 }}>
                      <CircularProgress size={28} />
                    </Box>
                  ),
                }}
                hideFooterPagination
                initialState={{
                  sorting: {
                    sortModel: [{ field: "createdAt", sort: "desc" }],
                  },
                }}
                sx={{
                  border: 0,
                  "& .MuiDataGrid-columnHeaders": {
                    bgcolor: "background.default",
                  },
                }}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
