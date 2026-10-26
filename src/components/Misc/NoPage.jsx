import { Col, Row, Typography } from 'antd'

const { Title } = Typography

const NoPage = () => {
    return (
        <div className='max-w-7xl mx-auto py-4'>
            <Row>
                <Col span={24}>
                    <Title level={1} className="text-center">404 Page Not Found</Title>
                </Col>
            </Row>
        </div>
    )
}

export default NoPage