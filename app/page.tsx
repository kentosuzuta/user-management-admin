import { Box, Card, CardContent, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{ minHeight: "100dvh", display: "grid", placeItems: "center", p: 3 }}
    >
      <Card sx={{ width: "100%", maxWidth: 520 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            User Management Admin
          </Typography>
          <Typography sx={{ mt: 1, color: "text.secondary" }}>
            MUI + Next.js(App Router) の土台を構築中です。
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
