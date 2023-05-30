import styles from "@/styles/components/payment.module.scss"
import { Alert, Container, Grid, InputAdornment, TextField } from "@mui/material"
import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import { Dialog } from "primereact/dialog"
import { useState } from "react"
import kz from '@/locales/components/payment/kz'
import ru from '@/locales/components/payment/ru'
import { useRouter } from "next/router"
import getConfig from "next/config"


const Payment = () => {

    const [contractNumber, setContractNumber] = useState('')
    const [paymentSumm, setPaymentSumm] = useState('')
    const [paymentOptionsVisibility, setPaymentOptionsVisibility] = useState(false)
    const [paymentProcessError, setPaymentProcessError] = useState(false)

    const apiBaseUrl = getConfig().publicRuntimeConfig.apiBaseUrl

    const router = useRouter()
    const { locale } = router
    const lang = locale === 'kz' ? kz : ru

    const openPaymentOptionsDialog = () => {
        setPaymentOptionsVisibility(true)
        setPaymentProcessError(false)
    }

    const openLinkInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const kaspiPay = () => {
        const paymentLink = "https://kaspi.kz/pay/almatvkz?4666=" + contractNumber + "&amount=" + paymentSumm
        openLinkInNewTab(paymentLink)
        setPaymentOptionsVisibility(false)

    }

    const cardPay = async () => {
        // https://www.almatv.kz/include/payment.php?contract=343434343&amount=3333

        //const response = await fetch('https://www.almatv.kz/ajax/ajax_test_payment.php?contract=' + contractNumber + '&amount=' + paymentSumm)
        const response = await fetch(apiBaseUrl + '/payment/?contract=' + contractNumber + '&amount=' + paymentSumm)
        const jsonRes = await response.json()
        if (jsonRes.status === 'ok') {
            openLinkInNewTab(jsonRes.data)
            setPaymentOptionsVisibility(false)
        } else {
            setPaymentProcessError(true)
        }
    }

    const makePaymentWith = (paymentOption) => {
        switch (paymentOption) {
            case 'kaspi':
                kaspiPay()
                break
            case 'card':
                cardPay()
                break
        }
        setContractNumber('')
        setPaymentSumm('')
    }


    return (
        <>
            <div className={styles.payment}>
                <section>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={8}>
                                <div className={styles.payment_hold}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <div className={styles.description}>
                                                <h3>{lang.title}</h3>
                                                <p>
                                                    {lang.desc}
                                                </p>
                                                <div className={styles.img_hold}>
                                                    <Image
                                                        src={"/img/wallet.svg"}
                                                        width={200}
                                                        height={70}
                                                        style={{ height: '100%', width: '100%', display: 'block' }}
                                                        alt="wallet svg image" />
                                                </div>


                                            </div>

                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className={styles.form_hold}>
                                                <div className={styles.form_field}>
                                                    <TextField
                                                        value={contractNumber}
                                                        onChange={(event) => { setContractNumber(event.target.value) }}
                                                        fullWidth
                                                        id="outlined-basic"
                                                        label={lang.contract_number_input_label}
                                                        variant="outlined"
                                                        size="small"
                                                        type="number"
                                                    />
                                                </div>

                                                <div className={styles.form_field}>
                                                    <TextField
                                                        value={paymentSumm}
                                                        onChange={(event) => { setPaymentSumm(event.target.value) }}
                                                        fullWidth
                                                        id="outlined-basic"
                                                        label={lang.payment_summ_input_label}
                                                        variant="outlined"
                                                        size="small"
                                                        type="number"
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">₸</InputAdornment>
                                                        }}
                                                    />
                                                </div>

                                                <div className={styles.form_field}>
                                                    <button className="primary_btn" onClick={openPaymentOptionsDialog}>
                                                        {lang.btn}
                                                    </button>
                                                </div>

                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <div className={styles.profile_hold}>
                                    <div className={styles.profile_img_hold}>
                                        <Image
                                            src={'/img/profile_sign_in.svg'}
                                            width={200}
                                            height={130}
                                            alt="sign in image"
                                            style={{ display: 'block', width: '100%', height: '100%' }}
                                        />
                                    </div>
                                    <div className={styles.profile_block_info}>
                                        <h3>
                                            {lang.profile_page.title}
                                        </h3>
                                        <p>
                                            {lang.profile_page.desc}
                                        </p>
                                        <div className={styles.linkHolder}>
                                            <Link href={'http://cabinet.almatv.kz/'} target="_blank" className="primary_link">
                                                {lang.profile_page.btn}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </section>
            </div>

            <Dialog visible={paymentOptionsVisibility} style={{ width: '25vw' }} breakpoints={{ '1024px': '50vw', '767px': '90vw' }} onHide={() => setPaymentOptionsVisibility(false)} dismissableMask={true}>
                <div className={styles.modalBody}>

                    <h4>{lang.modal.title}</h4>

                    <button onClick={() => makePaymentWith('kaspi')} className={classNames({ [styles.btn]: true, [styles.redBtn]: true })}>
                        {lang.modal.kaspi}
                        <Image src={"/icons/qr.svg"} width={30} height={30} alt="qr svg icon" />
                    </button>

                    <button onClick={() => makePaymentWith('card')} className={classNames({ [styles.btn]: true })}>
                        {lang.modal.card}
                        <Image src={"/icons/credit_card.svg"} width={30} height={30} alt="credit card svg icon" />
                    </button>

                    <div className={classNames({ 'hideElem': !paymentProcessError })}>
                        <br />
                        <Alert severity="error">Ошибка! Проверьте введенные данные.</Alert>
                    </div>

                </div>
            </Dialog>
        </>
    )
}

export default Payment