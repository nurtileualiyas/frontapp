import PublicLayout from "@/layout/public/PublicLayout"
import Head from "next/head"
import styles from "@/styles/pages/contacts.module.scss"
import { Alert, Container, Grid, InputAdornment, Snackbar, TextField } from "@mui/material"
import Image from "next/image"
import classNames from "classnames"
import Link from "next/link"
import { forwardRef, useContext, useEffect, useState } from "react"

import { IMaskInput } from 'react-imask'
import { CityContext } from "@/context/citycontext"
import getConfig from "next/config"

import kz from '@/locales/pages/contacts/kz'
import ru from '@/locales/pages/contacts/ru'
import { useRouter } from 'next/router'

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props
    return (
        <IMaskInput
            {...other}
            mask="+7 000 000 00 00"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    )
})

const Contacts = () => {

    const [currentPhoneNumbers, setCurrentPhoneNumbers] = useState(null)
    const [phone, setPhone] = useState('7')

    const [copySnackVisibility, setCopySnackVisibility] = useState(false)
    const [successSnackVisibility, setSuccessSnackVisibility] = useState(false)
    const [errorSnackVisibility, setErrorSnackVisibility] = useState(false)

    const [errorText, setErrorText] = useState('Ошибка! Попробуйте позже.')

    const { city } = useContext(CityContext)

    const apiBaseUrl = getConfig().publicRuntimeConfig.apiBaseUrl
    const baseUrl = getConfig().publicRuntimeConfig.baseUrl


    const router = useRouter()
    const { locale } = router
    const lang = locale === 'kz' ? kz : ru

    useEffect(() => {

        const phoneNumbers = async () => {
            const response = await fetch(
                '/data/phone_numbers.json'
            )
            const json = await response.json()

            setCurrentPhoneNumbers(json.data)
        }

        phoneNumbers()

    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(value)
        setCopySnackVisibility(true)
    }

    const hideSnacks = () => {
        setCopySnackVisibility(false)
        setSuccessSnackVisibility(false)
        setErrorSnackVisibility(false)
    }

    const requestCallback = async () => {
        const _phone = phone.replaceAll(' ', '').replace('+7', '8')
        if (_phone.length === 11) {

            const response = await fetch(
                apiBaseUrl + '/callback',
                {
                    method: 'POST',
                    body: JSON.stringify({ phone }),
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Content-Type': 'application/json'
                    }
                }
            )
            const json = await response.json()
            if (json.status == 'success') {
                setSuccessSnackVisibility(true)
            }
            else {
                setErrorText('Ошибка при обработке запроса.')
                setErrorSnackVisibility(true)
            }

        } else {
            setErrorText('Номер телефона введен не правильно.')
            setErrorSnackVisibility(true)
        }
    }

    if (!currentPhoneNumbers) {
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
                <title>Контакты</title>
            </Head>
            <section>
                <div className={styles.main_holder}>
                    <Container>

                        <h2>{lang.header}</h2>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <div className={classNames(styles.card, styles.telegram)}>
                                    <div className={styles.info_hold}>
                                        <h5>{lang.telegram.title}</h5>
                                        <p>
                                            {lang.telegram.desc}
                                        </p>
                                        <Link href={'https://t.me/almatvhelpbot'} target="_blank" >
                                            <button className={classNames({ ['primary_btn_dark']: true, [styles.btn]: true })}>
                                                <span>
                                                    {lang.telegram.btn}
                                                </span>
                                                <Image src={'/icons/telegram.svg'} width={23} height={23} alt='home svg icon' />
                                            </button>
                                        </Link>
                                    </div>
                                    <Image className={styles.bot_image} src={'/img/bot.svg'} width={185} height={200} alt="bot svg" />
                                </div>
                            </Grid>
                        </Grid>

                        <br />

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={6} md={4}>
                                <div className={styles.card}>
                                    <h5>{lang.support.title}</h5>
                                    <p>
                                        {lang.support.desc}
                                    </p>
                                    <div className={styles.phone_numbers}>
                                        {
                                            currentPhoneNumbers.map(item => {
                                                if (item.region == 'common' || item.region == city.region)
                                                    return (
                                                        <Link href={"tel:" + item.number} key={item.id} > {item.text} </Link>
                                                    )
                                            })
                                        }
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <div className={styles.card}>
                                    <h5>{lang.callback.title}</h5>
                                    <p>
                                        {lang.callback.desc}
                                    </p>
                                    <div className={styles.formField}>
                                        <TextField
                                            value={phone}
                                            onChange={(event) => { setPhone(event.target.value) }}
                                            fullWidth
                                            id="outlined-basic"
                                            label="Номер телефона"
                                            variant="outlined"
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            size="small"
                                            InputProps={{
                                                inputComponent: TextMaskCustom,
                                            }}
                                        />
                                    </div>
                                    <button onClick={requestCallback} className="outlined_btn">
                                        <span className={styles.btn_text}>{lang.callback.btn}</span>
                                    </button>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <div className={styles.card}>
                                    <h5>{lang.mail.title}</h5>
                                    <p>
                                        {lang.mail.desc}
                                    </p>

                                    <div className={styles.formField}>
                                        <TextField
                                            onClick={() => copyToClipboard("info@almatv.kz")}
                                            defaultValue={"info@almatv.kz"}
                                            fullWidth
                                            id="outlined-basic"
                                            variant="outlined"
                                            size="small"
                                            InputProps={{
                                                readOnly: true,
                                                endAdornment:
                                                    <InputAdornment position="end">
                                                        <Image className={styles.copyIcon} src={'/icons/copy.svg'} width={17} height={17} alt="copy svg icon" />
                                                    </InputAdornment>
                                            }}
                                        />
                                    </div>

                                    <Link href="mailto:info@almatv.kz">
                                        <button className="outlined_btn">
                                            <span className={styles.btn_text}>{lang.mail.btn}</span>
                                        </button>
                                    </Link>

                                </div>
                            </Grid>
                        </Grid>

                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                            open={copySnackVisibility}
                            autoHideDuration={1500}
                            onClose={hideSnacks}
                            message="Адрес скопирован"
                        />

                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                            open={successSnackVisibility}
                            autoHideDuration={2000}
                            onClose={hideSnacks}
                        >
                            <Alert severity="success" sx={{ width: '100%' }}>
                                Ваша заявка принята
                            </Alert>
                        </Snackbar>

                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                            open={errorSnackVisibility}
                            autoHideDuration={2000}
                            onClose={hideSnacks}
                        >
                            <Alert severity="error" sx={{ width: '100%' }}>
                                {errorText}
                            </Alert>
                        </Snackbar>

                    </Container>
                </div>
            </section>

        </>
    )
}

Contacts.getLayout = function getLayout(page) {
    return (
        <>
            <PublicLayout>
                {page}
            </PublicLayout>
        </>
    )
}

export default Contacts