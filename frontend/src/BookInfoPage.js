import {useState, useEffect} from 'react'
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import api from './Components/Api'
import Cookies from 'js-cookie'
import moment, { relativeTimeThreshold } from 'moment'
import Footer from './Components/Footer'
import Header from './Components/Header'
import './BookInfoPage.css'
import { Descriptions, Button, Modal, Form, Input, InputNumber, DatePicker, Space, message, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

const MainPage = () => {
    let loggedInType = Cookies.get('user')
    let id = Cookies.get('user_id')
    let {bookId} = useParams();
    const navigate = useNavigate()
    const [image, setImages] = useState([])
    const [book, setBook] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publisher, setPublisher] = useState('')
    const [pubdate, setPubdate] = useState([])
    const [isbn, setIsbn] = useState([])
    const [synopsis, setSynopsis] = useState([])
    const [stock, setStock] = useState(0)
    const [type, setType] = useState([])
    const [borrownum, setBorrownum] = useState([])

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setPubdate(dateString)
    };

    const onChange1 = (value) => {
        console.log('changed', value);
        setStock(value)
      };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setType(value)
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };

    const borrowloginAction = async(e) => {
        if(loggedInType !== 'Student' && loggedInType !== 'Admin'){
            navigate('/login')
        }
    }

    const editAction = async() => {
        console.log('edit book')
        console.log(title + ' ' + author + ' ' + isbn + ' ' + publisher + ' ' + pubdate + ' ' + type + ' ' + stock + ' ' + synopsis)
        //const data = await api.deleteBook(bookId)
        //navigate('/edit')
        //return(data)

        if(title.length === 0){
            message.error('请输入书籍名称！')
        }
        else if(author.length === 0){
            message.error('请输入书籍作者！')
        }
        else if(type.length === 0){
            message.error('请选择书籍类型！')
        }
        else if(isbn.length === 0){
            message.error('请输入书籍国际标准书号！')
        }
        else if(publisher.length === 0){
            message.error('请输入书籍出版社！')
        }
        else if(pubdate === ''){
            message.error('请输入书籍出版日期！')
        }
        else if(stock === null){
            message.error('请输入书籍库存！')
        }
        else if(synopsis.length === 0){
            message.error('请输入书籍简介！')
        }
        else{
            const data = await api.editBook(bookId, title, author, type, isbn, publisher, pubdate, stock, synopsis)
            message.success('成功修改书籍详情！')
            console.log(data)
            window.location.reload(false)
        }
    }

    const deleteAction = async() => {
        const data = await api.deleteBook(bookId)
        navigate('/')
        return(data)
    }

    const borrowAction = async() => {
        console.log('borrow test')
        console.log(borrownum.length)

        if(borrownum.length === 5){
            message.error('正在借阅的书籍已有5本！')
        }
        else{
            const data = await api.createBorrow(bookId)
            console.log(data)
            if(data.errorCode === 0){
                message.success('借书成功！')
                navigate('/')
            }
            else{
                message.error('借书失败！')
            }
        }
    }

    const fetchImages = async() => {
        const data = await api.getFirstBookImage(bookId)
        //console.log(data)
        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    const fetchBook = async() => {
        const data = await api.getBook(bookId)
        //console.log(data.data[0])
        setTitle(data.data[0].title)
        setAuthor(data.data[0].author)
        setType(data.data[0].type)
        setIsbn(data.data[0].isbn)
        setPubdate(data.data[0].pubdate)
        setPublisher(data.data[0].publisher)
        setStock(data.data[0].stock)
        setSynopsis(data.data[0].synopsis)
        return data.data[0]
    }

    const fetchBorrownum = async() => {
        if(loggedInType === 'Student'){
            const data = await api.getStudentBorrowStatusList(id)
            console.log(data.data[0])
            //num = data.data.length
            //console.log(num)
            return data.data
        }
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

        const getBorrownum = async() => {
            const borrownumFromServer = await fetchBorrownum()
            setBorrownum(borrownumFromServer)
        }

        getImages()
        getBook()
        getBorrownum()
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
                        <Button key="submit" onClick={editAction}>
                          编辑
                        </Button>,
                        <Button key="back" onClick={handleCancel} danger>
                        取消
                      </Button>,
                      ]}>
                    <div className='mdoel-form-design'>
                        
                        <br />
                        
                        <Form {...formItemLayout} 
                            initialValues={{
                                'title': book.title,
                                'author': book.author,
                                'isbn': book.isbn,
                                'publisher': book.publisher,
                                'type': book.type,
                                'stock': book.stock,
                                'synopsis': book.synopsis,
                        }}>

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
                                <Space direction="vertical" style={{ width: 150 }}>
                                    <DatePicker style={{ width: '100%' }} defaultValue={moment(book.pubdate)} onChange={onChange} placeholder='请选择出版日期'/>
                                </Space>
                            </Form.Item>

                            <Form.Item
                                label="书籍类型"
                                name="type"
                                rules={[{ required: true, message: '请选择书籍类型' }]}
                            >
                                <Select
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
                                name="stock"
                                rules={[{ required: true, message: '请输入书籍库存' }]}
                            >
                                <InputNumber
                                    onChange={onChange1} 
                                    min={0}
                                    style={{ width: 150 }}/>            
                            </Form.Item>

                            <Form.Item
                                label="书籍简介"
                                name="synopsis"
                                rules={[{ required: true, message: '请输入书籍简介' }]}
                            >
                                <TextArea showCount placeholder='请输入书籍简介' maxLength={500} style={{ height: 150 }} onChange={event => setSynopsis(event.target.value)} />
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