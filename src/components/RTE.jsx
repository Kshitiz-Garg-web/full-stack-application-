
import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../conf/conf'

function RTE({ name, control, label, defaultValue = "" }) {
  console.log('_____',conf.tinyMceApiKey)
  return (
    <div>
      {label && <label>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.tinyMceApiKey}
            height={500}
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | blocks | image | bold italic ' +
                'forecolor | alignleft aligncenter bold italic ' +
                'forecolor | alignleft aligncenter alignright ' +
                'alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',

              content_style:
                "body { font-family:Helvetica, Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  )
}

export default RTE
