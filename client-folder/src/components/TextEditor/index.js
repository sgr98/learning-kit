import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios"
import "./styles.scss"
// import imageCompression from 'browser-image-compression';
import { baseUrl } from '../../config';

const TextEditor = ({ value = '', onChange }) => {

    const [answer, setAnswer] = useState('')

    const onEditorChange = (newAnswer) => {
        setAnswer(newAnswer);
        if (onChange) {
            onChange(newAnswer);
        }
    };


    return (
        <div className="text-editor">
            <Editor
                apiKey="n7942578kkai07fww91ixztab3vfa874swodd4i2e1ymki4i"
                value={value}
                init={{
                    height: "50vh",
                    skin: "oxide-dark",
                    // content_css: "dark",
                    content_style: '.mce-content-body{background-color:#041D32; color:white}',
                    menubar: false,
                    image_dimensions: false,
                    image_class_list: [
                        { title: 'Responsive', value: 'img-responsive' }
                    ],
                    formats: {
                        nomargin: { selector: 'figure', classes: 'no-margin' }
                    },
                    plugins: [
                        'advlist autolink lists link image',
                        'charmap print preview anchor help',
                        'searchreplace visualblocks code',
                        'insertdatetime media table paste wordcount emoticons',

                    ],
                    automatic_uploads: true,
                    image_title: true,
                    image_caption: true,
                    file_picker_types: 'image',
                    toolbar:
                        'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent  | image table  | fontselect fontsizeselect|link | forecolor backcolor  |  emoticons | preview',


                    file_picker_callback: (callback, value, meta) => {
                        console.log("called")
                        var input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');
                        console.log("this", this)
                        input.onchange = async function () {
                            var file = this.files[0];
                            console.log("before compeee")
                            console.log('originalFile instanceof Blob', file instanceof Blob); // true
                            console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
                            const options = {
                                maxSizeMB: 1,
                                maxWidthOrHeight: 920,
                                useWebWorker: true
                            }
                            try {
                                // const compressedFile = await imageCompression(file, options);

                                // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                                // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
                                let formData = new FormData();
                                formData.set('expId', '12345')//maybe in future pass some props
                                formData.append('file', file)

                                await axios.post(`${baseUrl}/api/upload/introduction`, formData).then(
                                    res => {
                                        console.log("res.data", res.data)
                                        console.log("path", process.env.PUBLIC_URL)
                                        callback(res.data.location, {
                                            alt: res.data.originalName
                                        })
                                    }
                                ).catch(err => console.log("error in uploading image"))
                            }
                            catch (err) {
                                console.log("an erron man , probly while compressing")
                            }
                        };
                        input.click()
                    },
                    paste_data_images: true,
                }}
                onEditorChange={onEditorChange}
            />
        </div>

    );
}


export default TextEditor