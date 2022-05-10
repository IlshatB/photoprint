import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { withLayout } from '../../hocs'
import { categories, categoriesList } from '../../helpers'
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
    }, [edit, goodId])

    const handleCreate = async values => {
        const variables = { ...values, category: categoriesList.find(c => c.value === values.category).value, images: values.imgInfo?.fileList }

        try {
            const { data } = await axios.post('/api/goods/create', variables, { headers: { "Content-Type": "application/json" } })
            const { good } = await data

            navigate(`/${good.category}/${good._id}`)
        } catch (err) {
            console.log(err)
            setError(err.response.data)
        }
    }

    const handleSave = async values => {
        const { name, description, subDescription, category, productionTime, price, sale, size, type } = values

        const sizes0 = values['sizes-0']
        const sizes1 = values['sizes-1']
        const sizes2 = values['sizes-2']
        const sizes3 = values['sizes-3']
        const sizes4 = values['sizes-4']

        const types0 = values['types-0']
        const types1 = values['types-1']
        const types2 = values['types-2']
        const types3 = values['types-3']
        const types4 = values['types-4']

        const variables = {
            name,
            description,
            subDescription,
            category: categoriesList.find(c => c.value === category).value,
            images: values.imgInfo?.fileList,
            productionTime,
            price,
            sale,
            ...(size && { size, sizes: [] }),
            ...(type && { type, types: [] }),
            ...(sizes0 && {
                sizes: [
                    sizes0,
                    sizes1,
                    sizes2,
                    sizes3,
                    sizes4,
                ].filter(s => !!s !== false),
                size: null,
            }),
            ...(types0 && {
                types: [
                    types0,
                    types1,
                    types2,
                    types3,
                    types4,
                ].filter(s => !!s !== false),
                type: null,
            }),
        }

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
            const { data } = await axios.patch(`/api/goods/delete/good/${goodId}`, { headers: { "Content-Type": "application/json" } })
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
                { value: categories[`${category}`], url: `/${category}` },
                { value: name, url: `/${category}/${id}` },
                { value: 'Редактирование', url: '' },
            ] : [
                { value: 'Профиль', url: '/profile' },
                { value: 'Создание', url: '' }
            ]),
        ]
    }, [name, id, category, edit])

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