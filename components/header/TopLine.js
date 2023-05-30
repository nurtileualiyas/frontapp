import styles from '@/styles/components/topline.module.scss'
import { Container, Grid } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import { useEffect, useRef, useState } from 'react'
import City from '../City'

import { useRouter } from 'next/router'
import kz from '@/locales/components/topline/kz'
import ru from '@/locales/components/topline/ru'

var classNames = require('classnames')



const TopLine = () => {

    const [moreOptionsVisibility, setMoreOptionsVisibility] = useState(false)

    const moreOptionsContent = useRef(null)

    useEffect(() => {
        // only add the event listener when the dropdown is opened
        if (!moreOptionsVisibility) return

        function handleClick(event) {
            if (moreOptionsContent.current && !moreOptionsContent.current.contains(event.target)) {
                setMoreOptionsVisibility(false)
            }
        }
        window.addEventListener("click", handleClick)

        // clean up
        return () => window.removeEventListener("click", handleClick)

    }, [moreOptionsVisibility])

    const router = useRouter()
    const { locale } = router
    const lang = locale === 'kz' ? kz : ru
    const opposite_locale = locale === 'kz' ? 'ru' : 'kz'


    return (
        <>
            <div className={styles.wrapper}>
                <Container>
                    <div className={styles.main_holder}>

                        <ul>
                            <li>
                                <Link href='/' >{lang.to_private}</Link>
                            </li>
                            <li>
                                <Link href='/' >{lang.to_business}</Link>
                            </li>
                            <li>
                                <div ref={moreOptionsContent} className={styles.more}>
                                    <div className={classNames(styles.list_elem, 'clickableELem')} onClick={() => moreOptionsVisibility ? setMoreOptionsVisibility(false) : setMoreOptionsVisibility(true)}>
                                        <div>{lang.more.text}</div>
                                        <div>
                                            <Image src={'/icons/arrow_down.svg'} width={8} height={8} alt="more options icon" />
                                        </div>
                                    </div>

                                    <div className={classNames({ [styles.moreOptions]: true, [styles.open]: moreOptionsVisibility })}>
                                        <Link href='/news' target='_blank'>{lang.more.news}</Link>
                                        <Link href='/'>{lang.more.about}</Link>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <ul>
                            <li>
                                <Link href='/#online_payment' >{lang.payment_btn}</Link>
                            </li>
                            <li>
                                <Link href='/contacts' >{lang.contacts}</Link>
                            </li>
                            <li>
                                <City />
                            </li>
                            <li>
                                <Link href={router.pathname} locale={opposite_locale}>
                                    <div className={styles.list_elem}>
                                        <Image src={'/icons/worldwide.svg'} width={16} height={16} alt="language icon" />
                                        <div>{locale.toUpperCase()}</div>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Container>

                <hr className='hr' />

            </div>

        </>
    )
}

export default TopLine