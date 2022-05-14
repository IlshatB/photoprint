import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { withLayout } from '../../hocs'
import { useConfig } from '../../hooks'
import { categories, categoriesList } from '../../helpers'

import NotFound from '../../components/NotFound/NotFound'

import GoodForm from './GoodForm'

const GoodFormContainer = ({ edit = false }) => {
    const navigate = useNavigate()
    const { goodId } = useParams()

    const config = useConfig()
    console.log(config)
    const [good, setGood] = useState()
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const { data } = await axios.get(`/api/goods/fetch/good/${goodId}`, config)
                setGood(data?.good)

                setTimeout(() => setLoading(false), 500)
            } catch (e) {
                setError(e.response.data)
            }
        }

        if (edit) fetchData()
    }, [edit, goodId, config])

    const handleCreate = async values => {
        const { size, type } = values

        const sizes0 = values['sizes-0']
        const sizes1 = values['sizes-1']
        const sizes2 = values['sizes-2']
        const sizes3 = values['sizes-3']
        const sizes4 = values['sizes-4']

        const sizesCost0 = values['sizes-cost-0'] || 0
        const sizesCost1 = values['sizes-cost-1'] || 0
        const sizesCost2 = values['sizes-cost-2'] || 0
        const sizesCost3 = values['sizes-cost-3'] || 0
        const sizesCost4 = values['sizes-cost-4'] || 0

        const types0 = values['types-0']
        const types1 = values['types-1']
        const types2 = values['types-2']
        const types3 = values['types-3']
        const types4 = values['types-4']

        const typesCost0 = values['types-cost-0'] || 0
        const typesCost1 = values['types-cost-1'] || 0
        const typesCost2 = values['types-cost-2'] || 0
        const typesCost3 = values['types-cost-3'] || 0
        const typesCost4 = values['types-cost-4'] || 0

        const variables = {
            ...values, 
            ...(size && { size, sizes: [] }),
            ...(type && { type, types: [] }),
            ...(sizes0 && {
                sizes: [
                    { value: sizes0, cost: sizesCost0 },
                    { value: sizes1, cost: sizesCost1 },
                    { value: sizes2, cost: sizesCost2 },
                    { value: sizes3, cost: sizesCost3 },
                    { value: sizes4, cost: sizesCost4 },
                ].filter(s => !!s !== false),
                size: null,
            }),
            ...(types0 && {
                types: [
                    { value: types0, cost: typesCost0 },
                    { value: types1, cost: typesCost1 },
                    { value: types2, cost: typesCost2 },
                    { value: types3, cost: typesCost3 },
                    { value: types4, cost: typesCost4 },
                ].filter(s => !!s !== false),
                type: null,
            }),
            category: categoriesList.find(c => c.value === values.category).value, 
            images: values.imgInfo?.fileList,
        }

        try {
            const { data } = await axios.post('/api/goods/create', variables, config)
            const { good } = await data

            navigate(`/${good.category}/${good._id}`)
        } catch (err) {
            console.log(err)
            setError(err.response.data)
        }
    }

    const handleSave = async values => {
        const { name, description, subDescription, category, productionTime, price, sale, size, type, allowAttach, multiAttach } = values

        const sizes0 = values['sizes-0']
        const sizes1 = values['sizes-1']
        const sizes2 = values['sizes-2']
        const sizes3 = values['sizes-3']
        const sizes4 = values['sizes-4']

        const sizesCost0 = values['sizes-cost-0'] || 0
        const sizesCost1 = values['sizes-cost-1'] || 0
        const sizesCost2 = values['sizes-cost-2'] || 0
        const sizesCost3 = values['sizes-cost-3'] || 0
        const sizesCost4 = values['sizes-cost-4'] || 0

        const types0 = values['types-0']
        const types1 = values['types-1']
        const types2 = values['types-2']
        const types3 = values['types-3']
        const types4 = values['types-4']

        const typesCost0 = values['types-cost-0'] || 0
        const typesCost1 = values['types-cost-1'] || 0
        const typesCost2 = values['types-cost-2'] || 0
        const typesCost3 = values['types-cost-3'] || 0
        const typesCost4 = values['types-cost-4'] || 0

        const variables = {
            name,
            description,
            subDescription,
            category: categoriesList.find(c => c.value === category).value,
            images: values.imgInfo?.fileList,
            productionTime,
            price,
            allowAttach,
            multiAttach,
            sale,
            ...(size && { size, sizes: [] }),
            ...(type && { type, types: [] }),
            ...(sizes0 && {
                sizes: [
                    { value: sizes0, cost: sizesCost0 },
                    { value: sizes1, cost: sizesCost1 },
                    { value: sizes2, cost: sizesCost2 },
                    { value: sizes3, cost: sizesCost3 },
                    { value: sizes4, cost: sizesCost4 },
                ].filter(s => !!s.value !== false),
                size: null,
            }),
            ...(types0 && {
                types: [
                    { value: types0, cost: typesCost0 },
                    { value: types1, cost: typesCost1 },
                    { value: types2, cost: typesCost2 },
                    { value: types3, cost: typesCost3 },
                    { value: types4, cost: typesCost4 },
                ].filter(t => !!t.value !== false),
                type: null,
            }),
        }

        try {
            const { data } = await axios.patch(`/api/goods/update/good/${goodId}`, variables, config)
            const { good } = await data
            navigate(`/${good.category}/${good._id}`)
        } catch (err) {
            setError(err.response.data)
        }
    }

    const handleDelete = async () => {
        setDeleteLoading(true)
        try {
            const { data } = await axios.patch(`/api/goods/delete/good/${goodId}`, {}, config)
            const { success } = await data
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