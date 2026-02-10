import { Card, CardContent, Typography } from "@mui/material";

export default function SettingsPage() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Settings
        </Typography>
        <Typography sx={{ mt: 1, color: "text.secondary" }}>
          設定ページ（仮）
        </Typography>
      </CardContent>
    </Card>
  );
}
