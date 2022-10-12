const Variables={
    api :'https://localhost:44331/api/',
    token : sessionStorage.getItem('token'),
    email : sessionStorage.email,
    Roomid : sessionStorage.getItem('Roomid'),
    Roomtype: sessionStorage.getItem('Roomtype'),
    Role: sessionStorage.getItem('role'),
    isUserLoggedin : sessionStorage.getItem('token') != null ? true : false

}

export default Variables