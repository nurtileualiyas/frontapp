import getConfig from 'next/config'
import React, { useContext } from 'react'
import { LayoutContext } from './context/layoutcontext'

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext)
    const contextPath = getConfig().publicRuntimeConfig.contextPath

    return (
        <div className="layout-footer">
            by
            <span className="font-medium ml-2">DIT</span>
        </div>
    )
}

export default AppFooter
