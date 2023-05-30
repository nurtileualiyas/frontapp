import getConfig from 'next/config'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { FileUpload } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Image } from 'primereact/image'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils'
import React, { useEffect, useRef, useState } from 'react'

import { Editor } from 'primereact/editor';
import Link from 'next/link'
import dateAndTime from 'date-and-time'
import ru from 'date-and-time/locale/ru'

const Crud = () => {

    dateAndTime.locale(ru)

    let emptyItem = {
        id: null,
        type: '',
        img: '',
        name: '',
        speed: '',
        tv: '',
        price: '',
        price_note: '',
        more_desc: '',
        more_speed: '',
        more_tv: '',
        more_equip: '',
        more_connect_types: '',
        created_at: '',
        updated_at: '',
    }

    const tariffTypes = [
        { name: 'combo', name_ru: 'Combo' },
        { name: 'inet', name_ru: 'Интернет' },
        { name: 'otv', name_ru: 'Онлайн-кинотеатр' },
        { name: 'tv', name_ru: 'Телевидение' },
        { name: 'stv', name_ru: 'Спутниковое ТВ' },
        { name: 'iptel', name_ru: 'IP-Телефония' },
    ]

    const [item, setItem] = useState(emptyItem)

    const [items, setItems] = useState(null)
    const [itemDialog, setItemDialog] = useState(false)
    const [editItemDialog, setEditItemDialog] = useState(false)
    const [editItemImageDialog, setEditItemImageDialog] = useState(false)
    const [deleteItemDialog, setDeleteItemDialog] = useState(false)

    const [editorContent, setEditorContent] = useState('')

    const [selectedItems, setSelectedItems] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [globalFilter, setGlobalFilter] = useState(null)
    const toast = useRef(null)
    const dt = useRef(null)
    const fileUploadRef = useRef(null)

    const apiBaseUrl = getConfig().publicRuntimeConfig.apiBaseUrl
    const baseUrl = getConfig().publicRuntimeConfig.baseUrl

    useEffect(() => {

        async function getItems() {
            const response = await fetch(apiBaseUrl + '/tariffs', { headers: { 'Cache-Control': 'no-cache' } })
            const data = await response.json()
            setItems(data)
        }

        getItems()

    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const openNew = () => {
        setItem(emptyItem)
        setSubmitted(false)
        setItemDialog(true)
    }

    const hideDialog = () => {
        setSubmitted(false)
        setItemDialog(false)
    }

    const hideEditDialog = () => {
        setSubmitted(false)
        setEditItemDialog(false)
    }

    const hideEditImageDialog = () => {
        setSubmitted(false)
        setEditItemImageDialog(false)
    }

    const hideDeleteItemDialog = () => {
        setDeleteItemDialog(false)
    }

    const saveItem = async () => {
        setSubmitted(true)

        if (item.name.trim()) {
            let _items = [...items]
            let _item = { ...item }

            delete _item.img
            _item.type = _item.type.name

            console.log(_item);

            let newItem = await fetch(
                apiBaseUrl + '/tariffs',
                {
                    method: 'POST',
                    body: JSON.stringify(_item),
                    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' }
                }
            )

            newItem = await newItem.json()
            _items.push(newItem)
            toast.current.show({ severity: 'success', summary: 'Отлично', detail: 'Элемент создан', life: 3000 })

            setItems(_items)
            setItemDialog(false)
            setItem(emptyItem)
        }
    }

    const saveEditedItem = async () => {
        setSubmitted(true)

        if (item.name.trim()) {
            let _items = [...items]
            let _item = { ...item }

            delete _item.img
            _item.type = _item.type.name

            let newItem = await fetch(
                apiBaseUrl + '/tariffs/' + _item.id,
                {
                    method: 'PUT',
                    body: JSON.stringify(_item),
                    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' }
                }
            )

            newItem = await newItem.json()
            const index = findIndexById(item.id)
            _items[index] = newItem
            toast.current.show({ severity: 'success', summary: 'Отлично', detail: 'Элемент изменен', life: 3000 })

            setItems(_items)
            setEditItemDialog(false)
            setItem(emptyItem)
        }
    }

    const uploadImage = async (event) => {
        let _items = [...items]

        const file = event.files[0]

        const formData = new FormData()
        formData.append('image', file)

        let xhr = new XMLHttpRequest()
        let xhrRes = null
        xhr.open('POST', apiBaseUrl + '/tariffs/image/' + item.id, true)
        xhr.send(formData)
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                xhrRes = JSON.parse(xhr.responseText)

                const index = findIndexById(item.id)
                _items[index].img = xhrRes.path + '?upd=' + Math.random()
                toast.current.show({ severity: 'success', summary: 'Отлично', detail: 'Изображение сохранена', life: 3000 })

                setItems(_items)
                fileUploadRef.current.clear()
                hideEditImageDialog()
            }
        }

    }

    const deleteItem = async () => {

        let deleteRequest = await fetch(
            apiBaseUrl + '/tariffs/' + item.id,
            {
                method: 'DELETE',
                headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' }
            }
        )

        deleteRequest = await deleteRequest.json()
        let _items = items.filter((val) => val.id !== item.id)

        setItems(_items)
        setDeleteItemDialog(false)
        setItem(emptyItem)
        toast.current.show({ severity: 'success', summary: 'Отлично', detail: 'Элемент удален', life: 3000 })
    }

    const editItem = (item) => {
        let _item = { ...item }
        _item.type = tariffTypes.find(tariffType => tariffType.name == _item.type)

        setItem(_item)
        setEditItemDialog(true)
    }

    const editItemImage = (item) => {
        setItem({ ...item })
        setEditItemImageDialog(true)
    }

    const confirmDeleteItem = (item) => {
        setItem(item)
        setDeleteItemDialog(true)
    }

    const findIndexById = (id) => {
        let index = -1
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                index = i
                break
            }
        }

        return index
    }

    const onInputChange = (e, fieldName) => {
        const val = (e.target && e.target.value) || ''
        let _item = { ...item }
        _item[`${fieldName}`] = val

        setItem(_item)
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Создать" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        )
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Название</span>
                {rowData.name}
            </>
        )
    }

    const typeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Тип</span>
                {rowData.type}
            </>
        )
    }

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Цена</span>
                {rowData.price} ₸
            </>
        )
    }

    const imageBodyTemplate = (rowData) => {

        let path = baseUrl + rowData.img

        if (!rowData.img || rowData.img === null || rowData.img === '')
            path = '/img/placeholder/newsPreview-placeholder.png'

        return (
            <>
                <span className="p-column-title">Превью</span>
                <Image src={path} alt="Image" width="70" preview />
            </>
        )
    }

    const imageUploadTemplate = (rowData) => {
        return (
            <>
                <div className='flex align-items-center flex-column'>
                    <i className='pi pi-image mt-3 p-5' style={{ fontSize: '5em', color: '#999' }}></i>
                    <span className="my-3" style={{ color: '#888' }}>Перетащите изображение сюда. Максимальный размер файла: 1 MB</span>
                </div>
            </>
        )
    }

    const createdAtBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Создан</span>
                {dateAndTime.format(new Date(rowData.created_at), 'DD MMMM YYYY')}
            </>
        )
    }

    const updatedAtBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Обновлен</span>
                {dateAndTime.format(new Date(rowData.updated_at), 'DD MMMM YYYY')}
            </>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-image" className="p-button-rounded p-button-outlined p-button-icon-only mr-2" onClick={() => editItemImage(rowData)} />
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editItem(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteItem(rowData)} />
            </>
        )
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Тарифы</h5>
            {/* <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Поиск..." />
            </span> */}
        </div>
    )

    const itemDialogFooter = (
        <>
            <Button label="Отмена" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Создать" icon="pi pi-check" className="p-button-text" onClick={saveItem} />
        </>
    )

    const editItemDialogFooter = (
        <>
            <Button label="Отмена" icon="pi pi-times" className="p-button-text" onClick={hideEditDialog} />
            <Button label="Сохранить" icon="pi pi-check" className="p-button-text" onClick={saveEditedItem} />
        </>
    )

    const deleteItemDialogFooter = (
        <>
            <Button label="Нет" icon="pi pi-times" className="p-button-text" onClick={hideDeleteItemDialog} />
            <Button label="Да" icon="pi pi-check" className="p-button-text" onClick={deleteItem} />
        </>
    )

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={items}
                        selection={selectedItems}
                        onSelectionChange={(e) => setSelectedItems(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Показаны элементы с {first} по {last}. Всего элементов {totalRecords}"
                        globalFilter={globalFilter}
                        emptyMessage="Элементов не найдено."
                        header={header}
                        responsiveLayout="scroll"
                        sortField="updated_at"
                        sortOrder={-1}
                    >
                        <Column field="name" header="Название" body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="type" header="Тип" body={typeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="price" header="Цена" body={priceBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="image" header="Изображение" body={imageBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="created_at" sortable header="Создан" body={createdAtBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="updated_at" sortable header="Изменен" body={updatedAtBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '13rem' }}></Column>
                    </DataTable>

                    <Dialog visible={itemDialog} header="Создание" modal style={{ width: '650px' }} className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} dismissableMask={true}>

                        <br />

                        <div className='formgrid grid'>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="name">Название</label>
                                <InputText id="name" value={item.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.name })} />
                                {submitted && !item.name && <small className="p-invalid">Название обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="type">Тип</label>
                                <Dropdown value={item.type} onChange={(e) => onInputChange(e, 'type')} options={tariffTypes} optionLabel="name_ru"
                                    placeholder="Выберите тип" className="w-full" />
                                {submitted && !item.type && <small className="p-invalid">Тип обязателен.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="speed">Скорость интернета</label>
                                <InputText id="speed" value={item.speed} onChange={(e) => onInputChange(e, 'speed')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.speed })} />
                                {submitted && !item.speed && <small className="p-invalid">Скорость обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="tv">Количество каналов</label>
                                <InputText id="tv" value={item.tv} onChange={(e) => onInputChange(e, 'tv')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.tv })} />
                                {submitted && !item.tv && <small className="p-invalid">Телевидение обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="price">Цена</label>
                                <InputText id="price" value={item.price} onChange={(e) => onInputChange(e, 'price')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.price })} />
                                {submitted && !item.price && <small className="p-invalid">Цена обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="price_note">Прим. цене</label>
                                <InputText id="price_note" value={item.price_note} onChange={(e) => onInputChange(e, 'price_note')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.price_note })} />
                                {submitted && !item.price_note && <small className="p-invalid">Прим. цене обязательна.</small>}
                            </div>

                            <div className="field col-12">
                                <h5 style={{ margin: 0 }}>Подробнее</h5>
                            </div>

                            <div className="field col-12">
                                <label htmlFor="more_desc">Описание</label>
                                <InputTextarea rows={5} cols={30} id="more_desc" value={item.more_desc} onChange={(e) => onInputChange(e, 'more_desc')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.more_desc })} />
                                {submitted && !item.more_desc && <small className="p-invalid">Описание обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="more_speed">Скорость</label>
                                <InputText id="more_speed" value={item.more_speed} onChange={(e) => onInputChange(e, 'more_speed')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.more_speed })} />
                                {submitted && !item.more_speed && <small className="p-invalid">Скорость обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="more_tv">Телевидение</label>
                                <InputText id="more_tv" value={item.more_tv} onChange={(e) => onInputChange(e, 'more_tv')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.more_tv })} />
                                {submitted && !item.more_tv && <small className="p-invalid">Телевидение обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="more_equip">Оборудование</label>
                                <InputText id="more_equip" value={item.more_equip} onChange={(e) => onInputChange(e, 'more_equip')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.more_equip })} />
                                {submitted && !item.more_equip && <small className="p-invalid">Оборудование обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="more_connect_types">Типы подключения</label>
                                <InputText id="more_connect_types" value={item.more_connect_types} onChange={(e) => onInputChange(e, 'more_connect_types')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.more_connect_types })} />
                                {submitted && !item.more_connect_types && <small className="p-invalid">Типы подключения обязательна.</small>}
                            </div>
                        </div>

                    </Dialog>

                    <Dialog visible={editItemDialog} header="Редактирование" modal style={{ width: '650px' }} className="p-fluid" footer={editItemDialogFooter} onHide={hideEditDialog} dismissableMask={true}>

                        <br />

                        <div className='formgrid grid'>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="name">Название</label>
                                <InputText id="name" value={item.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.name })} />
                                {submitted && !item.name && <small className="p-invalid">Название обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="type">Тип</label>
                                <Dropdown value={item.type} onChange={(e) => onInputChange(e, 'type')} options={tariffTypes} optionLabel="name_ru"
                                    placeholder="Выберите тип" className="w-full" />
                                {submitted && !item.type && <small className="p-invalid">Тип обязателен.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="speed">Скорость интернета</label>
                                <InputText id="speed" value={item.speed} onChange={(e) => onInputChange(e, 'speed')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.speed })} />
                                {submitted && !item.speed && <small className="p-invalid">Скорость обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="tv">Количество каналов</label>
                                <InputText id="tv" value={item.tv} onChange={(e) => onInputChange(e, 'tv')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.tv })} />
                                {submitted && !item.tv && <small className="p-invalid">Телевидение обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="price">Цена</label>
                                <InputText id="price" value={item.price} onChange={(e) => onInputChange(e, 'price')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.price })} />
                                {submitted && !item.price && <small className="p-invalid">Цена обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="price_note">Прим. цене</label>
                                <InputText id="price_note" value={item.price_note} onChange={(e) => onInputChange(e, 'price_note')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.price_note })} />
                                {submitted && !item.price_note && <small className="p-invalid">Прим. цене обязательна.</small>}
                            </div>

                            <div className="field col-12">
                                <h5 style={{ margin: 0 }}>Подробнее</h5>
                            </div>

                            <div className="field col-12">
                                <label htmlFor="more_desc">Описание</label>
                                <InputTextarea rows={5} cols={30} id="more_desc" value={item.more_desc} onChange={(e) => onInputChange(e, 'more_desc')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.more_desc })} />
                                {submitted && !item.more_desc && <small className="p-invalid">Описание обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="more_speed">Скорость</label>
                                <InputText id="more_speed" value={item.more_speed} onChange={(e) => onInputChange(e, 'more_speed')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.more_speed })} />
                                {submitted && !item.more_speed && <small className="p-invalid">Скорость обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="more_tv">Телевидение</label>
                                <InputText id="more_tv" value={item.more_tv} onChange={(e) => onInputChange(e, 'more_tv')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.more_tv })} />
                                {submitted && !item.more_tv && <small className="p-invalid">Телевидение обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="more_equip">Оборудование</label>
                                <InputText id="more_equip" value={item.more_equip} onChange={(e) => onInputChange(e, 'more_equip')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.more_equip })} />
                                {submitted && !item.more_equip && <small className="p-invalid">Оборудование обязательна.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="more_connect_types">Типы подключения</label>
                                <InputText id="more_connect_types" value={item.more_connect_types} onChange={(e) => onInputChange(e, 'more_connect_types')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.more_connect_types })} />
                                {submitted && !item.more_connect_types && <small className="p-invalid">Типы подключения обязательна.</small>}
                            </div>
                        </div>

                    </Dialog>

                    <Dialog visible={editItemImageDialog} style={{ width: '900px' }} header="Редактирование" modal className="p-fluid" onHide={hideEditImageDialog} dismissableMask={true}>

                        <div className="field">
                            <label htmlFor="deactivate_at">Загрузка изображения</label>
                            <FileUpload ref={fileUploadRef} customUpload uploadHandler={uploadImage} accept="image/*" chooseLabel='Выбрать' uploadLabel='Загрузить' cancelLabel='Отменить' maxFileSize={1000000}
                                emptyTemplate={imageUploadTemplate} />
                        </div>

                    </Dialog>

                    <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Подтверждение" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog} dismissableMask={true}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {item && (
                                <span>
                                    Вы уверены что хотите удалить <b>{item.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
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

export default Crud