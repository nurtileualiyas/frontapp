import styles from '@/styles/components/support.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const Support = () => {
    const [contentVisibility, setContentVisibility] = useState(false)

    const content = useRef(null)

    useEffect(() => {
        // only add the event listener when the dropdown is opened
        if (!contentVisibility) return

        function handleClick(event) {
            if (content.current && !content.current.contains(event.target)) {
                setContentVisibility(false)
            }
        }
        window.addEventListener("click", handleClick)

        // clean up
        return () => window.removeEventListener("click", handleClick)

    }, [contentVisibility])

    return (
        <>
            <div className={styles.support_hold}>

                <div ref={content} className={styles.content_hold}>

                    <Image onClick={() => setContentVisibility(true)} src={'/img/help.svg'} width={65} height={65} alt='support chat img' />

                    <div className={classNames({ [styles.content]: true, [styles.open]: contentVisibility })}>

                        <div className={styles.close}>
                            <Image
                                onClick={() => setContentVisibility(false)}
                                src={'/icons/close.svg'}
                                width={14}
                                height={14}
                                alt='close icon svg'
                            />
                        </div>

                        <h5>Нужна помощь?</h5>

                        <div className={styles.numbers}>
                            <div className={styles.block}>
                                <div className={styles.title}>
                                    <Image src={'/icons/link.svg'} width={18} height={18} alt='link icon svg' />
                                    <span>Подключение</span>
                                </div>
                                <Link href="tel:+77780211330">+7 778 021 13 30</Link>
                            </div>
                            <div className={styles.block}>
                                <div className={styles.title}>
                                    <Image src={'/icons/headset.svg'} width={18} height={18} alt='headset icon svg' />
                                    <span>Поддрежка</span>
                                </div>
                                <Link href="tel:+77780211331">+7 778 021 13 31</Link>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Support