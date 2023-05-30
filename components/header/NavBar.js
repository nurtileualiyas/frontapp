import { Container } from "@mui/material"
import styles from '@/styles/components/navbar.module.scss'
import Link from "next/link"
import Image from "next/image"
import classNames from "classnames"
import React, { useRef, useState, useEffect } from "react"

import { useRouter } from "next/router"
import RequestButton from "../RequestButton"
import City from "../City"

import kz from '@/locales/components/navbar/kz'
import ru from '@/locales/components/navbar/ru'

const NavBar = () => {

    let selectedMenuBlock = {
        1: true,
        2: false,
        3: false,
    }

    const [burgerMenuVisibility, setBurgerMenuVisibility] = useState(false)
    const [manageSelectedMenuBlock, setManageSelectedMenuBlock] = useState(selectedMenuBlock)

    const ddBtn = useRef(null)
    const ddBtnMobile = useRef(null)
    const ddContent = useRef(null)

    useEffect(() => {
        // only add the event listener when the dropdown is opened
        if (!burgerMenuVisibility) return

        function handleClick(event) {
            if ((ddBtn.current && !ddBtn.current.contains(event.target)) && (ddBtnMobile.current && !ddBtnMobile.current.contains(event.target))) { // if its not clicked on toggling "button"
                if (ddContent.current && !ddContent.current.contains(event.target)) { // if its not inside dd content
                    setBurgerMenuVisibility(false)
                }
            }

        }
        window.addEventListener("click", handleClick)

        // clean up
        return () => window.removeEventListener("click", handleClick)

    }, [burgerMenuVisibility])

    const router = useRouter()

    const { locale } = router
    const lang = locale === 'kz' ? kz : ru

    const selectMenuBlock = (id) => {
        let _manageSelectedMenuBlock = { ...manageSelectedMenuBlock }
        Object.keys(_manageSelectedMenuBlock).forEach(item => _manageSelectedMenuBlock[item] = false)
        _manageSelectedMenuBlock[id] = true
        setManageSelectedMenuBlock(_manageSelectedMenuBlock)
    }

    const openMenuLink = (url, menuItemId) => {
        setBurgerMenuVisibility(false)
        router.push({
            pathname: url,
            query: {
                tab: menuItemId,
            }
        })
    }

    return (
        <>
            <Container className={styles.desktopMenu}>
                <div className={styles.main_holder}>
                    <ul>
                        <li ref={ddBtn}>
                            <button className={classNames({ [styles.menuBtn]: true, [styles.opened]: burgerMenuVisibility })} onClick={() => burgerMenuVisibility ? setBurgerMenuVisibility(false) : setBurgerMenuVisibility(true)}>
                                <span className={classNames(styles.bar, styles.bar1)}></span>
                                <span className={classNames(styles.bar, styles.bar2)}></span>
                                <span className={classNames(styles.bar, styles.bar3)}></span>
                            </button>
                        </li>
                        <li>
                            <Link href='/' >
                                <Image src={'/alma_plus.svg'} width={135} height={45} priority="false" alt="Almatv logo" />
                            </Link>
                        </li>
                    </ul>
                    <ul className={styles.rightUl}>
                        <li>
                            <RequestButton source="navbar">
                                <span className={styles.requestBtn} >{lang.connect_btn}</span>
                            </RequestButton>
                        </li>
                        <li>
                            <Link href={'/'} className={classNames('primary_btn_dark', styles.sign_in_btn)}>
                                <Image src={'/icons/login_white.svg'} width={25} height={25} alt="Sign in logo" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </Container>

            <Container className={styles.mobileMenu}>
                <div className={styles.main_holder}>
                    <ul>
                        <li>
                            <Link href='/' >
                                <Image src={'/alma_plus.svg'} width={100} height={30} priority="false" alt="Almatv logo" />
                            </Link>
                        </li>
                    </ul>

                    <ul className={styles.rightUl}>
                        <li>
                            <City />
                        </li>
                        <li ref={ddBtnMobile}>
                            <button className={classNames({ [styles.menuBtn]: true, [styles.opened]: burgerMenuVisibility })} onClick={() => burgerMenuVisibility ? setBurgerMenuVisibility(false) : setBurgerMenuVisibility(true)}>
                                <span className={classNames(styles.bar, styles.bar1)}></span>
                                <span className={classNames(styles.bar, styles.bar2)}></span>
                                <span className={classNames(styles.bar, styles.bar3)}></span>
                            </button>
                        </li>
                    </ul>
                </div>
            </Container>

            <hr className='hr' />

            <div className={styles.burgerMenuHolder}>
                <div className={classNames({ [styles.burgerMenu]: true, [styles.open]: burgerMenuVisibility })}>
                    <Container >
                        <div ref={ddContent} className={styles.menuHold}>
                            <div className={classNames(styles.menuBlock, styles.menuBlockLeft)}>
                                <div onClick={() => selectMenuBlock(1)} className={classNames({ [styles.menuBlockItem]: true, [styles.active]: manageSelectedMenuBlock[1] })}>
                                    {lang.burgerMenu.tariffs.title}
                                </div>
                                <div onClick={() => selectMenuBlock(2)} className={classNames({ [styles.menuBlockItem]: true, [styles.active]: manageSelectedMenuBlock[2] })}>
                                    {lang.burgerMenu.internet.title}
                                </div>
                                <div onClick={() => selectMenuBlock(3)} className={classNames({ [styles.menuBlockItem]: true, [styles.active]: manageSelectedMenuBlock[3] })}>
                                    {lang.burgerMenu.tv.title}
                                </div>
                            </div>
                            <div className={classNames(styles.menuBlock, styles.menuBlockRight)}>
                                <div className={styles.mBRLeft}>
                                    <div className={classNames({ [styles.menuBlockSubItemHold]: true, ['hideElem']: !manageSelectedMenuBlock[1] })}>
                                        <div onClick={() => openMenuLink('/tariffs', 1)} className={styles.menuBlockSubItem}>
                                            {lang.burgerMenu.tariffs.items.internet_tv}
                                        </div>
                                        <div onClick={() => openMenuLink('/tariffs', 2)} className={styles.menuBlockSubItem}>
                                            {lang.burgerMenu.tariffs.items.internet}
                                        </div>
                                        <div onClick={() => openMenuLink('/tariffs', 4)} className={styles.menuBlockSubItem}>
                                            {lang.burgerMenu.tariffs.items.tv}
                                        </div>
                                        <div onClick={() => openMenuLink('/tariffs', 5)} className={styles.menuBlockSubItem}>
                                            {lang.burgerMenu.tariffs.items.stv}
                                        </div>
                                        <div onClick={() => openMenuLink('/tariffs', 6)} className={styles.menuBlockSubItem}>
                                            {lang.burgerMenu.tariffs.items.iptel}
                                        </div>
                                        <div onClick={() => openMenuLink('/tariffs', 3)} className={styles.menuBlockSubItem}>
                                            {lang.burgerMenu.tariffs.items.otv}
                                        </div>
                                    </div>
                                    <div className={classNames({ [styles.menuBlockSubItemHold]: true, ['hideElem']: !manageSelectedMenuBlock[2] })}>
                                        <div className={styles.menuBlockSubItem}>
                                            {lang.burgerMenu.internet.items.techs}
                                        </div>
                                        <div className={styles.menuBlockSubItem}>
                                            {lang.burgerMenu.internet.items.private_house}
                                        </div>
                                        <div className={styles.menuBlockSubItem}>
                                            {lang.burgerMenu.internet.items.equip}
                                        </div>
                                        <div className={styles.menuBlockSubItem}>
                                            {lang.burgerMenu.internet.items.tariffs}
                                        </div>
                                    </div>
                                    <div className={classNames({ [styles.menuBlockSubItemHold]: true, ['hideElem']: !manageSelectedMenuBlock[3] })}>
                                        <div className={styles.menuBlockSubItem}>
                                            {lang.burgerMenu.tv.items.online_cinema}
                                        </div>
                                        <div className={styles.menuBlockSubItem}>
                                            {lang.burgerMenu.tv.items.dtv}
                                        </div>
                                        <div className={styles.menuBlockSubItem}>
                                            {lang.burgerMenu.tv.items.stv}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.mbrRight}>
                                    <Image src={'/img/burgerMenuPreviewImg.svg'} width={470} height={210} alt="Menu preview Image" />
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>

        </>
    )
}

export default NavBar