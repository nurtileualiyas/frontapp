import getConfig from 'next/config'
import React, { useContext } from 'react'
import AppMenuitem from './AppMenuitem'
import { LayoutContext } from './context/layoutcontext'
import { MenuProvider } from './context/menucontext'
import Link from 'next/link'

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext)
    const contextPath = getConfig().publicRuntimeConfig.contextPath
    const model = [
        {
            label: 'Баннеры',
            items: [{ label: 'Главная', icon: 'pi pi-fw pi-home', to: '/admin/banners/main' }]
        },
        /* {
            label: 'Панель управления',
            items: [
                {
                    label: 'Баннеры',
                    icon: 'pi pi-fw pi-home',
                    items: [
                        { label: 'Карусель', to: '/admin/banners/main' },
                        { label: 'Верхний баннер', to: '/admin/banners/upper' },
                        { label: 'Нижний баннер', to: '/admin/banners/lower' }
                    ]
                }
            ]

        }, */
    ]

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>
                })}
            </ul>
        </MenuProvider>
    )
}

export default AppMenu
