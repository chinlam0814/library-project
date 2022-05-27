import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import RegisterPage from './RegisterPage'
import ProfilePage from './ProfilePage'
import BorrowListPage from './BorrowListPage'
import PayFinesPage from './PayFinesPage'
import BookInfoPage from './BookInfoPage'
import AddBookPage from './AddBookPage'
import DataPage from './DataPage'
import SearchPage from './SearchPage'
import EditBookPage from './EditBookPage'
import UserListPage from './UserListPage'
import AddUserPage from './AddUserPage'
import EditUserPage from './EditUserPage'
import ForgetPasswordPage from './ForgetPasswordPage'

function App(){
  return(
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<MainPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/borrowlist' element={<BorrowListPage />}/>
          <Route path='/payfines/:borrowId/:different' element={<PayFinesPage />}/>
          <Route path='/bookinfo/:bookId' element={<BookInfoPage />}/>
          <Route path='/addbook' element={<AddBookPage />}/>
          <Route path='/data' element={<DataPage />}/>
          <Route path='/search/:type/:searchword' element={<SearchPage />}/>
          <Route path='/bookinfo/:bookId/edit' element={<EditBookPage />}/>
          <Route path='/users' element={<UserListPage />}/>
          <Route path='/adduser' element={<AddUserPage />}/>
          <Route path='/edit/:type/:userId' element={<EditUserPage />}/>
          <Route path='/forgetpassword' element={<ForgetPasswordPage />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App