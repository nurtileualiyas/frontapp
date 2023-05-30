import styles from "@/styles/components/footer.module.scss"
import { Container } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { Dialog } from "primereact/dialog"
import { classNames } from "primereact/utils"
import { useState } from "react"

import kz from '@/locales/components/footer/kz'
import ru from '@/locales/components/footer/ru'

import { useRouter } from "next/router"

const Footer = () => {

    const [appsDialogVisibility, setAppsDialogVisibility] = useState(false)

    const router = useRouter()
    const { locale } = router
    const lang = locale === 'kz' ? kz : ru
    const opposite_locale = locale === 'kz' ? 'ru' : 'kz'

    return (
        <>
            <div className={styles.footer}>

                <hr className="hr" />

                <Container>
                    <div className={styles.footer_content}>
                        <div className={styles.company_description}>
                            <Link href='/' >
                                <Image src={'/alma_plus.svg'} width={100} height={30} priority="false" alt="Almatv logo" />
                            </Link>
                            <p>
                                {lang.about_company}
                            </p>
                        </div>

                        <hr className={classNames({ ['hr']: true, [styles.mobile_hr]: true })} />

                        <div className={styles.apps_socials_hold}>
                            <div onClick={() => setAppsDialogVisibility(true)} className={styles.apps_hold}>
                                <div className={styles.letter_logo_hold}>
                                    <Image
                                        src={'/img/letter_logo.svg'}
                                        width={42}
                                        height={42}
                                        alt="alma tv letter logo svg"
                                        style={{ height: '100%' }}
                                    />
                                </div>
                                <div className={styles.apps_texts}>
                                    <span className={styles.apps_title}>
                                        {lang.download_app}
                                    </span>
                                    <span className={styles.apps_description}>
                                        Для iOS, Android и Аppgallery
                                    </span>
                                </div>
                            </div>

                            <hr className={classNames({ ['hr']: true, [styles.mobile_hr]: true })} />

                            <div className={styles.socials_hold}>
                                <Link href={'/'}>
                                    <Image src={'/icons/socials/insta.svg'} width={20} height={20} alt="instagram svg icon" />
                                </Link>
                                <Link href={'/'}>
                                    <Image src={'/icons/socials/youtube.svg'} width={20} height={20} alt="youtube svg icon" />
                                </Link>
                                <Link href={'/'}>
                                    <Image src={'/icons/socials/telegram.svg'} width={20} height={20} alt="telegram svg icon" />
                                </Link>
                                <Link href={'/'}>
                                    <Image src={'/icons/socials/whatsapp.svg'} width={20} height={20} alt="whatsapp svg icon" />
                                </Link>
                                <Link href={'/'}>
                                    <Image src={'/icons/socials/vk.svg'} width={20} height={20} alt="vkontakte svg icon" />
                                </Link>
                                <Link href={'/'}>
                                    <Image src={'/icons/socials/linkedin.svg'} width={20} height={20} alt="linkedin svg icon" />
                                </Link>
                                <Link href={'/'}>
                                    <Image src={'/icons/socials/twitter.svg'} width={20} height={20} alt="twitter svg icon" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </Container>

                <hr className="hr" />

                <Container>
                    <div className={styles.bottom_line}>
                        <div className={styles.left}>
                            <span className={styles.bl_item}>
                                Alma+ © {new Date().getFullYear()} {lang.rights}
                            </span>
                        </div>
                        <div className={styles.right}>
                            <span className={styles.bl_item}>
                                <Link href={'/agreements'}>
                                    {lang.agreements}
                                </Link>
                            </span>
                            <span className={styles.bl_item}>
                                <Link href={'/'}>
                                    {lang.conf_policy}
                                </Link>
                            </span>

                            <Link href={router.pathname} locale={opposite_locale}>
                                <div className={classNames(styles.bl_item_lang, styles.bl_item)}>
                                    <Image src={'/icons/worldwide.svg'} width={16} height={16} alt="language icon" />
                                    <div>{locale.toUpperCase()}</div>
                                </div>
                            </Link>

                        </div>
                    </div>
                </Container>

            </div>

            <Dialog visible={appsDialogVisibility} style={{ width: '27vw' }} breakpoints={{ '1024px': '50vw', '767px': '90vw' }} onHide={() => setAppsDialogVisibility(false)} dismissableMask={true}>
                <div className={styles.modalBody}>

                    <h4>Всё в одном приложении</h4>

                    <p>
                        Удобный личный кабинет для мобильных устройств. Вы можете управлять счетами, услугами, а также подключать новые тарифы.
                    </p>

                    <div className={styles.qr_info_hold}>
                        <div className={styles.qr_img_hold}>
                            <Image src={'/img/apps_qr.svg'} width={100} height={100} alt="download alma tv apps qr" />
                        </div>
                        <p>
                            Отсканируйте QR-код для загрузки приложения
                        </p>
                    </div>

                    <div className={styles.app_links}>
                        <Link href={'/'}>
                            <Image
                                src={'/img/appstore.svg'}
                                width={120}
                                height={30}
                                alt="app store svg image"
                                style={{ width: "100%" }}
                            />
                        </Link>

                        <Link href={'/'}>
                            <Image
                                src={'/img/googleplay.svg'}
                                width={120}
                                height={30}
                                alt="google play svg image"
                                style={{ width: "100%" }}
                            />
                        </Link>

                        <Link href={'/'}>
                            <Image
                                src={'/img/appgallery.svg'}
                                width={120}
                                height={30}
                                alt="app gallery svg image"
                                style={{ width: "100%" }}
                            />
                        </Link>
                    </div>


                </div>
            </Dialog>
        </>
    )
}

export default Footer