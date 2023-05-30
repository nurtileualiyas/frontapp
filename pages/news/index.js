import Loading from "@/components/Loading"
import NewsCard from "@/components/NewsCard"
import PublicLayout from "@/layout/public/PublicLayout"
import { Container, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import getConfig from "next/config"
import Head from "next/head"
import { Paginator } from "primereact/paginator"

const News = () => {

    const apiBaseUrl = getConfig().publicRuntimeConfig.apiBaseUrl
    const baseUrl = getConfig().publicRuntimeConfig.baseUrl

    const [news, setNews] = useState(null)

    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)

    useEffect(() => {

        const getNews = async (pageId = '') => {

            let url = apiBaseUrl + '/news'
            if (pageId != '') url = apiBaseUrl + '/news?page=' + pageId

            const response = await fetch(
                url,
                {
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                }
            )
            const res = await response.json()

            setNews(res.data)
            setRows(res.per_page)
            setTotalRecords(res.total)
        }

        if (first == 0) {
            getNews()
        } else {
            getNews(first + 1)
        }


    }, [first])

    const onPageChange = (event) => {
        console.log(event);
        setFirst(event.first);
        setRows(event.rows);
    }

    if (!news) {
        return <Loading />
    }

    return (
        <>
            <Head>
                <title>Новости</title>
            </Head>
            <section>
                <Container>
                    <h2>
                        Новости
                    </h2>
                    <br />
                    <Grid container spacing={4}>
                        {
                            news.map((item, idx) => {
                                return (
                                    <Grid key={idx} item xs={12} sm={4}>
                                        <NewsCard link={'/news/' + item.id} img={item.preview_img} category={item.category} title={item.title} date={item.updated_at} />
                                    </Grid>

                                )
                            })
                        }
                    </Grid>

                    <br />

                    <Paginator first={first} rows={rows} totalRecords={totalRecords} onPageChange={onPageChange} />

                </Container>
            </section>
        </>
    )
}

News.getLayout = function getLayout(page) {
    return (
        <>
            <PublicLayout>
                {page}
            </PublicLayout>
        </>
    )
}

export default News