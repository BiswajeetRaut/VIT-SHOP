import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './VendorAddProduct.css';
import {useState} from 'react'
import { db } from '../firebase';
import storage from '../firebase';
const VendorModifyProduct = () => {
    const[name,setname]=useState('');
    const[stock,setstock]=useState('');
    const[price,setprice]=useState('');
    const[file,setfile]=useState(null);
    const[img,setimg]=useState('');
    const[successMsg,setsuccessMsg]=useState('');
    const[uploadError,setUploadError]=useState('');
    const[imageError,setimageError]=useState('');
    var img_flag=0;
    const {id}=useParams();
    const {productid}=useParams();
    // console.log(id);
    // const addProduct=()=>{

    // }
    useEffect(() => {
      return () => {
        db.collection('Vendors').doc(id).collection('Products').doc(productid).onSnapshot((snapshot)=>{
          setname(snapshot.data().name);
          setprice(snapshot.data().price);
          setstock(snapshot.data().stock);
          setimg(snapshot.data().image);
        //   console.log(snapshot.data().image);
        })
      };
    }, []);
    const imageCheck=(e)=>{
        img_flag=1;
        let F=e.target.files[0];
        var types=['jpg','jpeg','png'];
        console.log(e.target.value.split('.')[1]);
        if(types.includes(e.target.value.split('.')[e.target.value.split('.').length-1])){
            setimageError('');
            setfile(F);
            document.getElementById("image__1").innerHTML=e.target.value.split('.')[0];
            alert("Valid Image");
        }
        else{
            setfile(null);
            console.log(e.target.value.split('.'));
            document.getElementById("image__1").innerHTML=`<span className="formbold-drop-file"> Drop files here </span>
            <span className="formbold-or"> Or </span>
            <span className="formbold-browse"> Browse </span>`
            alert("Invalid Image");
        }
    }
    const handleAddProducts=(e)=>{
        e.preventDefault();
        // console.log(name,stock,price);
        // console.log(file);
        if(file==null||file.name == img)
        {
            // alert("")
            console.log(img_flag);
            console.log(file.name);
            console.log(img);
            console.log("same");
            db.collection('Vendors').doc(id).collection('Products').doc(productid).update({
                name:name,
                stock:stock,
                price:price,
            }).then((docRef)=>{
                console.log(docRef);
            }).catch((error)=>{console.log(error);})
        }
        else {
            const uploadTask=storage.ref(`product-images/${file.name}`).put(file);
        console.log(uploadTask);
        uploadTask.on('state_changed',snapshot=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress);
        },error=>setUploadError(error.message),()=>{
            storage.ref('product-images').child(file.name).getDownloadURL().then(url=>{
              console.log(url);
                db.collection('Vendors').doc(id).collection('Products').doc(productid).update({
                    name:name,
                    stock:stock,
                    price:price,
                    image:url,
                }).then((docRef)=>{
                    console.log(docRef.id);
                }).catch((error)=>{console.log(error);})
            }).then(()=>{
                setsuccessMsg('Product added successfully');
                setname('');
                setstock('');
                setprice('');
                document.getElementById('file').value='';
                setimageError('');
                setTimeout(()=>{
                    setsuccessMsg('')
                },3000)
            }).catch(error=>setUploadError(error.message));
        }) 
    }
    }
  return (

<div className="formbold-main-wrapper">
  <div className="formbold-form-wrapper">
    <form >
      <div className="formbold-mb-5">
        <label for="name" className="formbold-form-label">
          Product Name
        </label>
        <input
          onChange={(e)=>setname(e.target.value)}
          value={name}
          type="text"
          name="name"
          id="name"
          className="formbold-form-input"
          required
        />
      </div>
      <div className="formbold-mb-5">
        <label for="price" className="formbold-form-label">
          Price:
        </label>
        <input
          onChange={(e)=>setprice(e.target.value)}
          value={price}
          type="text"
          name="price"
          id="price"
          className="formbold-form-input"
        />
      </div>
      <div className="formbold-mb-5">
        <label for="price" className="formbold-form-label">
          Stock
        </label>
        <input
          onChange={(e)=>setstock(e.target.value)}
          value={stock}
          type="text"
          name="stock"
          id="stock"
          className="formbold-form-input"
        />
      </div>
      <div className="mb-6 pt-4">
        <label className="formbold-form-label formbold-form-label-2">
          Upload File
        </label>

        <div className="formbold-mb-5 formbold-file-input">
          <input type="file" name="file" id="file" onChange={imageCheck}/>
          <label for="file">
            <div id="image__1">
              {img==''?(<>
              <span className="formbold-drop-file"> Drop files here </span>
              <span className="formbold-or"> Or </span>
              <span className="formbold-browse"> Browse </span>
              </>
              ):img}
            </div>
          </label>
        </div>
      </div>

    </form>
      <div>
        <button className="formbold-btn w-full" onClick={handleAddProducts}>Add Product</button>
      </div>
  </div>
</div>

  )
}

export default VendorModifyProduct