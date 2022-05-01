import { Link } from 'react-router-dom'
import { Button } from 'antd'

const Admin = () => {
    return (
      <div>
          <Link to="/goods/new">
              <Button type="primary" onClick={e => e.stopPropagation()}>Новая услуга / товар</Button>        
          </Link>
      </div>

    )
    
}

export default Admin