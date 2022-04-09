
import { Carousel, Image } from 'antd';
import { geekblue } from '@ant-design/colors'

import otkrytka from '../../assets/main/otkrytka.png'
import photoalbom from '../../assets/main/photoalbom.jpg'

const contentStyle = {
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: geekblue[0],
};

const Main = () => {
    return (
        <Carousel autoplay >
          <div>
            <div style={contentStyle}>
              <Image height={300} src={otkrytka} preview={false} />
            </div>
          </div>
          <div>
            <div style={contentStyle}>
              <Image height={300} src={photoalbom} preview={false} />
            </div>
          </div>
      </Carousel>
    )
}

export default Main