import { Box, Button, CircularProgress, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection,getDocs, addDoc, doc, deleteDoc,updateDoc } from 'firebase/firestore';
import { auth, db } from "../database/firebase";
import { signOut } from 'firebase/auth'

const Contacts = () =>{
    const [contacts,setContacts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [search,setSearch] = useState('');
    useEffect(()=>{
        getAllDocs();
    });
    const [logLoad,setlogLoad] = useState(false);
    const [data,setData] = useState({
        id:'',
        name:'',
        mobile:'',
        address:'',
        email:''
    });
    const getAllDocs = async () =>{
        const data = await getDocs(collection(db,'contacts'));
        setContacts(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
    };
    const [dialog,setDialog] = useState(false);
    const [update,setUpdate] = useState(false);
    const ChangeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value});
    };
    const SubmitHandler = async (e) =>{
        await addDoc(collection(db,"contacts"),data).then(resp=>{
            setDialog(false);
        }).catch(err=>{
            alert(err.message);
        })
    };
    const DeleteDoc = async (id) =>{
        setLoading(true);
        const docRef = doc(db,"contacts",id);
        await deleteDoc(docRef);
        setLoading(false);
    };
    const UpdateDocs = async (id) =>{
        console.log(id);
        const docRef = doc(db,"contacts",id);
        await updateDoc(docRef,data).then(()=>{
            alert("updated");
        }).catch(err=>{
            alert(err.message)
        })
    }
    return(
        <React.Fragment>
            <Dialog open={dialog} onClose={()=>setDialog(false)}>
                <Box className="flex flex-col gap-2 p-6">
                    <Typography>Enter Contact details</Typography>
                    <TextField type="text" label="Enter Name" name="name" value={data.name} onChange={ChangeHandler}/>
                    <TextField type="number" label="Enter Mobile" name="mobile" value={data.mobile} onChange={ChangeHandler}/>
                    <TextField type="text" label="Enter Address" name="address" value={data.address} onChange={ChangeHandler}/>
                    <TextField type="email" label="Enter Email" name="email" value={data.email} onChange={ChangeHandler}/>
                    {loading ? <CircularProgress/> : <Button onClick={SubmitHandler}>Add Contact</Button>}
                </Box>
            </Dialog>
            <Dialog open={update} onClose={()=>setUpdate(false)}>
                <Box className="flex flex-col gap-2 p-6">
                    <Typography> Contact details</Typography>
                    <TextField type="text" label="Enter Name" name="name" value={data.name} onChange={ChangeHandler}/>
                    <TextField type="number" label="Enter Mobile" name="mobile" value={data.mobile} onChange={ChangeHandler}/>
                    <TextField type="text" label="Enter Address" name="address" value={data.address} onChange={ChangeHandler}/>
                    <TextField type="email" label="Enter Email" name="email" value={data.email} onChange={ChangeHandler}/>
                    {loading ?  <CircularProgress className="max-auto"/>:<Button onClick={()=>UpdateDocs(data.id)}>Update Contact</Button>}
                </Box>
            </Dialog>
            <div className="pt-16 w-screen">
                <div className="w-screen flex flex-row justify-center gap-10 items-center p-2">
                    <h1 className="text-center">Contacts</h1>
                    <input type="text" placeholder="Search Contact" className=" border-gray-400 border" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                    {logLoad ? <CircularProgress className="mx-auto"/> : <Button variant="outlined" color="secondary" onClick={async ()=>{
                        setlogLoad(true);
                        await signOut(auth);
                        setlogLoad(false);
                    }}>Logout</Button>}
                </div>
                {contacts.length == 0 ? <h1 className="text-center text-red-500 mt-3">No Contacts to Display</h1> : <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Mobile</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                contacts.filter(ct=>ct.name.toLowerCase().includes(search.toLowerCase())).map(cnt=>{
                                    return(
                                        <TableRow key={cnt.id}>
                                            <TableCell>{cnt.name}</TableCell>
                                            <TableCell>{cnt.mobile}</TableCell>
                                            <TableCell>{cnt.address}</TableCell>
                                            <TableCell>{cnt.email}</TableCell>
                                            <TableCell>
                                                <Box className="flex flex-row gap-3">
                                                    <Button onClick={()=>{
                                                        setUpdate(true);
                                                        setData({
                                                            name:cnt.name,
                                                            mobile:cnt.mobile,
                                                            address:cnt.address,
                                                            email:cnt.email,
                                                            id:cnt.id
                                                        });
                                                    }}>Update</Button>
                                                    <Button variant="contained" color="error" onClick={()=>DeleteDoc(cnt.id)}>Delete</Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>}
                <div className="w-screen flex flex-row justify-center pt-6">
                <Button variant="contained" onClick={()=>{
                    setData({name:'',mobile:'',email:'',id:'',address:''});  
                    setDialog(true)
                }}>Add Contact</Button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Contacts;