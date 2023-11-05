import { ReactNode } from "react"
import { AuthProvider } from "./auth-context"
import { QueryClient, QueryClientProvider } from 'react-query'

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        // 让reactQuery正常工作需要引入QueryClientProvider
        <QueryClientProvider client={new QueryClient()}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}

