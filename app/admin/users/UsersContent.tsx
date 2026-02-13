"use client";

import {
  USER_ROLE_OPTIONS,
  USER_STATUS_OPTIONS,
} from "@/app/services/users/constants";
import type {
  UserOutDto,
  UserRoleOutDto,
  UserStatusOutDto,
} from "@/app/services/users/dto";
import { formatDateYmd } from "@/app/utils/utils";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { useMemo } from "react";
import { UserDetailConfirmDialog } from "./components/UserDetailConfirmDialog";
import { useUserDetailNavigationConfirmHandler } from "./hooks/useUserDetailNavigationConfirmHandler";
import { useUsersFilterHandler } from "./hooks/useUsersFilterHandler";
import { useUsersListHandler } from "./hooks/useUsersListHandler";
import { getUserStatusChip } from "./utils/status";

export const UsersContent = () => {
  const { rows, isLoading, error } = useUsersListHandler();
  const {
    inputValue,
    role,
    status,
    filteredRows,
    filteredCount,
    totalCount,
    handleChange,
    handleClear,
    handleRoleChange,
    handleStatusChange,
  } = useUsersFilterHandler(rows);

  const {
    confirmUser,
    handleRowClick,
    handleCloseConfirmDialog,
    handleConfirmGoDetail,
  } = useUserDetailNavigationConfirmHandler();

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

  const hasFilter = inputValue.trim() !== "" || role !== "" || status !== "";

  return (
    <Stack spacing={2.5}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Users
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
          ユーザー一覧
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                label="Keyword"
                placeholder="name / email"
                value={inputValue}
                onChange={handleChange}
                size="small"
                fullWidth
                disabled={isLoading}
              />

              <TextField
                label="Role"
                select
                size="small"
                value={role}
                disabled={isLoading}
                sx={{ width: 160 }}
                onChange={(e) =>
                  handleRoleChange(e.target.value as UserRoleOutDto | "")
                }
              >
                <MenuItem value="">All</MenuItem>
                {USER_ROLE_OPTIONS.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Status"
                select
                size="small"
                value={status}
                disabled={isLoading}
                sx={{ width: 180 }}
                onChange={(e) =>
                  handleStatusChange(e.target.value as UserStatusOutDto | "")
                }
              >
                <MenuItem value="">All</MenuItem>
                {USER_STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                variant="contained"
                disabled={
                  isLoading ||
                  (inputValue.trim() === "" && role === "" && status === "")
                }
                onClick={handleClear}
                sx={{ whiteSpace: "nowrap" }}
              >
                クリア
              </Button>
            </Stack>

            {error && (
              <Alert severity="error">
                ユーザーの取得に失敗しました: {String(error.message ?? error)}
              </Alert>
            )}

            <Box sx={{ width: "100%", height: 620 }}>
              <DataGrid
                rows={filteredRows}
                columns={columns}
                getRowId={(row) => row.id}
                disableRowSelectionOnClick
                onRowClick={handleRowClick}
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
                  "& .MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  "& .MuiDataGrid-cell:focus-within": {
                    outline: "none",
                  },
                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.08)",
                  },
                }}
              />
            </Box>

            <Stack direction="row" justifyContent="flex-end">
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {hasFilter
                  ? `絞り込み: ${filteredCount} / ${totalCount} 件`
                  : `全件: ${totalCount} 件`}
              </Typography>
            </Stack>
          </Stack>

          <UserDetailConfirmDialog
            open={confirmUser !== null}
            user={confirmUser}
            onClose={handleCloseConfirmDialog}
            onConfirm={handleConfirmGoDetail}
          />
        </CardContent>
      </Card>
    </Stack>
  );
};
