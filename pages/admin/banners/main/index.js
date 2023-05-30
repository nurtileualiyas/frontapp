import getConfig from 'next/config'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { FileUpload } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import { Image } from 'primereact/image'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { classNames } from 'primereact/utils'
import React, { useEffect, useRef, useState } from 'react'

import { Calendar } from 'primereact/calendar'

const Crud = () => {

    let emptyItem = {
        id: null,
        name: '',
        path: '',
        activate_at: '',
        deactivate_at: '',
        created_at: '',
        updated_at: '',
    }

    const [items, setItems] = useState(null)
    const [itemDialog, setItemDialog] = useState(false)
    const [editItemDialog, setEditItemDialog] = useState(false)
    const [editItemImageDialog, setEditItemImageDialog] = useState(false)
    const [deleteItemDialog, setDeleteItemDialog] = useState(false)
    const [item, setItem] = useState(emptyItem)
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
            const response = await fetch(apiBaseUrl + '/banners', { headers: { 'Cache-Control': 'no-cache' } })
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

        if (item.name.trim() && item.activate_at && item.deactivate_at) {
            let _items = [...items]
            let _item = { ...item }

            _item.activate_at = new Date(_item.activate_at.getTime() - _item.activate_at.getTimezoneOffset() * 60000).toISOString().substring(0, 10)
            _item.deactivate_at = new Date(_item.deactivate_at.getTime() - _item.deactivate_at.getTimezoneOffset() * 60000).toISOString().substring(0, 10)

            let newItem = await fetch(
                apiBaseUrl + '/banners',
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

            _item.activate_at = new Date(_item.activate_at)
            _item.deactivate_at = new Date(_item.deactivate_at)

            _item.activate_at = new Date(_item.activate_at.getTime() - _item.activate_at.getTimezoneOffset() * 60000).toISOString().substring(0, 10)
            _item.deactivate_at = new Date(_item.deactivate_at.getTime() - _item.deactivate_at.getTimezoneOffset() * 60000).toISOString().substring(0, 10)

            delete _item.created_at
            delete _item.updated_at

            let newItem = await fetch(
                apiBaseUrl + '/banners/' + _item.id,
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
        xhr.open('POST', apiBaseUrl + '/banners/image/' + item.id, true)
        xhr.send(formData)
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                xhrRes = JSON.parse(xhr.responseText)

                const index = findIndexById(item.id)
                _items[index].path = xhrRes.path + '?upd=' + Math.random()
                toast.current.show({ severity: 'success', summary: 'Отлично', detail: 'Изображение сохранена', life: 3000 })

                setItems(_items)
                fileUploadRef.current.clear()
                hideEditImageDialog()
            }
        }

    }

    const deleteItem = async () => {

        let deleteRequest = await fetch(
            apiBaseUrl + '/banners/' + item.id,
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
        setItem({ ...item })
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

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || ''
        let _item = { ...item }
        _item[`${name}`] = val

        setItem(_item)
    }

    const onCalendarChange = (e, name) => {
        const val = (e.target && e.target.value) || ''
        let _item = { ...item }
        _item[`${name}`] = val

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

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Изображение</span>
                <Image src={baseUrl + rowData.path} alt="Image" width="180" preview />
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

    const activateAtBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Дата активации</span>
                {rowData.activate_at}
            </>
        )
    }

    const deactivateAtBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Дата деактивации</span>
                {rowData.deactivate_at}
            </>
        )
    }

    const createdAtBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Создан</span>
                {rowData.created_at}
            </>
        )
    }

    const updatedAtBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Обновлен</span>
                {rowData.updated_at}
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
            <h5 className="m-0">Баннеры</h5>
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
                        <Column field="path" header="Изображение" body={imageBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="activate_at" sortable header="Дата активации" body={activateAtBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="deactivate_at" sortable header="Дата деактивации" body={deactivateAtBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="created_at" sortable header="Создан" body={createdAtBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="updated_at" sortable header="Изменен" body={updatedAtBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '13rem' }}></Column>
                    </DataTable>

                    <Dialog visible={itemDialog} style={{ width: '450px' }} header="Создание" modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} dismissableMask={true}>

                        <div className="field">
                            <label htmlFor="name">Название</label>
                            <InputText id="name" value={item.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.name })} />
                            {submitted && !item.name && <small className="p-invalid">Название баннера обязательна.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="activate_at">Дата активации</label>
                            <Calendar dateFormat="yy-mm-dd" showIcon showButtonBar value={item.activate_at} onChange={(e) => onCalendarChange(e, 'activate_at')} required className={classNames({ 'p-invalid': submitted && !item.activate_at })}></Calendar>
                            {submitted && !item.activate_at && <small className="p-invalid">Дата активации обязательна.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="deactivate_at">Дата деактивации</label>
                            <Calendar dateFormat="yy-mm-dd" showIcon showButtonBar value={item.deactivate_at} onChange={(e) => onCalendarChange(e, 'deactivate_at')} required className={classNames({ 'p-invalid': submitted && !item.deactivate_at })}></Calendar>
                            {submitted && !item.deactivate_at && <small className="p-invalid">Дата деактивации обязательна.</small>}
                        </div>

                    </Dialog>

                    <Dialog visible={editItemDialog} style={{ width: '450px' }} header="Редактирование" modal className="p-fluid" footer={editItemDialogFooter} onHide={hideEditDialog} dismissableMask={true}>

                        <div className="field">
                            <label htmlFor="name">Название</label>
                            <InputText id="name" value={item.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.name })} />
                            {submitted && !item.name && <small className="p-invalid">Название баннера обязательна.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="activate_at">Дата активации</label>
                            <Calendar dateFormat="yy-mm-dd" showIcon showButtonBar value={new Date(item.activate_at)} onChange={(e) => onCalendarChange(e, 'activate_at')} required className={classNames({ 'p-invalid': submitted && !item.activate_at })}></Calendar>
                            {submitted && !item.activate_at && <small className="p-invalid">Дата активации обязательна.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="deactivate_at">Дата деактивации</label>
                            <Calendar dateFormat="yy-mm-dd" showIcon showButtonBar value={new Date(item.deactivate_at)} onChange={(e) => onCalendarChange(e, 'deactivate_at')} required className={classNames({ 'p-invalid': submitted && !item.deactivate_at })}></Calendar>
                            {submitted && !item.deactivate_at && <small className="p-invalid">Дата деактивации обязательна.</small>}
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