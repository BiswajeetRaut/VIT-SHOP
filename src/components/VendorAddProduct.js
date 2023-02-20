// // import { storage } from 'firebase';
// import React from 'react'
// import { useParams } from 'react-router-dom';
// import './VendorAddProduct.css';
// import storage from '../firebase';
// import { db } from '../firebase';
// const VendorAddProduct = () => {
//     var file;
//     const {id}=useParams();
//     // console.log(id);
//     const addProduct=()=>{
//         console.log(file.name);
//         storage.ref(`product-images/${file.name}`).put(file);
//     }
//     const imageCheck=(e)=>{
//         var F=e.target.files[0];
//         var types=['jpg','jpeg','png'];
//         // console.log(e.target.value.split('.')[1]);
//         if(types.includes(e.target.value.split('.')[e.target.value.split('.').length - 1])){
//             console.log("Valid Image");
//             file=F;
//             console.log(file);
//         }
//         else{
//             console.log(e.target.value.split('.')[e.target.value.split('.').length - 1]);
//         }
//     }
//   return (

// <div className="formbold-main-wrapper">
//   <div className="formbold-form-wrapper">
//     <form>
//       <div className="formbold-mb-5">
//         <label for="name" className="formbold-form-label">
//           Product Name
//         </label>
//         <input
//           type="text"
//           name="name"
//           id="name"
//           placeholder="Enter your product name"
//           className="formbold-form-input"
//           required
//         />
//       </div>
//       <div className="formbold-mb-5">
//         <label for="price" className="formbold-form-label">
//           Price:
//         </label>
//         <input
//           type="text"
//           name="price"
//           id="price"
//           placeholder="Enter your price"
//           className="formbold-form-input"
//         />
//       </div>
//       <div className="formbold-mb-5">
//         <label for="price" className="formbold-form-label">
//           Stock
//         </label>
//         <input
//           type="text"
//           name="stock"
//           id="stock"
//           placeholder="Enter your stock"
//           className="formbold-form-input"
//         />
//       </div>
//       <div className="mb-6 pt-4">
//         <label className="formbold-form-label formbold-form-label-2">
//           Upload File
//         </label>

//         <div className="formbold-mb-5 formbold-file-input">
//           <input type="file" name="file" id="file" onChange={imageCheck}/>
//           <label for="file">
//             <div>
//               <span className="formbold-drop-file"> Drop files here </span>
//               <span className="formbold-or"> Or </span>
//               <span className="formbold-browse"> Browse </span>
//             </div>
//           </label>
//         </div>
//       </div>

//     </form>
//       <div>
//         <button className="formbold-btn w-full" onClick={(e)=>{
//             addProduct()}}>Add Product</button>
//       </div>
//   </div>
// </div>

//   )
// }

// export default VendorAddProduct

import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './VendorAddProduct.css';
import {useState} from 'react'
import { db } from '../firebase';
import storage from '../firebase';
const VendorAddProduct = () => {
    const[name,setname]=useState('');
    const[stock,setstock]=useState('');
    const[price,setprice]=useState('');
    const[file,setfile]=useState(null);
    const[successMsg,setsuccessMsg]=useState('');
    const[uploadError,setUploadError]=useState('');
    const[imageError,setimageError]=useState('');
    const {id}=useParams();
    // console.log(id);
    // const addProduct=()=>{

    // }
    useEffect(() => {
      return () => {
        db.collection('Vendors').doc(id).collection('Products').onSnapshot((snapshot)=>{
          snapshot.docs.map((doc)=>{
            console.log(doc.id);
          })
        })
      };
    }, []);
    const imageCheck=(e)=>{
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
        const uploadTask=storage.ref(`product-images/${file.name}`).put(file);
        console.log(uploadTask);
        uploadTask.on('state_changed',snapshot=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress);
        },error=>setUploadError(error.message),()=>{
            storage.ref('product-images').child(file.name).getDownloadURL().then(url=>{
              console.log(url);
                db.collection('Vendors').doc(id).collection('Products').add({
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
          placeholder="Enter your product name"
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
          placeholder="Enter your price"
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
          placeholder="Enter your stock"
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
              <span className="formbold-drop-file"> Drop files here </span>
              <span className="formbold-or"> Or </span>
              <span className="formbold-browse"> Browse </span>
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

export default VendorAddProduct
