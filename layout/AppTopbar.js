import getConfig from 'next/config'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { classNames } from 'primereact/utils'
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react'
import { LayoutContext } from './context/layoutcontext'

const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext)
    const menubuttonRef = useRef(null)
    const topbarmenuRef = useRef(null)
    const topbarmenubuttonRef = useRef(null)
    const contextPath = getConfig().publicRuntimeConfig.contextPath

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }))

    return (
        <div className="layout-topbar">
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
                <Link href="/">
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-sign-out"></i>
                        <span>Выйти</span>
                    </button>
                </Link>
            </div>
        </div>
    )
})

export default AppTopbar
