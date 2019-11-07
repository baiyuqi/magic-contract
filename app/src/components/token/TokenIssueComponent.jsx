import React, { Component } from "react";

import { BrowserRouter as Router, NavLink, Link, Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { Button, Form, Checkbox, Table, TableBody, TableCell, TableRow } from 'semantic-ui-react'
import { deployFinished1400 } from "../../store/token/actions";

import ERC1400 from "../../contracts/ERC1400.json";
import TokenListComponent from "./TokenListComponent";
var contract = require("@truffle/contract");

export default class TokenIssueComponent extends Component {
  constructor(props) {
    super(props);
    this.formData = { controllers: [] };


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddController = this.handleAddController.bind(this);
  }
  //https://github.com/trufflesuite/truffle/tree/master/packages/contract
  async handleSubmit(event) {
    event.preventDefault();
//function issueByPartition(bytes32 _partition, address _tokenHolder, uint256 _value, bytes calldata _data) external; //ok

    
    let MyContract = contract(ERC1400)
   
  
    const web3 = this.props.drizzle.web3;
    const utils = web3.utils;
    MyContract.setProvider(web3.currentProvider);
    let inst = await MyContract.at(this.tokenAddress)
    await inst.issueByPartition(
      this.formData.partition,
      this.formData.holderAddress,
      this.formData.amount,
      { from: this.props.drizzleState.accounts[0] });

    return;
  }

  handleInputChange(event) {

    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.formData[event.target.name] = value;

  }
  handleAddController(event) {
    const value = this.formData.controllers.push(this.formData.controller)
  }
   select = (addr)=>{
      this.tokenAddress = addr
  }
  render() {

    return (
      <div>
      
       <TokenListComponent {...this.props} select={this.select}></TokenListComponent>

        <div
          onChange={this.handleInputChange}
        >
          <Form.Field>
            <label>partition</label>
            <input placeholder='partition' name="partition" />
          </Form.Field>
          <Form.Field>
            <label>token holder address</label>
            <input placeholder='issueing to address' name="tokenHolder" />
          </Form.Field>
          <Form.Field>
            <label>amount</label>
            <input placeholder='decimals' type="" name="amount" />
          </Form.Field>
         


          <Button onClick={this.handleSubmit}>Submit</Button>
        </div>
      </div>
    )
  }
}