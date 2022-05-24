import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import api from './Components/Api'
import Footer from './Components/Footer'
import Header from './Components/Header'
import './AddBookPage.css'
import { Descriptions, Button, Modal } from 'antd';
import { Form, Input, InputNumber, DatePicker, Space, Select } from 'antd';
import { Navigate } from 'react-router-dom'
const { Option } = Select;
const { TextArea } = Input;

const AddBookPage = () => {
    const navigate = useNavigate()
    const [images, setImages] = useState([])
    const [imagePath, setImagePath] = useState([])
    const [title, setTitle] = useState([])
    const [author, setAuthor] = useState([])
    const [isbn, setIsbn] = useState([])
    const [publisher, setPublisher] = useState([])
    const [pubdate, setPubdate] = useState([])
    const [type, setType] = useState([])
    const [synopsis, setSynopsis] = useState([])
    const [stock, setStock] = useState(0)

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setType(value)
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setPubdate(dateString)
    };

    const onChangeStock = (value) => {
        console.log('changed', value);
        setStock(value)
    };

    const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 12 },
    };

    const addbookAction = async (e) => {
        e.preventDefault()
        console.log(title+ author+ isbn+ publisher+ pubdate+ synopsis+ stock+type)

        const uploadData = new FormData()
        uploadData.append('images',images)

        var data
        data = await api.createBook(title, author, isbn, publisher, pubdate, type, synopsis, stock)
        const imageData = await api.createBookImage(data.data[0].id, uploadData)

        console.log(data)

        navigate('/')
    }

    return(
        <div className='add-book-whole-form'>
            <Header />
            <div className='add-book-form-design'>
                <h1>添加书籍</h1>
                <br />

                <div className='image-preview-whole-box'>
                    <img src={imagePath} className='image-preview-box' alt='preview-img'/>
                </div>

                <br />
                
                <div className='book-image-form'>
                    <input
                        name={images}
                        type='file'
                        onChange={event => {setImages(event.target.files[0]); setImagePath(URL.createObjectURL(event.target.files[0]))}}
                        accept='image/*' required/>
                </div>

                <br />
                            
                <Form {...formItemLayout}>

                    <Form.Item
                        label="书名"
                        name="title"
                        rules={[{ required: true, message: '请输入书名' }]}
                    >
                        <Input
                            onChange={event => setTitle(event.target.value)} 
                            placeholder="请输入书名"/>
                    </Form.Item>

                    <Form.Item
                        label="作者"
                        name="author"
                        rules={[{ required: true, message: '请输入作者' }]}
                    >
                        <Input
                            onChange={event => setAuthor(event.target.value)} 
                            placeholder="请输入作者"/>
                    </Form.Item>

                    <Form.Item
                        label="国际标准书号"
                        name="isbn"
                        rules={[{ required: true, message: '请输入国际标准书号' }]}
                    >
                        <Input
                            onChange={event => setIsbn(event.target.value)} 
                            placeholder="请输入国际标准书号"/>
                    </Form.Item>

                    <Form.Item
                        label="出版社"
                        name="publisher"
                        rules={[{ required: true, message: '请输入出版社' }]}
                    >
                        <Input
                            onChange={event => setPublisher(event.target.value)} 
                            placeholder="请输入出版社"/>
                        </Form.Item>

                    <Form.Item
                        label="出版日期"
                        name="pubdate"
                        rules={[{ required: true, message: '请输入出版日期' }]}
                    >
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <DatePicker style={{ width: '100%' }} onChange={onChange} placeholder='请选择出版日期'/>
                        </Space>
                    </Form.Item>

                    <Form.Item
                        label="书籍类型"
                        name="type"
                        rules={[{ required: true, message: '请选择书籍类型' }]}
                    >
                        <Select
                            defaultValue="法律"
                            style={{
                                width: 150,
                            }}
                            onChange={handleChange}
                        >
                            <Option value='法律'>法律</Option>
                            <Option value='教育'>教育</Option>
                            <Option value='科技'>科技</Option>
                            <Option value='科学'>科学</Option>
                            <Option value='漫画'>漫画</Option>
                            <Option value='体育'>体育</Option>
                            <Option value='文学'>文学</Option>
                            <Option value='医学'>医学</Option>
                            <Option value='哲学'>哲学</Option>
                            <Option value='参考书'>参考书</Option>
                            <Option value='儿童读物'>儿童读物</Option>
                            <Option value='外国历史'>外国历史</Option>
                            <Option value='外国文化'>外国文化</Option>
                            <Option value='休闲娱乐'>休闲娱乐</Option>
                            <Option value='中国历史'>中国历史</Option>
                            <Option value='中国文化'>中国文化</Option>
                            <Option value='计算机与网络'>计算机与网络</Option>
                            <Option value='家居与园艺'>家居与园艺</Option>
                            <Option value='家庭与育儿'>家庭与育儿</Option>
                            <Option value='旅游与自然'>旅游与自然</Option>
                            <Option value='商业与投资'>商业与投资</Option>
                            <Option value='传记与自传'>传记与自传</Option>
                            <Option value='宗教与精神生活'>宗教与精神生活</Option>
                            <Option value='其他'>其他</Option>
                        </Select>

                    </Form.Item>

                    <Form.Item
                        label="库存"
                        name="synopsis"
                        rules={[{ required: true, message: '请输入书籍库存' }]}
                    >
                        <InputNumber
                            onChange={onChangeStock}
                            style={{ width: '100%' }}
                            placeholder="请输入书籍库存"/>
                    </Form.Item>

                    <Form.Item
                        label="书籍简介"
                        name="stock"
                        rules={[{ required: true, message: '请输入书籍简介' }]}
                    >
                        <TextArea showCount placeholder='请输入书籍简介' maxLength={500} style={{ height: 150 }} onChange={event => setSynopsis(event.target.value)} />
                    </Form.Item>

                    <Button type="primary" className='add-book-button' onClick={addbookAction}>添加</Button>
                    
                </Form>
            </div>
            
            <Footer />
        </div>
    )

}

export default AddBookPage