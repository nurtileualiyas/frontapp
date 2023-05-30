import Image from "next/image"
import styles from "@/styles/components/hitsale.module.scss"
import { Container, Grid } from "@mui/material"
import kz from '@/locales/components/hitsale/kz'
import ru from '@/locales/components/hitsale/ru'
import { useRouter } from "next/router"

const HitSale = () => {
    const router = useRouter()
    const { locale } = router
    const lang = locale === 'kz' ? kz : ru
    return (
        <>
            <div className={styles.hitsale}>
                <section>
                    <Container>
                        <div className={styles.title_hold}>
                            <h3>{lang.title}</h3>
                            <Image src={'/icons/arrow_right.svg'} width={35} height={35} alt="arrow down icon" />
                        </div>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <div className={styles.card}>
                                    <div>
                                        <Image src={"/img/mix100.svg"} width={140} height={50} alt="almatv mix 100 svg" />
                                    </div>

                                    <div className={styles.info_hold}>
                                        <div className={styles.info_details}>
                                            <div>
                                                <div className={styles.delails_number}>100</div>
                                                <div className={styles.delails_unit}>{lang.Mb_Sec}</div>
                                            </div>
                                            <div>
                                                <div className={styles.delails_number}>150+</div>
                                                <div className={styles.delails_unit}>{lang.tv_channels}</div>
                                            </div>
                                        </div>
                                        <div className={styles.info_price}>
                                            От 4 890 ₸
                                        </div>
                                    </div>

                                    <hr className="hr" />

                                    <div className={styles.compare_toggler}>
                                        <Image src={"/icons/add_to_comparing.svg"} width={20} height={20} alt="toggle compare icon" />
                                        <div>
                                            {lang.compare}
                                        </div>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div className={styles.card}>
                                    <div>
                                        <Image src={"/img/mix500.svg"} width={140} height={50} alt="almatv mix 500 svg" />
                                    </div>

                                    <div className={styles.info_hold}>
                                        <div className={styles.info_details}>
                                            <div>
                                                <div className={styles.delails_number}>500</div>
                                                <div className={styles.delails_unit}>{lang.Mb_Sec}</div>
                                            </div>
                                            <div>
                                                <div className={styles.delails_number}>180+</div>
                                                <div className={styles.delails_unit}>{lang.tv_channels}</div>
                                            </div>
                                        </div>
                                        <div className={styles.info_price}>
                                            От 5 690 ₸
                                        </div>
                                    </div>

                                    <hr className="hr" />

                                    <div className={styles.compare_toggler}>
                                        <Image src={"/icons/add_to_comparing.svg"} width={20} height={20} alt="toggle compare icon" />
                                        <div>
                                            {lang.compare}
                                        </div>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div className={styles.card}>
                                    <div>
                                        <Image src={"/img/mixstan.svg"} width={140} height={50} alt="almatv mix stan svg" />
                                    </div>

                                    <div className={styles.info_hold}>
                                        <div className={styles.info_details}>
                                            <div>
                                                <div className={styles.delails_number}>100</div>
                                                <div className={styles.delails_unit}>{lang.Mb_Sec}</div>
                                            </div>
                                            <div>
                                                <div className={styles.delails_number}>130+</div>
                                                <div className={styles.delails_unit}>{lang.tv_channels}</div>
                                            </div>
                                        </div>
                                        <div className={styles.info_price}>
                                            От 4 490 ₸
                                        </div>
                                    </div>

                                    <hr className="hr" />

                                    <div className={styles.compare_toggler}>
                                        <Image src={"/icons/add_to_comparing.svg"} width={20} height={20} alt="toggle compare icon" />
                                        <div>
                                            {lang.compare}
                                        </div>
                                    </div>

                                </div>
                            </Grid>
                        </Grid>

                    </Container>
                </section>
            </div>
        </>
    )
}

export default HitSale