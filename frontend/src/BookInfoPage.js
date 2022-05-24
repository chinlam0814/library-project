import {useState, useEffect} from 'react'
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import api from './Components/Api'
import Cookies from 'js-cookie'
import moment from 'moment'
import Footer from './Components/Footer'
import Header from './Components/Header'
import './BookInfoPage.css'
import { Descriptions, Button, Modal } from 'antd';
import { Form, Input, InputNumber, DatePicker, Space } from 'antd';
const { TextArea } = Input;

const MainPage = () => {
    let loggedInType = Cookies.get('user')
    let {bookId} = useParams();
    const [image, setImages] = useState([])
    const [book, setBook] = useState([])
    const navigate = useNavigate()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publisher, setPublisher] = useState('')
    const [pubdate, setPubdate] = useState([])
    const [isbn, setIsbn] = useState([])
    const [synopsis, setSynopsis] = useState([])
    const [stock, setStock] = useState(0)

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const borrowloginAction = async(e) => {
        if(loggedInType !== 'Student' && loggedInType !== 'Admin'){
            navigate('/login')
        }
    }

    const editAction = async() => {
        //const data = await api.deleteBook(bookId)
        //navigate('/edit')
        //return(data)
    }

    const deleteAction = async() => {
        const data = await api.deleteBook(bookId)
        navigate('/')
        return(data)
    }

    const borrowAction = async() => {
        console.log('borrow test')
        const data = await api.createBorrow(bookId)
        navigate('/')
        return(data)
    }

    const fetchImages = async() => {
        const data = await api.getFirstBookImage(bookId)
        //console.log(data)
        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    const fetchBook = async() => {
        const data = await api.getBook(bookId)
        console.log(data.data[0])
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

    if(loggedInType === 'Student'){
        if(book.stock === 0){
            return(
                <div>
                    <Header />
                    
                    <div className='book-info-whole-box'>
                        <Descriptions title={book.title} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="书籍照片" span={5}><img src={ image? image.image_url : '0'} alt='img' className='book-image-box' /></Descriptions.Item>
                        <Descriptions.Item label="作者" span={3}>{book.author}</Descriptions.Item>
                        <Descriptions.Item label="类型" span={2}>{book.type}</Descriptions.Item>
                        <Descriptions.Item label="国际标准书号" span={2}>{book.isbn}</Descriptions.Item>
                        <Descriptions.Item label="出版社" span={2}>{book.publisher}</Descriptions.Item>
                        <Descriptions.Item label="出版日期" span={1}>{book.pubdate}</Descriptions.Item>
                        <Descriptions.Item label="书籍简介" span={3}>{book.synopsis}<br /><br /></Descriptions.Item>
                        </Descriptions>

                        <br/>
                        
                        <Button type="primary" danger>
                        暂无库存
                        </Button>
                    
                    </div>
        
                    <Footer />
                </div>
            )
        }
        else if(book.stock !== 0){
            return(
                <div>
                    <Header />
                    
                    <div className='book-info-whole-box'>
                        <Descriptions title={book.title} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="书籍照片" span={5}><img src={ image? image.image_url : '0'} alt='img' className='book-image-box' /></Descriptions.Item>
                        <Descriptions.Item label="作者" span={3}>{book.author}</Descriptions.Item>
                        <Descriptions.Item label="类型" span={2}>{book.type}</Descriptions.Item>
                        <Descriptions.Item label="国际标准书号" span={2}>{book.isbn}</Descriptions.Item>
                        <Descriptions.Item label="出版社" span={2}>{book.publisher}</Descriptions.Item>
                        <Descriptions.Item label="出版日期" span={1}>{book.pubdate}</Descriptions.Item>
                        <Descriptions.Item label="书籍简介" span={3}>{book.synopsis}<br /><br /></Descriptions.Item>
                        </Descriptions>

                        <br/>
                        
                        <Button type="primary" onClick={borrowAction}>
                        借书
                        </Button>
                    
                    </div>
        
                    <Footer />
                </div>
            )
        }
    }
    else if(loggedInType === 'Admin'){
        return(
            <div>
                <Header />
                
                <div className='book-info-whole-box'>
                        <Descriptions title={book.title} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="书籍照片" span={5}><img src={ image? image.image_url : '0'} alt='img' className='book-image-box' /></Descriptions.Item>
                        <Descriptions.Item label="作者" span={3}>{book.author}</Descriptions.Item>
                        <Descriptions.Item label="类型" span={1}>{book.type}</Descriptions.Item>
                        <Descriptions.Item label="国际标准书号" span={2}>{book.isbn}</Descriptions.Item>
                        <Descriptions.Item label="出版社" span={1}>{book.publisher}</Descriptions.Item>
                        <Descriptions.Item label="出版日期" span={1}>{book.pubdate}</Descriptions.Item>
                        <Descriptions.Item label="库存" span={1}>{book.stock}</Descriptions.Item>
                        <Descriptions.Item label="书籍简介" span={3}>{book.synopsis}<br /><br /></Descriptions.Item>
                    </Descriptions>

                    <br/>
                    
                    <Button type="primary" className='edit-button' onClick={showModal}>
                    编辑
                    </Button>
                    <Modal title="修改书籍" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} style={{ top: 10 }}
                    footer={[
                        <Button key="back" onClick={handleCancel} danger>
                          取消
                        </Button>,
                        <Button key="submit">
                          编辑
                        </Button>,
                      ]}>
                    <div className='mdoel-form-design'>
                        
                        <br />
                        
                        <Form {...formItemLayout}>

                            <Form.Item
                                label="书名"
                                name="title"
                                rules={[{ required: true, message: '请输入书名' }]}
                            >
                                <Input
                                    defaultValue={book.title}
                                    onChange={event => setTitle(event.target.value)} 
                                    placeholder="请输入书名"/>
                            </Form.Item>

                            <Form.Item
                                label="作者"
                                name="author"
                                rules={[{ required: true, message: '请输入作者' }]}
                            >
                                <Input
                                    defaultValue={book.author}
                                    onChange={event => setAuthor(event.target.value)} 
                                    placeholder="请输入作者"/>
                            </Form.Item>

                            <Form.Item
                                label="国际标准书号"
                                name="isbn"
                                rules={[{ required: true, message: '请输入国际标准书号' }]}
                            >
                                <Input
                                    defaultValue={book.isbn}
                                    onChange={event => setIsbn(event.target.value)} 
                                    placeholder="请输入国际标准书号"/>
                            </Form.Item>

                            <Form.Item
                                label="出版社"
                                name="publisher"
                                rules={[{ required: true, message: '请输入出版社' }]}
                            >
                                <Input
                                    defaultValue={book.publisher}
                                    onChange={event => setIsbn(event.target.value)} 
                                    placeholder="请输入出版社"/>
                            </Form.Item>

                            <Form.Item
                                label="出版日期"
                                name="pubdate"
                                rules={[{ required: true, message: '请输入出版日期' }]}
                            >
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <DatePicker style={{ width: '100%' }} defaultValue={moment(book.pubdate)} onChange={onChange} placeholder='请选择出版日期'/>
                                </Space>
                            </Form.Item>

                            <Form.Item
                                label="库存"
                                name="synopsis"
                                rules={[{ required: true, message: '请输入书籍库存' }]}
                            >
                                <InputNumber
                                    defaultValue={book.stock}
                                    style={{ width: '100%' }}
                                    placeholder="请输入书籍库存"/>
                            </Form.Item>

                            <Form.Item
                                label="书籍简介"
                                name="stock"
                                rules={[{ required: true, message: '请输入书籍简介' }]}
                            >
                                <TextArea showCount placeholder='请输入书籍简介' defaultValue={book.synopsis} maxLength={500} style={{ height: 150 }} onChange={event => setSynopsis(event.target.value)} />
                            </Form.Item>
                        </Form>
                    </div>
                    </Modal>
                    <Button type="primary" onClick={deleteAction} danger>
                    删除
                    </Button>
                
                </div>

    
                <Footer />
            </div>
        )
    }

    return(
        <div className='book-info'>
            <Header />

            <div className='book-info-whole-box'>
                <Descriptions title={book.title} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="书籍照片" span={5}><img src={ image? image.image_url : '0'} alt='img' className='book-image-box' /></Descriptions.Item>
                        <Descriptions.Item label="作者" span={3}>{book.author}</Descriptions.Item>
                        <Descriptions.Item label="类型" span={2}>{book.type}</Descriptions.Item>
                        <Descriptions.Item label="国际标准书号" span={2}>{book.isbn}</Descriptions.Item>
                        <Descriptions.Item label="出版社" span={2}>{book.publisher}</Descriptions.Item>
                        <Descriptions.Item label="出版日期" span={1}>{book.pubdate}</Descriptions.Item>
                        <Descriptions.Item label="书籍简介" span={3}>{book.synopsis}<br /><br /></Descriptions.Item>
                </Descriptions>

                <br/>

                <Button type="primary" onClick={borrowloginAction}>
                还未登录
                </Button>
            
            </div>

            <Footer />
        </div>
    )

}

export default MainPage