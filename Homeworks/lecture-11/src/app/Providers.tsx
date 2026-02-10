"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/lib/createEmotionCache";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const clientSideEmotionCache = createEmotionCache();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CacheProvider value={clientSideEmotionCache}>
            <AppRouterCacheProvider>
                <Provider store={store}>{children}</Provider>
            </AppRouterCacheProvider>
        </CacheProvider>
    );
}
