import Image from "next/image"
import styles from "@/styles/components/onlinecinema.module.scss"
import { Container, Grid } from "@mui/material"
import Link from "next/link"
import classNames from "classnames"
import kz from '@/locales/components/onlinecinema/kz'
import ru from '@/locales/components/onlinecinema/ru'
import { useRouter } from "next/router"

const OnlineCinema = () => {

    const router = useRouter()
    const { locale } = router
    const lang = locale === 'kz' ? kz : ru

    return (
        <>
            <div className={styles.online_cinema}>
                <section>
                    <Container>
                        <div className={styles.title_hold}>
                            <h3>{lang.title}</h3>
                            <Image src={'/icons/arrow_right.svg'} width={35} height={35} alt="arrow down icon" />
                        </div>

                        <p className={styles.section_description}>
                            {lang.desc}
                        </p>

                        <Grid container spacing={4} justifyContent="center">
                            <Grid item xs={12} sm={6} md={4}>
                                <div className={classNames({ [styles.card]: true, [styles.megogo]: true })}>

                                    <div className={styles.card_info}>
                                        <div className={styles.title_img}>
                                            <Image
                                                src={"/img/online_cinema/oc_megogo.svg"}
                                                width={200}
                                                height={50}
                                                alt="megogo"
                                            />
                                        </div>

                                        <div className={styles.description}>
                                            {lang.megogo}
                                        </div>

                                        <div className={styles.btn_link}>
                                            <Link href={"/"} className="primary_link">
                                                <span className={styles.link_btn}>
                                                    {lang.btn}
                                                </span>
                                            </Link>
                                        </div>

                                    </div>

                                    <div className={styles.lower_img}>
                                        <Image
                                            src={"/img/online_cinema/filming_card.svg"}
                                            width={230}
                                            height={130}
                                            alt="filming card"
                                            style={{ display: "block", width: "100%" }}
                                        />
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <div className={classNames({ [styles.card]: true, [styles.qaz]: true })}>

                                    <div className={styles.card_info}>
                                        <div className={styles.title_img}>
                                            <Image
                                                src={"/img/online_cinema/oc_qaz.svg"}
                                                width={200}
                                                height={50}
                                                alt="qazaqsha"
                                            />
                                        </div>

                                        <div className={styles.description}>
                                            {lang.qazaqsha}
                                        </div>

                                        <div className={styles.btn_link}>
                                            <Link href={"/"} className="primary_link">
                                                <span className={styles.link_btn}>
                                                    {lang.btn}
                                                </span>
                                            </Link>
                                        </div>

                                    </div>

                                    <div className={styles.lower_img}>
                                        <Image
                                            src={"/img/online_cinema/kobyz.svg"}
                                            width={230}
                                            height={130}
                                            alt="filming card"
                                            style={{ display: "block", width: "100%" }}
                                        />
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <div className={classNames({ [styles.card]: true, [styles.amedia]: true })}>

                                    <div className={styles.card_info}>
                                        <div className={styles.title_img}>
                                            <Image
                                                src={"/img/online_cinema/oc_amedia.svg"}
                                                width={200}
                                                height={50}
                                                alt="amediateka"
                                            />
                                        </div>

                                        <div className={styles.description}>
                                            {lang.amedia}
                                        </div>

                                        <div className={styles.btn_link}>
                                            <Link href={"/"} className="primary_link">
                                                <span className={styles.link_btn}>
                                                    {lang.btn}
                                                </span>
                                            </Link>
                                        </div>

                                    </div>

                                    <div className={styles.lower_img}>
                                        <Image
                                            src={"/img/online_cinema/chick.svg"}
                                            width={230}
                                            height={190}
                                            alt="filming card"
                                            style={{ display: "block", width: "100%" }}
                                        />
                                    </div>

                                </div>
                            </Grid>
                        </Grid>

                    </Container>
                </section>
            </div >
        </>
    )
}

export default OnlineCinema