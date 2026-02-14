"use client";

import type { UserOutDto } from "@/app/services/users/dto";
import { Alert, Snackbar, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { UserDeleteDialog } from "./components/UserDeleteDialog";
import { UserDetailFooter } from "./components/UserDetailFooter";
import { UserDetailHeader } from "./components/UserDetailHeader";
import { UserDetailSummaryCard } from "./components/UserDetailSummaryCard";
import { UserEditDialog } from "./components/UserEditDialog";
import { useUserDeleteDialogHandler } from "./hooks/useUserDeleteDialogHandler";
import { useUserEditDialogHandler } from "./hooks/useUserEditDialogHandler";

export type UserDetailContentProps = {
  user: UserOutDto;
  onRefetch: () => Promise<void>;
};

export const UserDetailContent = ({
  user,
  onRefetch,
}: UserDetailContentProps) => {
  const router = useRouter();

  const deleteDialog = useUserDeleteDialogHandler({
    userId: user.id,
    onDeleted: () => router.push("/admin/users"),
  });

  const editDialog = useUserEditDialogHandler({
    user,
    onSaved: async () => {
      await onRefetch();
    },
  });

  return (
    <>
      <Stack spacing={2.5}>
        <UserDetailHeader
          user={user}
          changedFields={editDialog.changedFields}
          onBack={() => router.push("/admin/users")}
        />

        {editDialog.error ? (
          <Alert severity="error">
            更新に失敗しました: {String(editDialog.error.message)}
          </Alert>
        ) : null}

        {deleteDialog.error ? (
          <Alert severity="error">
            削除に失敗しました: {String(deleteDialog.error.message)}
          </Alert>
        ) : null}

        <UserDetailSummaryCard
          user={user}
          changedFields={editDialog.changedFields}
        />

        <UserDetailFooter
          onEdit={editDialog.openEdit}
          onDelete={deleteDialog.openDelete}
        />

        <UserDeleteDialog
          isOpen={deleteDialog.isDeleteOpen}
          onClose={deleteDialog.closeDelete}
          onConfirm={deleteDialog.confirmDelete}
          userName={user.name}
          isSubmitting={deleteDialog.isDeleting}
        />

        <UserEditDialog
          isOpen={editDialog.isEditOpen}
          user={user}
          values={editDialog.values}
          onChange={editDialog.changeValue}
          onClose={editDialog.closeEdit}
          onConfirm={editDialog.confirmEdit}
          isSubmitting={editDialog.isSaving}
        />
      </Stack>

      <Snackbar
        open={editDialog.isSnackbarOpen}
        autoHideDuration={3000}
        onClose={editDialog.closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={editDialog.closeSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          更新しました
        </Alert>
      </Snackbar>
    </>
  );
};
