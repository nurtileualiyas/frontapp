import getConfig from 'next/config'
import { useRouter } from 'next/router'
import React, { useContext, useRef, useState } from 'react'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { Toast } from 'primereact/toast'
import { LayoutContext, LayoutProvider } from '../../../layout/context/layoutcontext'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'

import Cookies from 'js-cookie'
import Link from 'next/link'

import { HydrationProvider, Client } from "react-hydration-provider"
import Image from 'next/image'


const LoginPage = () => {

    const { layoutConfig } = useContext(LayoutContext)
    const toast = useRef()

    const apiBaseUrl = getConfig().publicRuntimeConfig.apiBaseUrl

    const emptyCreds = {
        email: '',
        password: '',
    }

    const [loginCreds, setLoginCreds] = useState(emptyCreds)
    const [submitted, setSubmitted] = useState(false)

    const router = useRouter()

    const loginUser = async (e) => {
        e.preventDefault()

        setSubmitted(true)
        const _loginCreds = { ...loginCreds }

        if (_loginCreds.email !== '' && _loginCreds.password !== '') {

            const request = await fetch(
                apiBaseUrl + '/login',
                {
                    method: 'POST',
                    body: JSON.stringify(_loginCreds),
                    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
                }

            )

            const response = await request.json()

            if (!response.message && response.token && response.user) {

                Cookies.set('auth-token', response.token)
                Cookies.set('current-user', response.user)

                setSubmitted(false)
                router.push('/admin/banners/main')
                return
            }
            toast.current.show({ severity: 'error', summary: 'Ошибка', detail: 'Неверные данные', life: 3000 })
            return
        }

    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || ''
        let _loginCreds = { ...loginCreds }
        _loginCreds[`${name}`] = val
        setLoginCreds(_loginCreds)
    }

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' })

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <Toast ref={toast} />
                <Link href={'/'}>
                    <Image src={'/alma_plus.svg'} width={100} height={30} priority="false" alt="Almatv logo" />
                </Link>
                <div style={{ borderRadius: '56px', padding: '0.3rem' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-4xl font-medium mb-3">Войти</div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText inputid="email" value={loginCreds.email} onChange={(e) => onInputChange(e, 'email')} type="text" placeholder="Email адрес" className={classNames("w-full md:w-30rem mb-5", { 'p-invalid': submitted && !loginCreds.email })} style={{ padding: '1rem' }} />

                            <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                                Пароль
                            </label>
                            <Password inputid="password" value={loginCreds.password} onChange={(e) => onInputChange(e, 'password')} feedback={false} placeholder="Пароль" toggleMask className={classNames("w-full mb-5", { 'p-invalid': submitted && !loginCreds.password })} inputClassName='w-full p-3 md:w-30rem'></Password>

                            <div className="flex align-items-center justify-content-between mb-2 gap-5">
                            </div>

                            <HydrationProvider>
                                <Client>
                                    <Button label="Продолжить" className="w-full p-3 text-xl" onClick={(e) => loginUser(e)}></Button>
                                </Client>
                            </HydrationProvider>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

LoginPage.getLayout = function getLayout(page) {
    return (
        <>
            <LayoutProvider>
                {page}
            </LayoutProvider>
        </>
    )
}
export default LoginPage
