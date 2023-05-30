import styles from '@/styles/components/newscards.module.scss'
import { Container } from '@mui/material'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import NewsCard from './NewsCard'
import getConfig from 'next/config'
import Loading from './Loading'

const NewsCards = () => {

    const newsArray = [
        {
            title: 'Режим работы торговых офисов филиалов АО «АлмаТел ',
            category: 'Типы подключения',
            date: '10 ноября 2022',
            img: '/img/news/news-1.svg'
        },
        {
            title: 'Режим работы торговых офисов филиалов АО «АлмаТел ',
            category: 'Типы подключения',
            date: '10 ноября 2022',
            img: '/img/news/news-2.svg'
        },
        {
            title: 'Режим работы торговых офисов филиалов АО «АлмаТел ',
            category: 'Типы подключения',
            date: '10 ноября 2022',
            img: '/img/news/news-3.svg'
        },
        {
            title: 'Режим работы торговых офисов филиалов АО «АлмаТел ',
            category: 'Типы подключения',
            date: '10 ноября 2022',
            img: '/img/news/news-4.svg'
        },
    ]

    const apiBaseUrl = getConfig().publicRuntimeConfig.apiBaseUrl
    const baseUrl = getConfig().publicRuntimeConfig.baseUrl

    const [news, setNews] = useState(null)

    const cardsRef = useRef(null)
    const cardRef = useRef(null)

    useEffect(() => {

        const getNews = async () => {
            const response = await fetch(
                apiBaseUrl + '/news',
                {
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                }
            )
            const res = await response.json()

            setNews(res.data)
        }

        getNews()

    }, [])

    const scrollBtn = (direction) => {

        const scrollWidth = cardRef.current.offsetWidth + 50

        if (direction == 'prev') {
            cardsRef.current.scrollLeft += -scrollWidth
        }
        else {
            cardsRef.current.scrollLeft += scrollWidth
        }
    }

    if (!news) {
        return <Loading />
    }

    return (
        <>
            <div className={styles.newscards}>
                <Container>
                    <div className={styles.title_hold}>
                        <h3>
                            Новости
                        </h3>

                    </div>

                    <div className={styles.cards_wrap}>
                        <div ref={cardsRef} className={styles.cards}>

                            <div className={styles.cards_holder}>

                                {
                                    news.map((item, idx) => {
                                        return (
                                            <div ref={cardRef} key={item.id} className={styles.card_wrap}>
                                                <NewsCard link={'/news/' + item.id} img={item.preview_img} category={item.category} title={item.title} date={item.updated_at} />
                                            </div>
                                        )
                                    })
                                }

                                {/* <Link href={'/'} className={styles.moreNewsHold}>
                                    <button className={styles.moreNewsBtn}>
                                        {">"}
                                    </button>
                                    <h4>
                                        Больше новостей
                                    </h4>
                                </Link> */}


                            </div>

                        </div>

                        <div className={styles.actions}>
                            <button onClick={() => scrollBtn('prev')} className={classNames({ [styles.actionsBtn]: true, [styles.prevBtn]: true })}>
                                {"<"}
                            </button>
                            <button onClick={() => scrollBtn('next')} className={classNames({ [styles.actionsBtn]: true, [styles.afterBtn]: true })}>
                                {">"}
                            </button>
                        </div>
                    </div>

                </Container>
            </div>
        </>
    )
}

export default NewsCards