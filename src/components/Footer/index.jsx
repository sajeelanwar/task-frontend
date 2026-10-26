import { Col, Row, Typography } from 'antd'

const { Paragraph } = Typography

const year = new Date().getFullYear()

const Footer = () => {
    return (
        <footer className='py-3' style={{ backgroundColor: "#1d3557" }}>
            <div className='max-w-7xl mx-auto'>
                <Row>
                    <Col span={24}>
                        <Paragraph className='text-center text-white! text-lg! mb-0!'>&copy; {year} Created by Sajeel</Paragraph>
                    </Col>
                </Row>
            </div>
        </footer>
    )
}

export default Footer