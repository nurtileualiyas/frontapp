import { Dialog } from "primereact/dialog"
import { forwardRef, useState } from "react"
import classNames from "classnames"

import TextField from '@mui/material/TextField'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import styles from '@/styles/components/requestbutton.module.scss'
import Image from "next/image"
import getConfig from "next/config"

import { IMaskInput } from 'react-imask'
import kz from '@/locales/components/request/kz'
import ru from '@/locales/components/request/ru'
import { useRouter } from "next/router"

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props
    return (
        <IMaskInput
            {...other}
            mask="+7 000 000 00 00"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    )
})


const RequestButton = ({ children, service = 'Не указано', source = 'web' }) => {

    const apiBaseUrl = getConfig().publicRuntimeConfig.apiBaseUrl

    const [visible, setVisible] = useState(false)

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('7')
    const [city, setCity] = useState('')
    const [buildingType, setBuildingType] = useState('')

    const [hideFormholder, setHideFormholder] = useState(false)
    const [openFormResult, setOpenFormResult] = useState(false)

    const router = useRouter()
    const { locale } = router
    const lang = locale === 'kz' ? kz : ru

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }
    const handleBuildingTypeChange = (event) => {
        setBuildingType(event.target.value);
    }

    const sendConnectRequest = async () => {

        const requestData = {
            name,
            phone,
            city,
            buildingType,
            service,
            source,
        }

        console.log(requestData);

        const response = await fetch(
            apiBaseUrl + '/request',
            {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'
                }
            }
        )

        const json = await response.json()
        console.log(json);
        if (!json.error) {
            setHideFormholder(true)
            setOpenFormResult(true)
        }

    }

    return (
        <>
            <button className="primary_btn" onClick={() => setVisible(true)}>
                {children}
            </button>

            <Dialog visible={visible} style={{ width: '25vw' }} breakpoints={{ '1024px': '50vw', '767px': '90vw' }} onHide={() => setVisible(false)} dismissableMask={true}>
                <div className={styles.modalBody}>

                    <div className={classNames({ [styles.formHolder]: true, [styles.closed]: hideFormholder })}>
                        <h4>{lang.modal.title}</h4>

                        <div className={styles.formField}>
                            <TextField
                                value={name}
                                onChange={(event) => { setName(event.target.value) }}
                                fullWidth
                                id="outlined-basic"
                                label={lang.modal.name_input_label}
                                variant="outlined"
                                size="small"
                            />
                        </div>
                        <div className={styles.formField}>
                            <TextField
                                value={phone}
                                onChange={(event) => { setPhone(event.target.value) }}
                                fullWidth
                                id="outlined-basic"
                                label={lang.modal.phone_input_label}
                                variant="outlined"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                size="small"
                                InputProps={{
                                    inputComponent: TextMaskCustom,
                                }}
                            />
                        </div>
                        <div className={styles.formField}>
                            <FormControl fullWidth sx={{ m: 1, minWidth: 120, margin: 0 }} size="small">
                                <InputLabel id="selectCity">{lang.modal.city_input_label}</InputLabel>
                                <Select
                                    labelId="selectCity"
                                    id="selectCity"
                                    value={city}
                                    label={lang.modal.city_input_label}
                                    onChange={handleCityChange}
                                >
                                    <MenuItem value="">
                                        <em>{lang.modal.select_txt}</em>
                                    </MenuItem>
                                    <MenuItem value={"Алматы"}>Алматы</MenuItem>
                                    <MenuItem value={"Астана"}>Астана</MenuItem>
                                    <MenuItem value={"Атырау"}>Атырау</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={styles.formField}>
                            <FormControl fullWidth sx={{ m: 1, minWidth: 120, margin: 0 }} size="small">
                                <InputLabel id="selectBuilding">{lang.modal.building_type_input_label}</InputLabel>
                                <Select
                                    labelId="selectBuilding"
                                    id="selectBuilding"
                                    value={buildingType}
                                    label={lang.modal.building_type_input_label}
                                    onChange={handleBuildingTypeChange}
                                >
                                    <MenuItem value="">
                                        <em>{lang.modal.select_txt}</em>
                                    </MenuItem>
                                    <MenuItem value={"Частный дом"}>{lang.modal.private_house}</MenuItem>
                                    <MenuItem value={"Другое"}>{lang.modal.other_txt}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className={styles.formField}>
                            <button onClick={sendConnectRequest} className={styles.sendBtn}>{lang.modal.send_btn}</button>
                        </div>
                    </div>

                    <div className={classNames({ [styles.formResult]: true, [styles.opened]: openFormResult })}>
                        <div className={styles.imageHold}>
                            <Image src={"/img/heart.svg"} width={150} height={100} alt="heart image" />
                        </div>
                        <h3>{lang.modal.feedback.success_title}</h3>
                        <p>{lang.modal.feedback.success_message}</p>
                        <p>{lang.modal.feedback.success_goodbye}</p>
                    </div>

                </div>
            </Dialog>
        </>
    )
}

export default RequestButton