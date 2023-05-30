import TopLine from "@/components/header/TopLine"
import NavBar from "@/components/header/NavBar"
import Footer from "@/components/Footer"
import Support from "@/components/Support"
import { CityProvider } from '@/context/citycontext'

const PublicLayout = (props) => {

    return (
        <>
            <CityProvider>
                <div style={{ position: 'relative' }}>
                    <TopLine />
                    <NavBar />
                    {props.children}
                    <Footer />
                    <Support />
                </div>
            </CityProvider>
        </>
    )
}

export default PublicLayout