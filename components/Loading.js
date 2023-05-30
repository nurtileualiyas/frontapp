import Image from 'next/image'

const Loading = () => {
    return (
        <>
            <div className="loading">
                <Image src={'/loading.gif'} width={100} height={100} alt="loading gif" />
            </div>
        </>
    )
}

export default Loading