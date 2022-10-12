import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Variables from '../../Variables/Variables';
import { useLocation } from 'react-router-dom';

function UpdateInventory() {
    const location = useLocation()
    const inventoryId = location.state.Id

    //const [user, setuser] = useState([])
    const [items, setItems] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setquantity] = useState('')
    const [unitPrice, setUnitPrice] = useState('')
    const [available, setavailable] = useState('')
    const [userid, setuserid] = useState('')


    useEffect(() => {
        axios.get(Variables.api + `Inventories/${inventoryId}`, { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(response => response.data)
            .then(res => {
                setItems(res.Item)
                setCategory(res.Category)
                setquantity(res.Quantity)
                setUnitPrice(res.UnitPrice)
                setavailable(res.IsStockAvailable)
                setuserid(res.UserId)
            })
            .catch(error => console.log(error))

    }, [])

    const Updateinventoryhandler = () => {
        axios.put(Variables.api + `Inventories/${inventoryId}`,
            {
                InventoryId: inventoryId,
                Item: items,
                Category: category,
                Quantity: quantity,
                UnitPrice: unitPrice,
                isStockAvailable: available,
                UserId: userid
            },
            { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(response => response.data)
            .then(res=> alert("Updated Successfully!"))
            .catch(error => alert("Oops! Something went wrong."))
    }

    return (
<>
        {Variables.isUserLoggedin ? 
        <div>
            <div className="r-container">
                <div className="d-container container">
                    <div className='row'>
                        <div className="col-md-6 mx-auto">
                            <div className='mt-3 p-3'>
                                <h3 className='form-card-title label-title'>Update Inventory</h3>
                                <div className=" mt-4">
                                    <form action="/Inventory" onSubmit={() => { Updateinventoryhandler() }} >
                                        <div className="form-group">
                                        <label className="label-text">Inventory Id : </label>
                                            <input type="text" className="form-control" disabled={true} defaultValue={inventoryId} />

                                            <label className="label-text">Items : </label>
                                            <input type="text" className="form-control" required={true}
                                                defaultValue={items} onChange={e => setItems(e.target.value)} />

                                            <label className="label-text">Category : </label>
                                            <input type="text" className="form-control" required={true}
                                                defaultValue={category} onChange={e => setCategory(e.target.value)} />

                                            <label className="label-text">Quantity :</label>
                                            <input type="text" className="form-control" required={true}
                                                defaultValue={quantity} onChange={e => setquantity(e.target.value)} />

                                            <label className="label-text">UnitPrice :</label>
                                            <input type="text" className="form-control" required={true}
                                                defaultValue={unitPrice} onChange={e => setUnitPrice(e.target.value)} />


                                            <label className="label-text">Status:</label>
                                            <input type="text" className="form-control" required={true}
                                                defaultValue={available} onChange={e => setavailable(e.target.value)} />
                                        </div>
                                        <center><button className="btn btn-warning mt-3 btn-lg" type="submit">
                                        <i class="fa fa-check" aria-hidden="true"></i> &nbsp;Update</button></center>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         :<><center><h1 className="label-heading " style={{color:"black"}}> Please Login to Access This Page </h1></center></> }
         </>
    )

}
export default UpdateInventory