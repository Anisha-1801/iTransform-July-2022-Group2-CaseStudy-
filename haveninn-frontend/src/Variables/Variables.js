const Variables={
    api :'https://localhost:44331/api/',
    token : sessionStorage.getItem('token'),
    email : sessionStorage.email,
    Roomid : sessionStorage.getItem('Roomid'),
    Roomtype: sessionStorage.getItem('Roomtype')
}

export default Variables