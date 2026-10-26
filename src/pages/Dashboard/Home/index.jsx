import Footer from "../../../components/Footer"
import Header from "../../../components/Header"

const Home = () => {
    return (
        <>
            <Header />
            <main className="w-4/5 mx-auto px-6 py-4">
                <div className="flex items-center justify-center h-[80vh]">
                    <h1 className="text-3xl font-bold text-center">Welcome to Task Management System</h1>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Home