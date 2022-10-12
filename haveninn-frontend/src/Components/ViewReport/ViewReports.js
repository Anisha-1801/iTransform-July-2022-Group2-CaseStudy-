import React, { Component } from 'react'
import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
  } from "@progress/kendo-react-charts";
import axios from 'axios';
import Variables from '../../Variables/Variables';

class ViewReports extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         Bills:[],
         Staff:[],
         Inventory:[],
         Billtotal:0,
         Staffsalarytotal:0,
         InventoryTotal:0
      // "July" (or current month)
      }
      
    }
    componentDidMount(){
        axios.get(Variables.api+'Bills',{ headers: { "Authorization": `Bearer ${Variables.token}` } })
        .then(response=>response.data)
        .then(res=>{this.setState({Bills:res})})
        .catch(err=>console.log(err))
       

        axios.get(Variables.api+'Staffs',{ headers: { "Authorization": `Bearer ${Variables.token}` } })
        .then(response=>response.data)
        .then(res=>this.setState({Staff:res}))
        .catch(err=>console.log(err))

        axios.get(Variables.api+'Inventories',{ headers: { "Authorization": `Bearer ${Variables.token}` } })
        .then(response=>response.data)
        .then(res=>this.setState({Inventory:res}))
        .catch(err=>console.log(err))
       
    }
  render() {

    for (let i = 0; i < this.state.Bills.length; i++) {
        this.state.Billtotal += this.state.Bills[i].TotalPrice;
    }
    for (let i = 0; i < this.state.Staff.length; i++) {
       this.state.Staffsalarytotal+= this.state.Staff[i].Salary;
    }
    for (let i = 0; i < this.state.Inventory.length; i++) {
       this.state.InventoryTotal += this.state.Inventory[i].UnitPrice;
    }
   var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var d = new Date();
  var monthName=months[d.getMonth()]
    const HaveninnStatusThisMonth = [
        {
          status: "Rooms",
          value: this.state.Billtotal,
          color: "#bf8b67",
        },
        {
          status: "Staff",
          value: this.state.Staffsalarytotal,
          color: "#9d5353",
        },
        {
          status: "Inventory",
          value: this.state.InventoryTotal+80000,
          color:  "#632626",
        }
       
      ];
    //   const label=['Bills','Staff','Inventory']
    return (
        <div className="r-container">
            <center><h3 className="label-heading">HavenInn Report-{monthName}</h3></center>
            <div>
        <Chart >
      <ChartTitle text="Haveninn Report status - this month" />
      <ChartLegend visible={false} />
      <ChartSeries >
        <ChartSeriesItem
          type="pie"
          data={HaveninnStatusThisMonth}
          categoryField="status"
          field="value"
       
        >
          <ChartSeriesLabels
            color="#fff"
            background="none"
            // content={}
          />
        </ChartSeriesItem>
      </ChartSeries>
    </Chart>
    <br/>
    <div className="d-flex justify-content-center">
    <p className="label-text"><h6> <i class="fa fa-square" aria-hidden={true} style={{color:"#bf8b67"}}></i> &nbsp;Income from Rooms &nbsp;
    <i class="fa fa-square" aria-hidden={true} style={{color:"#9d5353"}}></i>&nbsp;Expenditure on Inventory &nbsp;
    <i class="fa fa-square" aria-hidden={true} style={{color: "#632626"}}></i>&nbsp;Staff Salary Expenditure</h6></p> 
    </div>
    </div>
    </div>
     )
  }
}

export default ViewReports