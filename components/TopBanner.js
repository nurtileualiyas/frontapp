import styles from "@/styles/components/topbanner.module.scss"
import { Container } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import kz from '@/locales/components/topbanner/kz'
import ru from '@/locales/components/topbanner/ru'

const TopBanner = () => {

    const router = useRouter()
    const { locale } = router
    const lang = locale === 'kz' ? kz : ru

    return (
        <>
            <div className={styles.topbanner}>
                <section>
                    <Container>
                        <div className={styles.banner_hold}>
                            <div className={styles.info_hold}>
                                <div className={styles.title_hold}>
                                    <h3>{lang.title}</h3>
                                    <Image src={'/almatv_white.svg'} width={100} height={40} alt="almatv logo" />
                                </div>
                                <p className={styles.description}>
                                    {lang.desc}
                                </p>
                                <div className={styles.link_btn_hold}>
                                    <Link href={'/'} className="primary_link">
                                        <span className={styles.link_btn}>
                                            {lang.btn}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default TopBanner