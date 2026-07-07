"use client";
import { ThemeProvider } from 'next-themes';

// Cast to any to satisfy TypeScript children typing differences from the library
const NextThemesProvider = ThemeProvider as unknown as any;

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
      {children}
    </NextThemesProvider>
  );
}