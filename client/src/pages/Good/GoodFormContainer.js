import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { withLayout } from '../../hocs'
import { getCategoryTitle, storage } from '../../helpers'
import NotFound from '../../components/NotFound/NotFound'

import GoodForm from './GoodForm'

const GoodFormContainer = ({ edit = false }) => {
    const { goodId } = useParams()
    const navigate = useNavigate()

    const [good, setGood] = useState()
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const { data } = await axios.get(`/api/goods/fetch/good/${goodId}`, { headers: { "Content-Type": "application/json" } })
                setGood(data.good)
                setTimeout(() => setLoading(false), 500)
            } catch (e) {
                setError(e.response.data)
            }
        }

        if (edit) fetchData()
    }, [])

    const handleCreate = async values => {
        const filesArray = values.imgInfo.fileList
        const firebasePaths = []
        try {
            if (!!filesArray.length) {
                for (let key in filesArray) {
                    const snapshot = await storage
                        .ref("images/" + filesArray[key].name)
                        .put(filesArray[key].originFileObj)
                    const url = await snapshot.ref.getDownloadURL()
                    const firebaseInfo = {
                        name: filesArray[key].name,
                        url,
                        thumbUrl: url
                    }
                    firebasePaths.push(firebaseInfo)
                };
            }
            const variables = { ...values, category: values.category.value, images: firebasePaths }
            delete variables.imgInfo
            try {
                const { data } = await axios.post('/api/goods/create', variables, { headers: { "Content-Type": "application/json" } })

                const { good } = await data

                navigate(`/${good.category}/${good._id}`)
            } catch (err) {
                setError(err.response.data)
            }
        }
        catch (err) {
            setError(err.response.data)
        }
    }

    const handleSave = async values => {
        // const filesArray = values.imgInfo.fileList
        const variables = { ...values, category: values.category.value }
        console.log(variables)

        try {
            const { data } = await axios.patch(`/api/goods/update/good/${goodId}`, variables, { headers: { "Content-Type": "application/json" } })
            const { good } = await data

            navigate(`/${good.category}/${good._id}`)
        } catch (err) {
            setError(err.response.data)
        }
    }

    const handleDelete = async () => {
        setDeleteLoading(true)
        try {
            const { data } = await axios.delete(`/api/goods/delete/good/${goodId}`, { headers: { "Content-Type": "application/json" } })
            const { success } = data
            setTimeout(() => {
                setDeleteLoading(false)
                return success ? Promise.resolve() : Promise.reject()
            }, 750)
        } catch (e) {
            setError(e.response.data)
        }
    }

    const { name, id, category } = useMemo(() => {
        const name = good?.name ?? 'loading'
        const id = good?._id ?? 'loading'
        const category = good?.category ?? 'loading'

        return { name, id, category }
    }, [good?.name, good?._id, good?.category])

    const paths = useMemo(() => {
        return [
            { value: 'Главная', url: '/home' },
            ...(edit ? [
                { value: getCategoryTitle(category), url: `/${category}` },
                { value: name, url: `/${category}/${id}` },
                { value: 'Редактирование', url: '' },
            ] : [
                { value: 'Профиль', url: '/profile' },
                { value: 'Создание', url: '' }
            ]),
        ]
    }, [name, id, category])

    const GoodFormWithLayout = withLayout(GoodForm)
    return error
        ? <NotFound title={error} />
        : (
            <GoodFormWithLayout
                title={name}
                paths={paths}
                good={good}
                loading={loading}
                deleteLoading={deleteLoading}
                edit={edit}
                onFinish={edit ? handleSave : handleCreate}
                onDelete={handleDelete}
            />
        )
}

export default GoodFormContainer