import { Box } from "@mui/material"
import Header from "../components/Header"
import { ReactNode } from "react"
import { Outlet } from "react-router-dom"


export const AppLayout = () => {
    return (
        <>
            <Header />
            <Box component={'main'} >
                <Outlet />
            </Box>
        </>
    )
}