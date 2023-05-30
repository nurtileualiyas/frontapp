import styles from '@/styles/components/newscard.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import dateAndTime from 'date-and-time'
import ru from 'date-and-time/locale/ru'
import getConfig from 'next/config'

const NewsCard = ({ ref, link, img, category, title, date }) => {

    dateAndTime.locale(ru)

    const baseUrl = getConfig().publicRuntimeConfig.baseUrl

    const getImgLink = (img_path) => {

        let path = baseUrl + img_path

        if (!img_path || img_path == null || img_path == '')
            path = '/img/placeholder/newsPreview-placeholder.png'

        return path
    }

    const cutText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "..."
        }
        return text
    }

    return (
        <>
            <Link ref={ref} href={link} target='_blank' className={styles.card}>
                <Image
                    src={getImgLink(img)}
                    width={340}
                    height={200}
                    alt='laptop'
                    style={{ width: '100%', height: 'auto' }}
                />
                <p aria-label={category} className={styles.category}>
                    {cutText(category, 15)}
                </p>
                <h4 aria-label={title}>
                    {cutText(title, 25)}
                </h4>
                <span>
                    {dateAndTime.format(new Date(date), 'DD MMMM YYYY')}
                </span>
            </Link>
        </>
    )
}

export default NewsCard