import classNames from '@/styles/components/carousel.module.scss'
import React, { useEffect, useState } from 'react'
import getConfig from 'next/config'
import Image from 'next/image'

const Carousel = () => {

    const apiBaseUrl = getConfig().publicRuntimeConfig.apiBaseUrl
    const baseUrl = getConfig().publicRuntimeConfig.baseUrl

    const [items, setItems] = useState(null)
    const [itemsSize, setItemsSize] = useState(null)

    const [slidePosition, setSlidePosition] = useState(105)
    const [slideTransitioner, setSlideTransitioner] = useState(classNames.slideTransition)

    useEffect(() => {
        const getItems = async () => {
            const response = await fetch(apiBaseUrl + '/banners', { headers: { 'Cache-Control': 'no-cache' } })
            const data = await response.json()
            setItems(data)
            setItemsSize(data.length)
        }

        getItems()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const slideBtn = (direction) => {

        let _slidePosition = slidePosition

        if (direction == 'next') {
            if (slidePosition >= (105 + (62 * itemsSize))) return
            _slidePosition = slidePosition + 62
        }

        if (direction == 'prev') {
            if (slidePosition <= (105 - 62)) return
            _slidePosition = slidePosition - 62
        }

        setSlideTransitioner(classNames.slideTransition)
        setSlidePosition(_slidePosition)
    }

    const resetSlidePositions = () => {
        if (slidePosition == (105 - 62)) {
            setSlideTransitioner('')
            setSlidePosition((105 + (62 * (itemsSize - 1))))
        }
        if (slidePosition == (105 + (62 * itemsSize))) {
            setSlideTransitioner('')
            setSlidePosition(105)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            slideBtn('next')
        }, 3000);

        return () => clearInterval(interval);
    }, []);// eslint-disable-line react-hooks/exhaustive-deps


    if (!items) {
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
            <div className={classNames.carousel}>
                <div className={classNames.carouselItems + ' ' + slideTransitioner} style={{ transform: `translateX(-${slidePosition}vw)` }} onTransitionEnd={() => resetSlidePositions()} >
                    {
                        <>
                            <div key={items[itemsSize - 2].id} className={classNames.carouselItem}>
                                {/* <img className={classNames.carouselItemImg} src={baseUrl + items[itemsSize - 2].path} alt="" /> */}
                            </div>
                            <div className={classNames.carouselItem}>
                                {/* <img key={items[itemsSize - 1].id} className={classNames.carouselItemImg} src={baseUrl + items[itemsSize - 1].path} alt="" /> */}
                            </div>
                        </>
                    }

                    {
                        items.map(item => (
                            <div key={item.id} className={classNames.carouselItem}>
                                {/* <img className={classNames.carouselItemImg} src={baseUrl + item.path} alt="" /> */}
                            </div>
                        ))

                    }

                    {
                        <>
                            <div key={items[0].id} className={classNames.carouselItem}>
                                {/* <img className={classNames.carouselItemImg} src={baseUrl + items[0].path} alt="" /> */}
                            </div>
                            <div className={classNames.carouselItem}>
                                {/* <img key={items[1].id} className={classNames.carouselItemImg} src={baseUrl + items[1].path} alt="" /> */}
                            </div>
                        </>
                    }
                </div>

                <div className={classNames.slideBtnHolder}>
                    <button onClick={() => slideBtn('prev')}>
                        {/* <img className={classNames.slideBtnPrev} src="carousel/img/leftArrow.svg" alt="" /> */}
                    </button>
                    <button onClick={() => slideBtn('next')}>
                        {/* <img className={classNames.slideBtnNext} src="carousel/img/rightArrow.svg" alt="" /> */}
                    </button>
                </div>

            </div>




        </>
    )
}

/* export async function getServerSideProps() {
    const apiBaseUrl = getConfig().publicRuntimeConfig.apiBaseUrl
    const response = await fetch(apiBaseUrl + '/banners', { headers: { 'Cache-Control': 'no-cache' } })
    const data = await response.json()
    return {
        props: {
            data
        }
    }
} */

export default Carousel