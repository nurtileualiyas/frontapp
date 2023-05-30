import styles from '@/styles/components/city.module.scss'
import { Container, Grid } from '@mui/material'
import classNames from 'classnames'
import Image from 'next/image'
import { useRef, useState, useEffect, useContext } from 'react'
import { CityContext } from '@/context/citycontext'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import kz from '@/locales/components/city/kz'
import ru from '@/locales/components/city/ru'

const City = () => {
    /* const cities = [
        { id: 0, name: "Аксу", region: "aksu" },
        { id: 1, name: "Актау", region: "aktau" },
        { id: 2, name: "Актобе", region: "aktobe" },
        { id: 3, name: "Алматы", region: "almaty" },
        { id: 4, name: "Астана", region: "astana" },
        { id: 5, name: "Алтай (Зыряновск)", region: "altai" },
        { id: 6, name: "Атырау", region: "atyrau" },
        { id: 7, name: "Есик", region: "esik" },
        { id: 8, name: "Кунаев", region: "konaev" },
        { id: 9, name: "Караганда", region: "karaganda" },
        { id: 10, name: "Кокшетау", region: "kokshetau" },
        { id: 11, name: "Костанай", region: "kostanai" },
        { id: 12, name: "Павлодар", region: "pavlodar" },
        { id: 13, name: "Семей", region: "semei" },
        { id: 14, name: "Талдыкорган", region: "taldykorgan" },
        { id: 15, name: "Тараз", region: "taraz" },
        { id: 16, name: "Уральск", region: "oral" },
        { id: 17, name: "Усть-Каменогорск", region: "oskemen" },
        { id: 18, name: "Шымкент", region: "shymkent" },
        { id: 19, name: "Экибастуз", region: "ekibastuz" },
    ] */

    const cities = [
        {
            "id": 0,
            "kz": "Ақсу",
            "ru": "Аксу",
            "region": "aksu"
        },
        {
            "id": 1,
            "kz": "Ақтау",
            "ru": "Актау",
            "region": "aktau"
        },
        {
            "id": 2,
            "kz": "Ақтөбе",
            "ru": "Актобе",
            "region": "aktobe"
        },
        {
            "id": 3,
            "kz": "Алматы",
            "ru": "Алматы",
            "region": "almaty"
        },
        {
            "id": 4,
            "kz": "Астана",
            "ru": "Астана",
            "region": "astana"
        },
        {
            "id": 5,
            "kz": "Алтай (Зыряновск)",
            "ru": "Алтай (Зыряновск)",
            "region": "altai"
        },
        {
            "id": 6,
            "kz": "Атырау",
            "ru": "Атырау",
            "region": "atyrau"
        },
        {
            "id": 7,
            "kz": "Есік",
            "ru": "Есик",
            "region": "esik"
        },
        {
            "id": 8,
            "kz": "Қонаев",
            "ru": "Кунаев",
            "region": "konaev"
        },
        {
            "id": 9,
            "kz": "Қарағанды",
            "ru": "Караганда",
            "region": "karaganda"
        },
        {
            "id": 10,
            "kz": "Көкшетау",
            "ru": "Кокшетау",
            "region": "kokshetau"
        },
        {
            "id": 11,
            "kz": "Қостанай",
            "ru": "Костанай",
            "region": "kostanai"
        },
        {
            "id": 12,
            "kz": "Павлодар",
            "ru": "Павлодар",
            "region": "pavlodar"
        },
        {
            "id": 13,
            "kz": "Семей",
            "ru": "Семей",
            "region": "semei"
        },
        {
            "id": 14,
            "kz": "Талдықорған",
            "ru": "Талдыкорган",
            "region": "taldykorgan"
        },
        {
            "id": 15,
            "kz": "Тараз",
            "ru": "Тараз",
            "region": "taraz"
        },
        {
            "id": 16,
            "kz": "Орал",
            "ru": "Уральск",
            "region": "oral"
        },
        {
            "id": 17,
            "kz": "Өскемен",
            "ru": "Усть-Каменогорск",
            "region": "oskemen"
        },
        {
            "id": 18,
            "kz": "Шымкент",
            "ru": "Шымкент",
            "region": "shymkent"
        },
        {
            "id": 19,
            "kz": "Екібастұз",
            "ru": "Экибастуз",
            "region": "ekibastuz"
        }
    ]

    const [ddMenuVisibility, setddMenuVisibility] = useState(false)
    const [cityList, setCityList] = useState(cities)

    const dropDownContent = useRef(null)
    const dropDownAction = useRef(null)

    const { city, setCity, setCityCookie } = useContext(CityContext)

    const router = useRouter()

    const { locale } = router
    const lang = locale == 'kz' ? kz : ru

    useEffect(() => {
        // only add the event listener when the dropdown is opened
        if (!ddMenuVisibility) return

        function handleClick(event) {
            if (dropDownAction.current && !dropDownAction.current.contains(event.target)) { // if its not clicked on "button" with city name
                if (dropDownContent.current && !dropDownContent.current.contains(event.target)) { // if its not inside dd menu
                    setddMenuVisibility(false)
                }
            }

        }
        window.addEventListener("click", handleClick)

        // clean up
        return () => window.removeEventListener("click", handleClick)

    }, [ddMenuVisibility])

    useEffect(() => {
        const cityId = Cookies.get('cityId')
        if (cityId) {
            const _city = cityList.find(item => item.id == cityId)
            setCity(_city)
        } else {
            chooseCity(3)
        }
    }, [])

    const chooseCity = (cityId) => {
        const _city = cityList.find(item => item.id == cityId)
        setCity(_city)
        setCityCookie(cityId)
        setddMenuVisibility(false)
    }

    const filterCityList = (text) => {
        if (text || text != "") {
            let _cities = cities.filter((item) => {
                return item[locale].toLowerCase().includes(text.toLowerCase())
            })
            setCityList(_cities)
        }
        else {
            setCityList(cities)
        }
    }

    if (!city) {
        return (
            <>
            </>
        )
    }

    return (
        <>
            <div>
                <div ref={dropDownAction} onClick={() => ddMenuVisibility ? setddMenuVisibility(false) : setddMenuVisibility(true)} className={classNames(styles.list_elem, 'clickableELem')}>
                    <Image src={'/icons/location.svg'} width={16} height={16} alt="location icon" />
                    <div>{city[locale]}</div>
                    <div>
                        <Image src={'/icons/arrow_down.svg'} width={8} height={8} alt="arrow down icon" />
                    </div>
                </div>

                <div className={styles.wrap}>
                    <div className={styles.dropDownHolder}>
                        <div className={classNames({ [styles.dropDownMenu]: true, [styles.open]: ddMenuVisibility })}>
                            <Container >
                                <div ref={dropDownContent} className={styles.menuHold}>
                                    <header>
                                        <div className={styles.title}>{lang.select_region}</div>
                                        <div className={styles.close} onClick={() => { setddMenuVisibility(false) }}>
                                            <Image src={'/icons/close.svg'} width={13} height={13} alt="close icon" />
                                        </div>
                                    </header>

                                    <div className={styles.searchHold}>
                                        <div className={styles.icon}>
                                            <Image src={'/icons/search.svg'} height={18} width={18} alt="search icon" />
                                        </div>
                                        <div className={styles.input}>
                                            <input onChange={(e) => filterCityList(e.target.value)} placeholder={lang.search} />
                                        </div>
                                    </div>

                                    <Grid container spacing={2}>
                                        {
                                            cityList.map(elem => {
                                                return (
                                                    <Grid item xs={6} sm={4} key={elem.id}>
                                                        <span
                                                            onClick={() => chooseCity(elem.id)}
                                                            className={
                                                                classNames({ [styles.cityItem]: true, ['clickableELem']: true })}
                                                        >
                                                            {elem[locale]}
                                                        </span>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>


                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default City