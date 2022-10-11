import axios from 'axios';
import React, { Component } from 'react'
import Variables from '../../Variables/Variables';

class AddInventoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Item: '',
      Category: '',
      Quantity: '',
      UnitPrice: '',
      Users: [],
      UserId:''
    }

    this.Addinventoryhandler=this.Addinventoryhandler.bind(this);
    this.changeitemsHandler = this.changeitemsHandler.bind(this);
    this.changecategoryHandler = this.changecategoryHandler.bind(this);
    this.changequantityHandler = this.changequantityHandler.bind(this);
    this.changeunitpriceHandler = this.changeunitpriceHandler.bind(this);
    // this.useridhandler=this.useridhandler.bind(this)
}

  changeitemsHandler = (e) => {
    this.setState({ Item: e.target.value })
  }
  changecategoryHandler = (e) => {
    this.setState({ Category: e.target.value })
}
changequantityHandler = (e) => {
  this.setState({ Quantity: e.target.value })
  }
  changeunitpriceHandler = (e) => {
    this.setState({ UnitPrice: e.target.value })
  }
  //  useridhandler=e=>{
  //   this.setState({UserId:e.target.value})
  //  }
   Addinventoryhandler = () => {
    // eslint-disable-next-line
    const user = this.state.Users.filter(r=>r.Email==Variables.email)
     const u=user.map(u=>u.UserId)
    let Inventory = {Item: this.state.Item, Category: this.state.Category, Quantity: this.state.Quantity, UnitPrice : this.state.UnitPrice,IsStockAvailable : true, UserId : u[0]}
    axios.post(Variables.api + 'Inventories', Inventory,{ headers: { "Authorization": `Bearer ${Variables.token}` } })
    //   .then(res => console.log(res))
      .then(res=> alert(res))
      .catch(err => alert(err))
  }
componentDidMount(){
  axios.get(Variables.api + 'Users', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
  .then(response => response.data)
  .then(res => { this.setState({
     Users:res
  })})
  .catch( error => alert(error))
}
   
  
  render() {
    const {Item,Category,Quantity, UnitPrice} = this.state;
   
    return (
      <div className='Inventory-form-body rf-card '>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="rf-card card col-md-6 offset-md-3 offset-md-3" id='i-card-bg'>
              {
                <h3 className='label-heading'> Add Inventory</h3>
              }
              <div className="card-body">
                <form >
                
                  <div className="form-group">
                    <label  className="label-text"> Items : </label>
                    <input placeholder="Items" name="Enter Item" className="form-control" required={true}
                    value={Item} onChange={this.changeitemsHandler}/>
                  </div>

                   <div className="form-group">
                   <label className="label-text"> Category : </label>
                    <input type="text" placeholder="Enter Category type" className="form-control" required={true} value={Category} onChange={this.changecategoryHandler} />

                 </div> 
                  <div className="form-group">
                    <label className="label-text"> Quantity : </label>
                    <input placeholder="Enter Quantity" name="Quantity" className="form-control" required={true} value={Quantity}
                       onChange={this.changequantityHandler} />
                  </div>
                  <div className="form-group">
                    <label className="label-text"> UnitPrice : </label>
                    <input placeholder="Enter Unit Price" name="UnitPrice" className="form-control" required={true} value={UnitPrice}
                     onChange={this.changeunitpriceHandler} />
                  </div>
                  <center>
                  <button className="btn btn-warning btn-lg mt-4" onClick={this.Addinventoryhandler}>
                  <i class="fa fa-check" aria-hidden="true"></i> &nbsp; Create</button>
                  </center>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default AddInventoryForm