import styles from '@/styles/pages/notfound.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

const NotFound = () => {

    return (
        <>
            <div className={styles.pageHolder}>
                <div className={styles.content}>
                    <Image
                        src={'/img/404.svg'}
                        width={600}
                        height={225}
                        alt='error 404 svg image'
                        style={{ width: '100%' }}
                    />

                    <h2>Страница не найдена :(</h2>
                    <p>Запрошенный Вами ресурс не был найден или был удален</p>

                    <Link href={'/'}>
                        <button className={classNames({ ['primary_btn_dark']: true, [styles.btn]: true })}>
                            <span>
                                На главную
                            </span>
                            <Image src={'/icons/home.svg'} width={20} height={20} alt='home svg icon' />
                        </button>
                    </Link>

                </div>
            </div>
        </>
    )
}

NotFound.getLayout = function getLayout(page) {
    return (
        <>
            {page}
        </>
    )
}

export default NotFound
