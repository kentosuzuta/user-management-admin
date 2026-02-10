import { Card, CardContent, Typography } from "@mui/material";

export default function AdminPage() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Dashboard
        </Typography>
        <Typography sx={{ mt: 1, color: "text.secondary" }}>
          管理画面の土台ができました。
        </Typography>
      </CardContent>
    </Card>
  );
}
