import { withLayout } from '../../hocs'

import Profile from './Profile'

const ProfileContainer = () => {
    const ProfileWithLayout = withLayout(Profile)

    const paths = [
        { value: 'Главная', url: '/home' },
        { value: 'Профиль', url: '/profile' },
    ]
   
    return <ProfileWithLayout title="Профиль" paths={paths} />
}

export default ProfileContainer