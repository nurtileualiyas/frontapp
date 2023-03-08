import getConfig from 'next/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { classNames } from 'primereact/utils'
import { Toast } from 'primereact/toast'
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react'
import { LayoutContext } from './context/layoutcontext'

import Cookies from 'js-cookie'

const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext)
    const menubuttonRef = useRef(null)
    const topbarmenuRef = useRef(null)
    const topbarmenubuttonRef = useRef(null)
    const toast = useRef(null)
    const apiBaseUrl = getConfig().publicRuntimeConfig.apiBaseUrl

    const router = useRouter()

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }))

    const logoutUser = async () => {
        const authToken = Cookies.get('auth-token')
        if (authToken) {
            const request = await fetch(
                apiBaseUrl + '/logout',
                {
                    method: 'POST',
                    headers:
                    {
                        'Authorization': 'Bearer ' + authToken,
                        'Cache-Control': 'no-cache',
                    }
                }
            )

            if (request.status && request.status === 200) {
                const response = await request.json()
                Cookies.remove('auth-token')
                Cookies.remove('current-user')
                router.push('/')
                return
            }
            toast.current.show({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при выходе из системы', life: 3000 })
            return
        }
        toast.current.show({ severity: 'error', summary: 'Ошибка', detail: 'Вы не авторизованы', life: 3000 })
        return
    }

    return (
        <div className="layout-topbar">
            <Toast ref={toast} />
            <Link legacyBehavior href="/">
                <a className="layout-topbar-logo">
                    <>
                        <img src="/alma_plus.svg" widt={'true'} alt="logo" />
                    </>
                </a>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button" onClick={logoutUser}>
                    <i className="pi pi-sign-out"></i>
                    <span>Выйти</span>
                </button>
            </div>
        </div>
    )
})

export default AppTopbar
