import styles from "@/styles/components/bottombanner.module.scss"
import { Container, Grid } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import kz from '@/locales/components/bottombanner/kz'
import ru from '@/locales/components/bottombanner/ru'
import { useRouter } from "next/router"
const BottomBanner = () => {
    const router = useRouter()
    const { locale } = router
    const lang = locale === 'kz' ? kz : ru

    return (
        <>
            <div className={styles.bottombanner}>
                <section>
                    <Container>
                        <div className={styles.banner_hold}>
                            <Grid container spacing={2} >
                                <Grid item xs={12} md={6}>
                                    <div className={styles.left_img_hold}>
                                        <Image
                                            src={'/img/banner_bottom_woman.png'}
                                            width={500}
                                            height={300}
                                            alt="woman with a phone png"
                                            style={{ width: '100%', height: '100%', display: 'block' }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className={styles.info_hold}>
                                        <div className={styles.title_hold}>
                                            <h3>{lang.connect}</h3>
                                            <Image src={'/almatv_white.svg'} width={100} height={40} alt="almatv logo" />
                                        </div>
                                        <p className={styles.description}>
                                            {lang.desc}
                                        </p>
                                        <div className={styles.apps_list}>
                                            <Link href={'/'}>
                                                <Image src={'/img/appstore.svg'} width={100} height={30} alt="app store svg image" />
                                            </Link>

                                            <Link href={'/'}>
                                                <Image src={'/img/googleplay.svg'} width={100} height={30} alt="google play svg image" />
                                            </Link>

                                            <Link href={'/'}>
                                                <Image src={'/img/appgallery.svg'} width={100} height={30} alt="app gallery svg image" />
                                            </Link>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default BottomBanner