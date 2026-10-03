"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { AppProvider } from "@/lib/app-context";
import { TranslationsProvider } from "@/lib/translations-context";
import { Toaster } from "@/components/ui/toast";
import { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [Ready, setReady] = useState(false);

  useEffect(() => {
    store.dispatch({ type: "auth/restoreAuth" });
    setReady(true);
  }, []);

  if (!Ready) return null;

  return (
    <Provider store={store}>
      <TranslationsProvider>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </TranslationsProvider>
    </Provider>
  );
}
