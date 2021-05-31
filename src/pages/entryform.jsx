import React, { Component } from 'react'
import '../pages/css/entryform.css'
import 'firebase/firestore';
import firebase from '../firebase';

import { ReactComponent as Insert } from '../assets/imgs/insert.svg'
import { ReactComponent as Update } from '../assets/imgs/update.svg'
import { ReactComponent as Delete } from '../assets/imgs/delete.svg'

const menu = [
    {
        name: "Insert entry", img: <Insert id="menu_icon" />
    },
    {
        name: "Update entry", img: <Update id="menu_icon" />
    },
    {
        name: "Delete entry", img: <Delete id="menu_icon" />
    }
]

const db = firebase.firestore();


export class entryform extends Component {
    state = {
        active: 0,
        name: '',
        date: '',
        address: '',
        details: '',
        searchText: '',
        enrtyForms: [],

        updateSearch: '',

        updateName: '',
        updateDate: '',
        updateAddress: '',
        updateDetails: ''
    }

    componentDidMount() {
        this.getEntryForms();
        // this.uniqueId()
    }


    addProjects() {
        const { name, date, address, details, id } = this.state;
        db.collection('entryManagement')
            .doc(id)
            .set({
                id,
                name,
                date,
                address,
                details,
            })
            .then(res => {
                alert("Data Inserted");
                window.location.href = "/entryform"
            })

            .catch((err) => {
                console.error(err);
            });
    }

    getEntryForms() {
        db.collection('entryManagement')
            .get()
            .then(res => {
                var tempArray = [];
                res.forEach((doc) => {
                    tempArray.push(doc.data())
                });
                this.setState({ entryForms: tempArray, id: "000" + parseInt(tempArray.length + 1) })
            })
            .catch((e) => {
                console.log(e);
            })
    }

    uniqueId = () => {
        const { entryForms } = this.state;
        if (entryForms) {
            return this.setState({ id: "000" + (entryForms.length + 1) })

        }
        return this.setState({ id: "0000" })
    }

    NaviUpdate = (i) => {
        this.setState({ active: i })

    }

    deleteFunction(id) {
        console.log(id);
        db.collection('entryManagement')
            .doc(id)
            .delete()
            .then(res => {
                alert("Record Deleted")
                this.getEntryForms()
            })
            .catch((e) => {
                console.log(e);
            })
    }

    renderList() {
        const { entryForms, searchText } = this.state;

        console.log(entryForms);

        if (searchText == '') {
            return entryForms?.map((item, i) => {
                return (
                    <div id="deleteItem" key={i}>

                        <div id="delete_name">
                            {item.id}  {item.name}
                        </div>
                        <div id="delete_address">
                            {item.Address}
                        </div>
                        <div id="delete_des">
                            {item.details}
                        </div>
                        <div onClick={() => this.deleteFunction(item.id)} id="delete_button">
                            <Delete id="delete_ico" />
                        </div>
                    </div>
                );

            })
        }
        else {
            const filterSearchData = entryForms.filter(item => {
                return item.id?.includes(searchText)
            })
            return filterSearchData?.map((item, i) => {
                return (
                    <div id="deleteItem" key={i}>

                        <div id="delete_name">
                            {item.id}  {item.name}
                        </div>
                        <div id="delete_address">
                            {item.Address}
                        </div>
                        <div id="delete_des">
                            {item.details}
                        </div>
                        <div id="delete_button">
                            <Delete id="delete_ico" />
                        </div>
                    </div>
                );

            })
        }


    }

    onEnterPressForSearch(keyCode) {
        const { entryForms, updateSearch } = this.state;
        if (keyCode ==="Enter") {
            const filterEntryData = entryForms?.filter(item => {
                return item.id === updateSearch
            })

            if (filterEntryData.length === 0) {
                return alert("No record Found")
            }

            if (filterEntryData) {
                this.setState({
                    updateName: filterEntryData[0]?.name,
                    updateAddress: filterEntryData[0]?.address,
                    updateDetails: filterEntryData[0]?.details,
                    updateDate: filterEntryData[0]?.date
                })
            }
        }
    }

    updateRecord(){
        const {updateName, updateAddress, updateDetails, updateDate, updateSearch}= this.state;
        db.collection('entryManagement')
            .doc(updateSearch)
            .update({
                id:updateSearch,
                name:updateName,
                date: updateDate,
                address: updateAddress,
                details:updateDetails
            })
            .then(res => {
                alert("Record Updated")
                this.getEntryForms()
            })
            .catch((e) => {
                console.log(e);
            })
    }

    render() {
        const { active, name, details, address, id, date, searchText, entryForms } = this.state;
        const { updateName, updateDetails, updateAddress, updateDate, updateSearch } = this.state;
        // console.log({ active, name, details, address, id, date, searchText });
        console.log(entryForms);
        return (
            <div id="tab_container">

                <div id="tab_menu">
                    <ul>
                        {
                            menu.map((item, i) => {
                                return (
                                    <li className={active === i ? 'active' : ''} key={i} onClick={e => this.NaviUpdate(i, item.name)}>{item.img}<span id="menu_item_name">{item.name}</span></li>

                                );
                            })
                        }
                    </ul>
                </div>
                <div id="forms">
                    <div id="form_items">
                        {
                            active === 0 && <>
                                <form>

                                    <div id="entry_base">
                                        <input type="text" value={id} onChange={event => this.setState({ id: event.target.value })} name="" id="" placeholder="Entry ID.." />

                                    </div>

                                    <input type="text" name="ename" id="" placeholder="Name" value={name} onChange={(e) => this.setState({ name: e.target.value })} />
                                    <input type="date" name="edate" id="date" value={date} onChange={(e) => this.setState({ date: e.target.value })} />
                                    <textarea name="eaddress" id="address" placeholder="Address" value={address} onChange={(e) => this.setState({ address: e.target.value })} />
                                    <textarea name="edes" id="address" placeholder="Details" value={details} onChange={(e) => this.setState({ details: e.target.value })} />
                                    <input type="button" value="Insert" id="submit" onClick={() => this.addProjects()} />
                                </form>
                            </>
                        }
                        {
                            active === 1 &&
                            <>

                                <form>
                                    <div id="search_base">
                                        <input type="text" name="" id="search" placeholder="Search .." onKeyPress={e => this.onEnterPressForSearch(e.code)} onChange={e => this.setState({ updateSearch: e.target.value })} />
                                    </div>
                                    <input type="text" name="" id="" placeholder="Name" value={updateName} onChange={e => this.setState({ updateName: e.target.value })} />
                                    <input type="date" name="" id="date" value={updateDate} onChange={e => this.setState({ updateDate: e.target.value })} />
                                    <textarea name="" id="address" placeholder="Address" value={updateAddress} onChange={e => this.setState({ updateAddress: e.target.value })} />
                                    <textarea name="edes" id="address" placeholder="Details" value={updateDetails} onChange={e => this.setState({ updateDetails: e.target.value })} />
                                    <input onClick={() => this.updateRecord()} type="button" value="Update" id="submit" />
                                </form>

                            </>
                        }
                        {
                            active === 2 &&
                            <>
                                <>
                                    <div id="deleteBase">

                                        <div id="delete_search">
                                            <input onChange={(event) => this.setState({ searchText: event.target.value })} value={searchText} type="text" name="" id="" placeholder=" &#128269; Search entry ..." />
                                        </div>
                                        {this.renderList()}
                                    </div>
                                </>

                            </>
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default entryform

