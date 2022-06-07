import axios from "axios";
import Cookies from "js-cookie"

const proxy = 'http://localhost:8000';

class Api{
    async post(path, item) {
		try {
			// console.log(path)
			// console.log(proxy + path)
			const res = await axios.post(path,item);
			const res_data = await res.data;
			//console.log(res.data);
			return res_data;
		} catch (err) {
			console.log(err);
		}

	}

	async put(path, item) {
		try {
			const res = await axios.put(path,item);
			const res_data = await res.data;
            //console.log(proxy + path)
			//console.log(res.data);
			return res_data;
		} catch (err) {
			console.log(err);
		}

	}

	async delete(path) {
		try {
			const res = await axios.delete(path);
			const res_data = await res.data;
			//console.log(res.data);
			return res_data;
		} catch (err) {
			console.log(err);
		}
  	}

	async get(path) {
		try {
			const res = await axios.get(path);
			const res_data = await res.data;
			return res_data;
		} catch (err) {
			console.log(err);
		}
	}

	// done: user login
    login = async (username, password) => {
		// 403 : wrong username or password
        // 404 : account not exist
		let data = await this.put(`/user/login/`, {username, password});

		if (data["errorCode"] === 0) {
			const cookies = data["cookies"]
			Cookies.set("user",cookies["user"])
			Cookies.set("username",cookies["username"])
			Cookies.set("user_id",cookies["user_id"])
		}

		return data;
	}

	// done: user logout
	logout = async () => {
		//403 : user is not logged in
		let data = await this.get(`/user/logout/`);
		if (data["errorCode"] === 0) {
			Cookies.remove("user")
			Cookies.remove("username")
			Cookies.remove("user_id")
		}
		return data;
	}

    // done: get all admin
    getAdminList = async () => {
        let data = await this.get(`/user/admins/`);
        return data;
    }

    // done: get all student
    getStudentList = async () => {
        let data = await this.get(`/user/students/`);
        return data;
    }

    // done: get specific admin
    getAdmin = async(id) => {
        let data = await this.get(`/user/admins/${id}`);
        return data;
        // admin not found : 404
    }

    // done: get specific student
    getStudent = async(id) => {
        let data = await this.get(`/user/students/${id}/`);
        return data;
        // student not found : 404
    }

	// done: create student account
	createStudent = async (username, password, number) => {
		let data = await this.post(`/user/students/create/`,{username, password, number});
		return data;
	}

	// done: admin can delete student account
	deleteStudent = async (studentId) => {
		let data = await this.delete(`/user/students/${studentId}/delete/`);
		return data;
	}

	updateStudent = async (studentId, number, username) => {
		let data = await this.put(`/user/students/${studentId}/edit/`, {number, username});
		return data;
	}

	// done: create admin account
	createAdmin = async (username, password, number) => {
		let data = await this.post(`/user/admins/create/`,{username, password, number});
		return data;
	}

	deleteAdmin = async (adminId) => {
		let data = await this.delete(`/user/admins/${adminId}/delete/`);
		return data;
	}

	// done: admin can update admin account
	editAdmin = async (adminId, number, username) => {
		let data = await this.post(`/user/admins/${adminId}/edit/`, {number, username});
		return data;
	}

	editStudent = async (studentId, number, username) => {
		let data = await this.post(`/user/students/${studentId}/edit/`, {number, username});
		return data;
	}

	// done: admin change password
	resetPasswordAdmin = async (id, password) => {
		let data = await this.put(`/user/admins/${id}/resetpassword/`,{password});
		return data;
	}

	forgetPasswordAdmin = async (number, password) => {
		let data = await this.put(`/user/admins/forgetpassword/`,{number, password});
		return data;
	}

	// done: student can change password
	resetPasswordStudent = async (id, password) => {
		let data = await this.put(`/user/students/${id}/resetpassword/`,{password});
		return data;
	}

	forgetPasswordStudent = async (number, password) => {
		let data = await this.put(`/user/students/forgetpassword/`,{number, password});
		return data;
	}

	// done: get all book
	getBookList = async () => {
		let data = await this.get(`/book/`);
		return data;
	}

	// done: get book info using bookid
	getBook = async (id) => {
		let data = await this.get(`/book/${id}/`);
		return data;
	}

	// done: get book image using bookid (specific)
	getBookImage = async (bookId) => {
		let data = await this.get(`/book/${bookId}/images/`);
		return data;
	}

	// done: search book by name
	getSearchBookByTitle = async (searchword) => {
		let data = await this.post(`/book/search/title/`, {searchword});
		return data;
	}

	// done: search book by author
	getSearchBookByAuthor = async (searchword) => {
		let data = await this.post(`/book/search/author/`, {searchword});
		return data;
	}

	getSearchBookByType = async (searchword) => {
		let data = await this.post(`/book/search/type/`, {searchword});
		return data;
	}

	// done: admin can create book
	createBook = async (title, author, isbn, publisher, pubdate, type, synopsis, stock) => {
		//login required
		//400 : same book name
		let data = await this.post(`/book/create/`, {title, author, isbn, publisher, pubdate, type, synopsis, stock});
		return data;
	}

	// done: admin can create book image
	createBookImage = async (bookId, form) => {
		//login required
		//404 : book not found
		//403 : user not admin

		let data = await axios({
            method: 'post',
            url: `/book/${bookId}/images/create/`,
            data: form
        })

		return data;
	}

	// done: admin can edit bookinfo
	editBook = async (bookId, title, author, type, isbn, publisher, pubdate, stock, synopsis) => {
		let data = await this.put(`/book/${bookId}/edit/`, {title, author, type, isbn, publisher, pubdate, stock, synopsis});
		return data;
	}

	// done: admin can edit photo
	editBookImage = async (bookId, form) => {
		//login required
		//404 : book not found
		//403 : user not admin

		let data = await axios({
            method: 'post',
            url: `/book/${bookId}/images/edit/`,
            data: form
        })

		return data;
	}

	// done: admin can delete book
	deleteBook = async (bookId) => {
		let data = await this.delete(`/book/${bookId}/delete/`);
		return data;
	}

	// done: admin can get all data list
	getDataList = async () => {
		let data = await this.get(`/data/`);
		return data;
	}

	// done: admin can get all borrow list
	getAllBorrowList = async () => {
		let data = await this.get(`/borrow/`);
		return data;
	}

	// done: get specific student borrow list
	getStudentBorrowList = async (studentId) => {
		let data = await this.get(`/borrow/student/${studentId}/`);
		return data;
	}

	getStudentBorrowListBySearch = async (number) => {
		let data = await this.get(`/borrow/student/${number}/search/`);
		return data;
	}

	getStudentLatestBorrowList = async (studentId) => {
		let data = await this.get(`/borrow/student/${studentId}/latest/`);
		return data;
	}

	getStudentBorrowStatusList = async (studentId) => {
		let data = await this.get(`/borrow/student/${studentId}/borrowed/`);
		return data;
	}

	getStudentOverdueStatusList = async (studentId) => {
		let data = await this.get(`/borrow/student/${studentId}/overdue/`);
		return data;
	}

	getStudentLateStatusList = async (studentId) => {
		let data = await this.get(`/borrow/student/${studentId}/late/`);
		return data;
	}

	// done: 已借书->已还书
	editStudentBorrowStatus = async (borrowId, status, bookId) => {
		let data = await this.put(`/borrow/${borrowId}/borrow_status/edit/`, {status, bookId});
		return data;
	}

	editStudentPaidStatus = async (borrowId, status) => {
		let data = await this.put(`/borrow/${borrowId}/paid_status/edit/`, {status});
		return data;
	}

	// done: student can borrow book
	createBorrow = async (bookId) => {
		//login required
		//400 : same book name
		let data = await this.post(`/borrow/create/`,{bookId});
		return data;
	}
}

const api = new Api()

export default api;