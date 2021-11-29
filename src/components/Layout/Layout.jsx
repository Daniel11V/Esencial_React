import { Outlet } from "react-router"

export const Layout = () => {
    const stylePageWrapper = {
        padding: '0 2em',
        marginBottom: '3em'
    }

    return (
        <div style={stylePageWrapper}>
            <Outlet />            
        </div>
    )
}
