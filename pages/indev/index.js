import styles from '@/styles/pages/indev.module.scss'
import { Snackbar, TextField } from '@mui/material'
import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

const InDev = () => {
    const [email, setEmail] = useState('')
    const [snackbarVisibility, setSnackbarVisibility] = useState(false)

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarVisibility(false)
    }

    const sendEmail = () => {
        if (email != '') {
            setSnackbarVisibility(true)
        }

    }

    return (
        <>
            <div className={styles.pageHolder}>
                <div className={styles.content}>
                    <Image
                        src={'/img/almatv_alarm.svg'}
                        width={400}
                        height={300}
                        alt='alarm svg image'
                        style={{ width: '100%' }}
                        priority='false'
                    />

                    <h2>Скоро здесь что-то появится...</h2>
                    <p>В данный момент эта страница находится в разработке, мы сообщим Вам о её запуске</p>
                    <div className={styles.form}>
                        <TextField
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                            fullWidth
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            size="small"
                            type={"email"}
                            placeholder='Введите email'
                        />

                        <button onClick={sendEmail} className={classNames({ ['primary_btn_dark']: true, [styles.btn]: true })}>
                            <Image src={'/icons/send_white.svg'} width={15} height={15} alt='home svg icon' />
                        </button>

                    </div>

                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                open={snackbarVisibility}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                message="Email отправлен"
            />
        </>
    )
}

InDev.getLayout = function getLayout(page) {
    return (
        <>
            {page}
        </>
    )
}

export default InDev
