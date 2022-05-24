import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import api from './Components/Api'
import Cookies from 'js-cookie'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { Form, Input, InputNumber, Button, Select, DatePicker, Space } from 'antd';
const { TextArea } = Input;

const EditBookPage = () => {
    let {bookId, bookTitle, bookAuthor} = useParams();
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publisher, setPublisher] = useState('')
    const [pubdate, setPubdate] = useState([])
    const [isbn, setIsbn] = useState([])
    const [synopsis, setSynopsis] = useState([])
    const [stock, setStock] = useState([])
    const [book, setBook] = useState([])
    const [images, setImages] = useState([])

    const onChange1 = (e) => {
        console.log('Change:', e.target.value);
      };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 14 },
    };

    const fetchImages = async() => {
        const data = await api.getFirstBookImage(bookId)
        //console.log(data)
        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    const fetchBook = async() => {
        const data = await api.getBook(bookId)
        return data.data[0]
    } 

    useEffect(() => {
        const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        const getBook = async() => {
            const bookFromServer = await fetchBook()
            setBook(bookFromServer)
        }

        getImages()
        getBook()
    }, [])


    return(
        <div>
            <Header />
            <h1>{bookTitle}</h1>
            
            <div className='form-design'>
                <h1>修改书籍</h1>
                
                <br />
                
                <Form {...formItemLayout}>

                    <Form.Item
                        label="书名"
                        name="title"
                        rules={[{ required: true, message: '请输入书名' }]}
                    >
                        <Input
                            defaultValue={bookId}
                            onChange={event => setTitle(event.target.value)} 
                            placeholder="请输入书名"/>
                    </Form.Item>

                    <Form.Item
                        label="作者"
                        name="author"
                        rules={[{ required: true, message: '请输入作者' }]}
                    >
                        <Input
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
                            onChange={event => setIsbn(event.target.value)} 
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
                        label="库存"
                        name="synopsis"
                        rules={[{ required: true, message: '请输入书籍库存' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            onChange={event => setStock(event.target.value)} 
                            placeholder="请输入书籍库存"/>
                    </Form.Item>

                    <Form.Item
                        label="书籍简介"
                        name="stock"
                        rules={[{ required: true, message: '请输入书籍简介' }]}
                    >
                        <TextArea showCount placeholder='请输入书籍简介' maxLength={500} onChange={event => setSynopsis(event.target.value)} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 3 }}>
                        <Button type="primary" htmlType="submit">
                        修改
                        </Button>

                        <Button type="primary" htmlType="submit" danger>
                        取消
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <Footer />
        </div>
    )

}

export default EditBookPage