import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import appwriteService from '../../appwrite/config'
import { Button, Input, RTE, Select } from '../index'

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    if (post) {
      const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

      if (file) {
        appwriteService.deleteFile(post.featuredImage)
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined
      })

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0])

      if (file) {
        const fileId = file.$id
        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: fileId,
          userId: userData.$id
        })

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s+/g, '-')
    }

    return ''
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true })
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="form-shell">
      <div className="form-grid">
        <div className="form-panel field-stack">
          <Input
            label="Title"
            placeholder="Title"
            {...register('title', { required: true })}
          />
          <Input
            label="Slug"
            placeholder="Slug"
            readOnly
            {...register('slug', { required: true })}
            onInput={(e) => {
              setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
            }}
          />
          <div className="field-group">
            <RTE label="Content" name="content" control={control} defaultValue={getValues('content')} />
          </div>
        </div>

        <div className="form-panel field-stack">
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register('image', { required: !post })}
          />

          {post && (
            <div className="field-group">
              <img
                src={appwriteService.getFilePreview(post?.featuredImage)}
                alt={post.title}
                className="preview-image"
              />
            </div>
          )}

          <Select
            options={['active', 'inactive']}
            label="Status"
            {...register('status', { required: true })}
          />

          <div className="button-row">
            <Button type="submit">
              {post ? 'Update' : 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PostForm