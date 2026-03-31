export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout is just a pass-through. The actual HTML structure is in app/[locale]/layout.tsx
  return children;
}
