import PublicLayout from "@/layout/public/PublicLayout"
import { Container } from "@mui/material"
import { useRouter } from "next/router"
import getConfig from 'next/config'
import { useEffect, useState } from "react"
import Image from "next/image"
import htmlParser from 'html-react-parser'

import styles from '@/styles/pages/singlenews.module.scss'

const SingleNews = () => {

    const router = useRouter()
    const apiBaseUrl = getConfig().publicRuntimeConfig.apiBaseUrl

    const [content, setContent] = useState('')

    /* console.log('dataFront', data); */

    useEffect(() => {
        if (router.isReady) {
            async function getItem(id) {
                const response = await fetch(apiBaseUrl + '/news/' + id, { headers: { 'Cache-Control': 'no-cache' } })
                const data = await response.json()
                setContent(data.content)
            }

            getItem(router.query.id)
        }
    }, [router.isReady])

    if (content == '') {
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
            <div className={styles.singleNews}>
                <section>
                    <Container>

                        {htmlParser(content)}

                    </Container>
                </section>
            </div>
        </>
    )
}

/* export async function getServerSideProps(context) {
    const id = context.query
    const apiBaseUrl = getConfig().publicRuntimeConfig.apiBaseUrl
    const response = await fetch(apiBaseUrl + '/news/' + id, { headers: { 'Cache-Control': 'no-cache' } })
    console.log('Myresponse', response)
    const data = await response.json()
    console.log('data', data);
    return {
        props: {
            data
        }
    }
} */


SingleNews.getLayout = function getLayout(page) {
    return (
        <>
            <PublicLayout>
                {page}
            </PublicLayout>
        </>
    )
}

export default SingleNews