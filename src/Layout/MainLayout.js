import Header from "components/layout/Headers/Header"
const MainLayout = (props) => {
    return (
        <>
            <Header />
            <main>
                {props.children}
            </main>
        </>
    )
}

export default MainLayout