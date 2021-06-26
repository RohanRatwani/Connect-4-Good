import * as firebasemodule from 'firebase' 
import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/firestore';
import ViewNgo from './pages/Dashboard/viewngo'

import { toast } from './toast';
import { useHistory } from 'react-router';
import { render } from '@testing-library/react';
require('firebase/auth')

// const db = firebase.database();
const config = {
    
    apiKey: "AIzaSyAxPiCILq7GhnSXOYD5XI4fNyJ7rq5TOyw",
    authDomain: "connect4good-ddf56.firebaseapp.com",
    db:"https://connect4good-ddf56-default-rtdb.firebaseio.com/",
    projectId: "connect4good-ddf56",
    storageBucket: "connect4good-ddf56.appspot.com",
    messagingSenderId: "660471562780",
    appId: "1:660471562780:web:ec6c320ec9fce4877e95d9",
    measurementId: "G-QQ2FPMM2BH"
    
    // apiKey: "AIzaSyBYoEP0uRwfXg7VuhIP9IHaR7Nm_DTDxs4",
    // authDomain: "ionicreact-eeb6a.firebaseapp.com",
    // databaseURL:"https://ionicreact-eeb6a-default-rtdb.firebaseio.com/",
    // projectId: "ionicreact-eeb6a",
    // storageBucket: "ionicreact-eeb6a.appspot.com",
    // messagingSenderId: "636561258230",
    // appId: "1:636561258230:web:064e19cf4c705df45aded7",
    // measurementId: "G-0TSV9KCR1C"

}

if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }
const db = firebase.firestore();
// const history = useHistory()


export async function loginUser(flag: string, username: string, passowrd: string){
    const email = `${username}`
    console.log(flag)
    
    try{
        const res = await firebase.auth().signInWithEmailAndPassword(username, passowrd)
        console.log(res)
        return res
    }catch(error)
    {
        console.log(error)
        toast( error.message, 4000)
        return false
    }

}

export async function registerUser(flag:string, username: string, password: string, data:object){
    const email = `${username}`;
    try{
          const res = await firebase.auth().createUserWithEmailAndPassword(username,password);
          console.log(res, data)
          if (flag == "volunteer"){
            const data_res = await db.collection('volunteers').add(data)
            console.log('Added document with ID: ', data_res.id);
          }
          else if (flag == "ngo"){
            const data_res = await db.collection('ngo').add(data)
            console.log('Added document with ID: ', data_res.id);
          }


          return true
    }catch(error){
        console.log(error)
        toast( error.message, 4000)
        return false
    }
}

export async function getCurrentUser() {
    return new Promise((resolve,reject)=>{
    const unsubscribe = firebase.auth().onAuthStateChanged(function(user){
        if(user){
            resolve(user)
        } else{
            resolve(null)
        }
        unsubscribe()
    })
})
}

export async function displayCurrentUser(flag: string) {
    let user:any = firebase.auth().currentUser
    let usersEmail = user.email;

    let userprofile: any[] = []
    let userid = ""
    if(flag == "ngo"){
        console.log(usersEmail)
        var doc = await db.collection("ngo").where("username", "==", usersEmail).get()
        doc.forEach((doc: { id: any; data: () => any; }) => {
            console.log(doc.id, '=>', doc.data());
            doc.data().id = doc.id
            userprofile.push(doc.data());
            userid = doc.id;
          });
        // userprofile.push(userid)
        return userprofile
    }
    else if(flag == "volunteer"){
        let userdata = await db.collection("volunteers").where("username", "==", usersEmail).get()
        userdata.forEach((doc: { id: any; data: () => any; }) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                // var data = doc.data()
                doc.data().id = doc.id
                userprofile.push(doc.data());
                userid = doc.id;
            });
            console.log(userprofile,"Vol")
            return userprofile
        }
        // .catch(function(error) {
        //     console.log("Error getting documents: ", error);
        // });
        // console.log(userdata)
    // }


    // return userdata
}

export async function logoutUser() {
    // let user = firebase.auth().currentUser
    return firebase.auth().signOut()
  }
  
export async function getngolist() {
    
    var ngolist: { id: any; data: () => any; }[] = []
    const ngoRef = db.collection('ngo');
    const doc = await ngoRef.get();
    doc.forEach((doc: { id: any; data: () => any; }) => {
        // console.log(doc.id, '=>', doc.data());
        doc.data()['id'] = doc.id;
        ngolist.push(doc.data())
      });
    // console.log(ngolist)
    return ngolist
}


export async function updateavailability(ngoemail: any,objdata: any) {
    let docid = ""
    const docRef = await db.collection('ngo').where("username", "==",ngoemail).get();
    docRef.forEach((doc:{ id :any ; data:() => any; })=>{
        docid = doc.id;
        console.log(doc.id,doc.data(),"updatedata",objdata)
    })
    const updateRef = await db.collection('ngo').doc(docid)
    const res = await updateRef.update({"days": objdata.days, "starttime":objdata.starttime, "endtime":objdata.endtime})

    // console.log(updatedata)
}

export async function getngobyemail(email:any) {
    let ngodata = {}
    const doc = await db.collection('ngo').where("username","==",email).get();
    doc.forEach((doc:{ id :any ; data:() => any; })=>{
        console.log(doc.data(),"getngobyemail")
        ngodata = doc.data()
    })
    return ngodata
}



export async function regforngo(ngoemail: any,objdata: any) {
    let docid = ""
    const docRef = await db.collection('ngo').where("username", "==",ngoemail).get();
    docRef.forEach((doc:{ id :any ; data:() => any; })=>{
        docid = doc.id;
        console.log(doc.id,doc.data(),"updatedata",objdata)
    })
    const updateRef = await db.collection('ngo').doc(docid)
    const res = await updateRef.update({"registered_volunteers": firebase.firestore.FieldValue.arrayUnion(objdata)})
    console.log(res)
    return res
    // console.log(updatedata)
}

export async function getregvollist(ngouser: any) {
    
    var vollist: { id: any; data: () => any; }[] = []
    const doc = await db.collection('ngo').where("username", "==",ngouser).get();
    // const doc = await ngoRef.get();
    doc.forEach((doc: { id: any; data: () => any; }) => {
        // console.log(doc.id, '=>', doc.data());
        doc.data()['id'] = doc.id;
        vollist.push(doc.data()['registered_volunteers'])
      });
    // console.log(ngolist)
    return vollist
}


export default firebase