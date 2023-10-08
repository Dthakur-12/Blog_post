import React, { useState } from 'react'
import { imgDB, txtDB } from '../FirebaseConfig';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
const Home = () => {
  const [selectedOption, setSelectedOption] = useState('false');
  const [image, setImage] = useState('')
  const [UserData, setUserData] = useState({

    Title: '',
    Abstract: '',
    Atext: '',
    Tags: '',
  })

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);

  };
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setUserData(prevData => {
      return {
        ...prevData,
        [name]: type === 'radio' ? checked : value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const valRef = collection(txtDB, 'txtData')
      await addDoc(valRef, {
        Title: UserData.Title,
        Abstract: UserData.Abstract,
        ArticleText: UserData.Atext,
        Tags: UserData.Tags,
        imgUrl: image
      })
      alert('Article Added succesfully')
    } else {
      const valRef = collection(txtDB, 'txtData')
      await addDoc(valRef, {
        Title: UserData.Title,
        Abstract: UserData.Abstract,
        ArticleText: UserData.Atext,
        Tags: UserData.Tags
      })
      alert('Question Added succesfully')
    }

  }
  const handleSubmitImage = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const imgs = ref(imgDB, `Imgs/${v4()}`)
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      getDownloadURL(data.ref).then(val => {
        console.log(val);
        setImage(val);
      })
    })

  }
  return (
    <div>
      <div style={{ backgroundColor: 'lightgray', marginTop: '20px', paddingTop: '20px',paddingBottom:'20px', fontSize: '30px', fontWeight: 'bold' }}>
        New Post
      </div>
      <div style={{ display: 'flex', alignItems: 'center',marginTop:'20px',marginBottom:'20px' }}>
        <div>
          Select Post Type:
        </div>
        <div>
          <form className='formdatacontact' >
            <div style={{ display: 'flex', marginLeft: '40px' }}>
              <input
                type="radio"
                value="Question"
                checked={selectedOption === 'Question'}
                onChange={handleOptionChange}
              />
              Question
              <div style={{ display: 'flex', marginLeft: '40px' }}>
                <input
                  type="radio"
                  value="Article"
                  checked={selectedOption === 'Article'}
                  onChange={handleOptionChange}
                />
                Article
              </div>
            </div>
          </form>
        </div>
      </div>


      <form className='formdatacontact'>
        <div style={{ backgroundColor: 'lightgray', marginTop: '20px', paddingTop: '20px',paddingBottom:'20px', fontSize: '30px', fontWeight: 'bold' }}>What do you want to ask or share</div>
        <div style={{display:'flex',alignItems:'center',marginTop: '20px', paddingTop: '20px',paddingBottom:'20px',}}>
          <h5>Title:</h5>
          <input style={{marginLeft:'20px'}} type='text' name='Title' placeholder='Enter a descriptive Title' onChange={handleChange} value={UserData.Title} />
        </div>
        {
          selectedOption === 'Article' && <div style={{display:'flex',alignItems:'center',marginTop: '20px', paddingTop: '20px',paddingBottom:'20px',}}>
            <div>Add an Image:  </div>
            <input style={{width:'20%'}} type="file" multiple accept="image/*" onChange={(e) => handleSubmitImage(e)} />
          </div>
        }
        <div>
          <h5>Abstract</h5>
          <textarea type='text' name='Abstract' placeholder='Enter a 1-paragraph abstract' onChange={handleChange} value={UserData.Abstract} />
        </div>
        <div>
          <h5>Article Text</h5>
          <textarea type='text' name='Atext' placeholder='Enter a 1-paragraph abstract' onChange={handleChange} value={UserData.Atext} rows={10} />
        </div>
        <div>
          <h5>Tags</h5>
          <input type='text' name='Tags' placeholder='Please add upto 3 tags ex:..java,kotlin' onChange={handleChange} value={UserData.Tags} />
        </div>
        <div style={{display:'flex',justifyContent:'end'}}>
          <button onClick={handleSubmit}>POST</button>
        </div>
      </form>
    </div>

  )
}

export default Home