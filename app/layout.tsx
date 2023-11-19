import type { Metadata } from "next";
import ThemeRegistry from "./theme-registry";

export const metadata: Metadata = {
  title: "トラッシュトラッカー",
  description: "ゴミの日が一目でわかるサイトです",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
