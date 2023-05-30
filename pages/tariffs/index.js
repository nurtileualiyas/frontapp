import RequestButton from "@/components/RequestButton"
import PublicLayout from "@/layout/public/PublicLayout"
import styles from '@/styles/pages/tariffs.module.scss'
import { Container, Grid, Tooltip } from "@mui/material"
import classNames from "classnames"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { Dialog } from "primereact/dialog"
import { useEffect, useState } from "react"
import getConfig from 'next/config'

import kz from '@/locales/pages/tariffs/kz'
import ru from '@/locales/pages/tariffs/ru'

const Tariffs = ({ data }) => {
    /* const tariffs = [
        {
            id: 0,
            type: 'combo',
            name: "alma start",
            head_img_link: "/img/tariffs/alma-start.svg",
            head_img_alt: "alma start head img",
            features: [
                {
                    icon_link: "/icons/speed.svg",
                    title: "Скорость",
                    text: "до 50 Мб/сек",
                },
                {
                    icon_link: "/icons/tv.svg",
                    title: "Телевидение",
                    text: "до 85 телеканалов",
                },
            ],
            price: "3 890 ₸",
            price_description: "первые 3 месяца, далее 4 490 ₸/мес",
            more_info: {
                title_img_link: "/img/tariffs/more/almamax.svg",
                description: "Скоростной интернет до 100 Мбит/сек и до 150 самых известных телеканалов с трансляцией популярных кинокартин, мультфильмов, шоу и телепередач.",
                features: [
                    {
                        icon_link: "/img/tariffs/more/icons/speed.svg",
                        title: "Скорость",
                        text: "до 100 Мб/сек",
                    },
                    {
                        icon_link: "/img/tariffs/more/icons/tv.svg",
                        title: "Телевидение",
                        text: "до 150 ТВ-каналов цифрового телевидения",
                    },
                    {
                        icon_link: "/img/tariffs/more/icons/equip.svg",
                        title: "Оборудование",
                        text: "WI-FI роутер, ТВ-приставка, ONT-приставка в аренду от 350 ₸/мес.",
                    },
                    {
                        icon_link: "/img/tariffs/more/icons/key.svg",
                        title: "Типы подключения",
                        text: "GPON, Metro Ethernet, DOCSIS, ЦТВ",
                    },
                ],
            },
        },
        {
            id: 2,
            type: 'combo',
            name: "alma stan",
            head_img_link: "/img/tariffs/alma-stan.svg",
            head_img_alt: "alma stan head img",
            features: [
                {
                    icon_link: "/icons/speed.svg",
                    title: "Скорость",
                    text: "до 100 Мб/сек",
                },
                {
                    icon_link: "/icons/tv.svg",
                    title: "Телевидение",
                    text: "до 130 телеканалов",
                },
            ],
            price: "4 490 ₸",
            price_description: "первые 3 месяца, далее 5 290 ₸/мес",
            more_info: {
                title_img_link: "/img/tariffs/more/almamax.svg",
                description: "Скоростной интернет до 100 Мбит/сек и до 150 самых известных телеканалов с трансляцией популярных кинокартин, мультфильмов, шоу и телепередач.",
                features: [
                    {
                        icon_link: "/img/tariffs/more/icons/speed.svg",
                        title: "Скорость",
                        text: "до 100 Мб/сек",
                    },
                    {
                        icon_link: "/img/tariffs/more/icons/tv.svg",
                        title: "Телевидение",
                        text: "до 150 ТВ-каналов цифрового телевидения",
                    },
                    {
                        icon_link: "/img/tariffs/more/icons/equip.svg",
                        title: "Оборудование",
                        text: "WI-FI роутер, ТВ-приставка, ONT-приставка в аренду от 350 ₸/мес.",
                    },
                    {
                        icon_link: "/img/tariffs/more/icons/key.svg",
                        title: "Типы подключения",
                        text: "GPON, Metro Ethernet, DOCSIS, ЦТВ",
                    },
                ],
            },
        },
        {
            id: 3,
            type: 'tv',
            name: "alma stan",
            head_img_link: "/img/tariffs/alma-stan.svg",
            head_img_alt: "alma stan head img",
            features: [
                {
                    icon_link: "/icons/tv.svg",
                    title: "Телевидение",
                    text: "до 130 телеканалов",
                },
            ],
            price: "4 490 ₸",
            price_description: "первые 3 месяца, далее 5 290 ₸/мес",
            more_info: {
                title_img_link: "/img/tariffs/more/almamax.svg",
                description: "Скоростной интернет до 100 Мбит/сек и до 150 самых известных телеканалов с трансляцией популярных кинокартин, мультфильмов, шоу и телепередач.",
                features: [
                    {
                        icon_link: "/img/tariffs/more/icons/tv.svg",
                        title: "Телевидение",
                        text: "до 150 ТВ-каналов цифрового телевидения",
                    },
                    {
                        icon_link: "/img/tariffs/more/icons/equip.svg",
                        title: "Оборудование",
                        text: "WI-FI роутер, ТВ-приставка, ONT-приставка в аренду от 350 ₸/мес.",
                    },
                    {
                        icon_link: "/img/tariffs/more/icons/key.svg",
                        title: "Типы подключения",
                        text: "GPON, Metro Ethernet, DOCSIS, ЦТВ",
                    },
                ],
            },
        },
        {
            id: 4,
            type: 'internet',
            name: "alma stan",
            head_img_link: "/img/tariffs/alma-stan.svg",
            head_img_alt: "alma stan head img",
            features: [
                {
                    icon_link: "/icons/speed.svg",
                    title: "Скорость",
                    text: "до 50 Мб/сек",
                },
            ],
            price: "4 490 ₸",
            price_description: "первые 3 месяца, далее 5 290 ₸/мес",
            more_info: {
                title_img_link: "/img/tariffs/more/almamax.svg",
                description: "Скоростной интернет до 100 Мбит/сек и до 150 самых известных телеканалов с трансляцией популярных кинокартин, мультфильмов, шоу и телепередач.",
                features: [
                    {
                        icon_link: "/img/tariffs/more/icons/tv.svg",
                        title: "Телевидение",
                        text: "до 150 ТВ-каналов цифрового телевидения",
                    },
                    {
                        icon_link: "/img/tariffs/more/icons/equip.svg",
                        title: "Оборудование",
                        text: "WI-FI роутер, ТВ-приставка, ONT-приставка в аренду от 350 ₸/мес.",
                    },
                    {
                        icon_link: "/img/tariffs/more/icons/key.svg",
                        title: "Типы подключения",
                        text: "GPON, Metro Ethernet, DOCSIS, ЦТВ",
                    },
                ],
            },
        },
        {
            id: 5,
            type: 'internet',
            name: "alma stan",
            head_img_link: "/img/tariffs/alma-stan.svg",
            head_img_alt: "alma stan head img",
            features: [
                {
                    icon_link: "/icons/speed.svg",
                    title: "Скорость 2",
                    text: "до 50 Мб/сек",
                },
            ],
            price: "4 490 ₸",
            price_description: "первые 3 месяца, далее 5 290 ₸/мес",
            more_info: {
                title_img_link: "/img/tariffs/more/almamax.svg",
                description: "Скоростной интернет до 100 Мбит/сек и до 150 самых известных телеканалов с трансляцией популярных кинокартин, мультфильмов, шоу и телепередач.",
                features: [
                    {
                        icon_link: "/img/tariffs/more/icons/tv.svg",
                        title: "Телевидение",
                        text: "до 150 ТВ-каналов цифрового телевидения",
                    },
                    {
                        icon_link: "/img/tariffs/more/icons/equip.svg",
                        title: "Оборудование",
                        text: "WI-FI роутер, ТВ-приставка, ONT-приставка в аренду от 350 ₸/мес.",
                    },
                    {
                        icon_link: "/img/tariffs/more/icons/key.svg",
                        title: "Типы подключения",
                        text: "GPON, Metro Ethernet, DOCSIS, ЦТВ",
                    },
                ],
            },
        },
    ] */

    let menuList = [
        {
            id: 0,
            kz: "Сатылымдағы үздік өнімдер",
            ru: "Хиты продаж",
            type: 'hitsales',
            active: false
        },
        {
            id: 1,
            kz: "Интернет+TV Combo",
            ru: "Интернет+TV Combo",
            type: 'combo',
            active: true
        },
        {
            id: 2,
            kz: "Интернет",
            ru: "Интернет",
            type: 'inet',
            active: false
        },
        {
            id: 3,
            kz: "Онлайн-кинотеатр AlmaTV",
            ru: "Онлайн-кинотеатр AlmaTV",
            type: 'otv',
            active: false
        },
        {
            id: 4,
            kz: "Телевидение",
            ru: "Телевидение",
            type: 'tv',
            active: false
        },
        {
            id: 5,
            kz: "Спутниктік ТВ",
            ru: "Спутниковое ТВ",
            type: 'stv',
            active: false
        },
        {
            id: 6,
            kz: "IP-Телефония",
            ru: "IP-Телефония",
            type: 'iptel',
            active: false
        }
    ]

    const emptyTariff = {
        "id": null,
        "type": "",
        "img": "",
        "name": "",
        "speed": 0,
        "tv": 0,
        "price": "",
        "price_note": "",
        "more_desc": "",
        "more_speed": "",
        "more_tv": "",
        "more_equip": "",
        "more_connect_types": "",
        "created_at": "",
        "updated_at": ""
    }

    const [tariffs, setTariffs] = useState(data)
    const [currentTariff, setCurrentTariff] = useState(emptyTariff)
    const [currentTariffList, setCurrentTariffList] = useState(null)

    const [menuItems, setMenuItems] = useState(menuList)
    const [activeMenuItem, setActiveMenuItem] = useState(null)

    const [moreDialogVisibility, setMoreDialogVisibility] = useState(false)
    const [mobileMenuVisibility, setMobileMenuVisibility] = useState(false)
    const [mobileSearchBarVisibility, setMobileSearchBarVisibility] = useState(false)

    const router = useRouter()

    const { locale } = router
    const lang = locale == 'kz' ? kz : ru

    const apiBaseUrl = getConfig().publicRuntimeConfig.apiBaseUrl
    const baseUrl = getConfig().publicRuntimeConfig.baseUrl


    useEffect(() => {

        if (router.isReady) {
            router.query.tab == undefined ? selectMenuItem(1) : selectMenuItem(router.query.tab)
        }
    }, [router.isReady, router.query]) // eslint-disable-line react-hooks/exhaustive-deps

    const selectMenuItem = async (id) => {

        let _menuItems = [...menuItems]
        _menuItems.map(item => {
            return item.id == id ? item.active = true : item.active = false
        })

        let _activeMenuItem = _menuItems.find(item => {
            return item.active == true
        })

        _activeMenuItem = _activeMenuItem

        let _currentTariffList = tariffs.filter(item => {
            return item.type == _activeMenuItem.type
        })


        setCurrentTariffList(_currentTariffList)
        setMenuItems(_menuItems)
        setActiveMenuItem(_activeMenuItem)
        setMobileMenuVisibility(false)
    }

    const filterTariffList = (searchQuery) => {
        if (searchQuery != '') {
            let _currentTariffList = tariffs.filter(item => {
                return item.name.toLowerCase().includes(searchQuery.toLowerCase())
            })
            setCurrentTariffList(_currentTariffList)
        } else {
            selectMenuItem(activeMenuItem.id)
        }

    }

    const tariffInternetInfo = (speed) => {
        if (!speed) return

        const rusDo = locale == 'kz' ? '' : 'до'
        const kazDein = locale == 'kz' ? 'дейін' : ''

        return (
            <>
                <div className={styles.tariff_point}>
                    <div className={styles.point_title}>
                        <Image src='/icons/speed.svg' width={20} height={12} alt="speed icon svg" />
                        <span>{lang.speed}</span>
                    </div>
                    <div className={styles.point_text}>
                        {rusDo} {speed} Мб/сек {kazDein}
                    </div>
                </div>
            </>
        )
    }

    const tariffTvInfo = (tv) => {
        if (!tv) return

        const rusDo = locale == 'kz' ? '' : 'до'
        const kazDein = locale == 'kz' ? 'телеарнаға дейін' : ''

        return (
            <>
                <div className={styles.tariff_point}>
                    <div className={styles.point_title}>
                        <Image src='/icons/tv.svg' width={20} height={12} alt="tv icon svg" />
                        <span>{lang.television}</span>
                    </div>
                    <div className={styles.point_text}>
                        {rusDo} {tv} {kazDein}
                    </div>
                </div>
            </>
        )
    }

    const moreDescription = (desc) => {
        if (!desc) return

        return (
            <>
                <p>
                    {desc}
                </p>
            </>
        )
    }

    const moreInternetInfo = (speed) => {
        if (!speed) return

        return (
            <>
                <div className={styles.tariff_point}>
                    <div className={styles.point_title}>
                        <Image src={'/img/tariffs/more/icons/speed.svg'} width={35} height={35} alt="speed icon svg" />
                        <span>{lang.speed}</span>
                    </div>
                    <div className={styles.point_text}>
                        {speed}
                    </div>
                </div>
            </>
        )
    }

    const moreTvInfo = (tv) => {
        if (!tv) return

        return (
            <>
                <div className={styles.tariff_point}>
                    <div className={styles.point_title}>
                        <Image src={'/img/tariffs/more/icons/tv.svg'} width={35} height={35} alt="speed icon svg" />
                        <span>{lang.television}</span>
                    </div>
                    <div className={styles.point_text}>
                        {tv}
                    </div>
                </div>
            </>
        )
    }

    const moreEquipInfo = (equip) => {
        if (!equip) return

        return (
            <>
                <div className={styles.tariff_point}>
                    <div className={styles.point_title}>
                        <Image src={'/img/tariffs/more/icons/equip.svg'} width={35} height={35} alt="speed icon svg" />
                        <span>{lang.equip}</span>
                    </div>
                    <div className={styles.point_text}>
                        {equip}
                    </div>
                </div>
            </>
        )
    }

    const moreConnTypesInfo = (connTypes) => {
        if (!connTypes) return

        return (
            <>
                <div className={styles.tariff_point}>
                    <div className={styles.point_title}>
                        <Image src={'/img/tariffs/more/icons/key.svg'} width={35} height={35} alt="speed icon svg" />
                        <span>{lang.connectTypes}</span>
                    </div>
                    <div className={styles.point_text}>
                        {connTypes}
                    </div>
                </div>
            </>
        )
    }

    const openMoreDialog = (tariff) => {
        setCurrentTariff(tariff)
        setMoreDialogVisibility(true)
    }

    if (!currentTariffList) {
        return (
            <>
                <div className="loading">
                    <Image src={'/loading.gif'} width={100} height={100} alt="loading gif" />
                </div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>{lang.title}</title>
            </Head>
            <div className={styles.main_holder}>
                <section>
                    <Container>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <h3 className={styles.page_name}>{lang.title}</h3>
                                <div className={styles.mobile_menu}>
                                    <div className={styles.current_menu_item_name}>
                                        {activeMenuItem[locale]}
                                    </div>
                                    <div className={styles.mobile_menu_items}>
                                        <div onClick={() => setMobileMenuVisibility(true)}>
                                            <Image src={'/icons/mobile_menu.svg'} width={33} height={33} alt="mobile menu svg" />
                                        </div>
                                        <div onClick={() => mobileSearchBarVisibility ? setMobileSearchBarVisibility(false) : setMobileSearchBarVisibility(true)}>
                                            <Image src={'/icons/mobile_search.svg'} width={33} height={33} alt="mobile menu svg" />
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={8}>

                                <div className={styles.searchHold}>
                                    <div className={styles.icon}>
                                        <Image src={'/icons/search.svg'} height={18} width={18} alt="search icon" />
                                    </div>
                                    <div className={styles.input}>
                                        <input onChange={(e) => filterTariffList(e.target.value)} placeholder={lang.search} />
                                    </div>
                                </div>

                                <div className={classNames({ [styles.mobileSearchHold]: true, [styles.active]: mobileSearchBarVisibility })}>
                                    <div className={styles.searchHold}>
                                        <div className={styles.icon}>
                                            <Image src={'/icons/search.svg'} height={18} width={18} alt="search icon" />
                                        </div>
                                        <div className={styles.input}>
                                            <input onChange={(e) => filterTariffList(e.target.value)} placeholder={lang.search} />
                                        </div>
                                    </div>
                                </div>

                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <ul className={styles.menu_holder}>
                                    {
                                        menuItems.map(menuItem => {
                                            return (
                                                <li onClick={() => { selectMenuItem(menuItem.id) }} className={classNames({ [styles.active]: menuItem.active })} key={menuItem.id} >
                                                    {menuItem[locale]}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Grid container spacing={2}>
                                    {
                                        currentTariffList.map(tariff => {
                                            return (
                                                <Grid item xs={12} sm={6} key={tariff.id}>
                                                    <div className={styles.tariff_holder}>
                                                        <div className={styles.tariff_head}>
                                                            <Image
                                                                src={baseUrl + tariff.img}
                                                                width={400}
                                                                height={120}
                                                                alt='Alma tv tariff image'
                                                                style={{ width: "100%", height: "100%", display: "block" }}
                                                            />
                                                        </div>
                                                        <div className={styles.tariff_body}>
                                                            {tariffInternetInfo(tariff.speed)}
                                                            {tariffTvInfo(tariff.tv)}

                                                            <hr className="hr" />

                                                            <div className={styles.price_holder}>
                                                                <div className={styles.price_info}>
                                                                    <span className={styles.price}>{tariff.price} ₸</span>
                                                                    <Tooltip
                                                                        arrow
                                                                        placement="right"
                                                                        title={lang.bonusText}

                                                                    >
                                                                        <Image src={'/icons/info_green.svg'} width={14} height={14} alt="info hint icon svg" />

                                                                    </Tooltip>

                                                                </div>
                                                                <div className={styles.price_description}>
                                                                    {tariff.price_note}
                                                                </div>
                                                            </div>

                                                            <div className={styles.btn_holder}>
                                                                <button onClick={() => openMoreDialog(tariff)} className="outlined_btn">
                                                                    <span className={styles.requestBtn} >{lang.moreBtn}</span>
                                                                </button>
                                                                <RequestButton source={tariff.name}>
                                                                    <span className={styles.requestBtn} >{lang.connectBtn}</span>
                                                                </RequestButton>
                                                            </div>

                                                            <hr className="hr" />

                                                            <div className={styles.compare_toggler}>
                                                                <Image src={"/icons/add_to_comparing.svg"} width={20} height={20} alt="toggle compare icon" />
                                                                <div>
                                                                    {lang.compareBtn}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </Grid>
                                            )
                                        })
                                    }

                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </section>
            </div>

            <Dialog visible={moreDialogVisibility} style={{ width: '27vw' }} breakpoints={{ '1024px': '50vw', '767px': '90vw' }} onHide={() => setMoreDialogVisibility(false)} dismissableMask={true}>
                <div className={styles.modalBody}>

                    <div className={styles.more_dialog}>
                        {/* <Image src={'/img/tariffs/more/almamax.svg'} width={200} height={50} alt="alma max" /> */}

                        <h2 style={{ color: '#1cabc4' }}>
                            {currentTariff.name}
                        </h2>

                        {moreDescription(currentTariff.more_desc)}
                        {moreInternetInfo(currentTariff.more_speed)}
                        {moreTvInfo(currentTariff.more_tv)}
                        {moreEquipInfo(currentTariff.more_equip)}
                        {moreConnTypesInfo(currentTariff.more_connect_types)}

                    </div>

                </div>
            </Dialog>

            <Dialog header="Фильтр" visible={mobileMenuVisibility} position={'bottom'} style={{ width: '100vw', margin: '0' }} onHide={() => setMobileMenuVisibility(false)} dismissableMask={true} draggable={false} resizable={false}>

                <div className={styles.hr_holder}>
                    <hr className="hr" />
                </div>

                <ul className={styles.mobile_menu_list}>
                    {
                        menuItems.map(menuItem => {
                            return (
                                <li onClick={() => { selectMenuItem(menuItem.id) }} className={classNames({ [styles.active]: menuItem.active })} key={menuItem.id} >
                                    <span>{menuItem.name}</span>
                                    <Image src={menuItem.active ? '/icons/radio_btn_checked.svg' : '/icons/radio_btn_unchecked.svg'} width={20} height={20} alt="unchecked radio btn svg" />
                                </li>
                            )
                        })
                    }
                </ul>

            </Dialog>
        </>
    )
}

export async function getServerSideProps() {
    const apiBaseUrl = getConfig().publicRuntimeConfig.apiBaseUrl
    const response = await fetch(apiBaseUrl + '/tariffs', { headers: { 'Cache-Control': 'no-cache' } })
    const data = await response.json()
    return {
        props: {
            data
        }
    }
}

Tariffs.getLayout = function getLayout(page) {
    return (
        <>
            <PublicLayout>
                {page}
            </PublicLayout>
        </>
    )
}

export default Tariffs