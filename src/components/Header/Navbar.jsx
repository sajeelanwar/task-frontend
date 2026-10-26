import { Button, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/Auth";

export default function Navbar() {

    const { isAuth, handleLogout } = useAuth()
    const navigate = useNavigate()

    return (
        <nav className="w-full shadow-sm" style={{ backgroundColor: "#1d3557" }}>
            <div className="w-4/5 mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Space size="large">
                        <h1 className="text-xl font-bold text-white">
                            <Link to="/" className="text-white!  text-base text-2xl!">Home</Link>
                        </h1>
                    </Space>

                </div>
                <div className="flex items-center gap-3">
                    {isAuth
                        ? <>
                            <Button type="primary" size="large" className="rounded-md bg-green-600! hover:bg-green-700!" onClick={() => { navigate("/tasks") }}>Tasks</Button>
                            <Button type="primary" size="large" danger onClick={handleLogout}>Logout</Button>
                        </>
                        : <>
                            <Button type="primary" size="large" className="rounded-md bg-green-600! hover:bg-green-700!" onClick={() => { navigate("/auth/login") }}>Login</Button>
                            <Button type="primary" size="large" className="rounded-md bg-blue-400! hover:bg-blue-500!" onClick={() => { navigate("/auth/register") }}>Register</Button>
                        </>
                    }
                </div>
            </div>
        </nav>
    );
}
