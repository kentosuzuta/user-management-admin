"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Divider, Stack } from "@mui/material";

export type UserDetailFooterProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export const UserDetailFooter = ({
  onEdit,
  onDelete,
}: UserDetailFooterProps) => {
  return (
    <Box>
      <Divider sx={{ my: 1.5 }} />

      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1.25}
        sx={{ pb: 0.5 }}
      >
        {onEdit ? (
          <Button variant="contained" startIcon={<EditIcon />} onClick={onEdit}>
            編集
          </Button>
        ) : null}

        {onDelete ? (
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={onDelete}
          >
            削除
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
};
