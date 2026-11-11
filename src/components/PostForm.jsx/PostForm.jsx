import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({ post }) {

  const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active"
    }
  })
  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)
  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

      if (file) {
        appwriteService.deleteFile(PostForm.featuredImage)
      }
      const dbPost = appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined
      })
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    }
    else {
      const file = await appwriteService.uploadFile(data.image[0])
      console.log('----------------------')
      console.log(file.$id)
      console.log('----------------------')

      if (file) {
        const fileId = file.$id

        console.log('data----------')
        console.log(data)
        console.log('data----------')

        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: fileId,
          userId: userData.$id
        })
     

        console.log('dbpost - ', dbPost)
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue(
          'slug',
          slugTransform(
            value.title,
            {
              shouldValidate: true
            }
          ))
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch, slugTransform, setValue])

  console.log("Post Debugging:", {
    post: post,
    featuredImage: post?.featuredImage,
    featuredImageType: typeof post?.featuredImage,
    hasFeaturedImage: Boolean(post?.featuredImage)
  })

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="">
        <Input
          label="Title :"
          placeholder="Title"
          className=""
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className=""
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="">
        <Input
          label="Featured Image :"
          type="file"
          className=""
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="">
            <img
              src={appwriteService.getFilePreview(post?.featuredImage)}
              alt={post.title}
              className=""
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className=""
          {...register("status", { required: true })}
        />
        <Button type="submit" className="">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm