import {useState} from 'react';
import useForm from '../hooks/formHooks';
import {useFile, postMedia} from '../hooks/apiHooks';
import {useNavigate} from 'react-router-dom';

const Upload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const {postFile} = useFile();

  const initValues = {title: '', description: ''};
  const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    initValues,
  );

  async function doUpload() {
    try {
      const token = localStorage.getItem('token');
      if (!file) throw new Error('No file selected');

      const fileData = await postFile(file, token);
      console.log('FILE RESPONSE:', fileData);

      const mediaData = await postMedia(fileData.data, inputs, token);
      console.log('MEDIA RESPONSE:', mediaData);

      navigate('/');
    } catch (e) {
      console.error('Upload failed:', e.message);
      alert('Upload failed: ' + e.message);
    }
  }

  const handleFileChange = (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      setFile(evt.target.files[0]);
    }
  };

  return (
    <>
      <h1>Upload Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            value={inputs.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={5}
            value={inputs.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="file">Choose file</label>
          <input
            type="file"
            id="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://placehold.co/200?text=Choose+image'
            }
            alt="Preview"
            width="200"
          />
        </div>

        <button type="submit" disabled={!(file && inputs.title.length > 3)}>
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
