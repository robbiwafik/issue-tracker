'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import { createIssueSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const router = useRouter()
  const [ error, setError ] = useState('')
  const { 
    register, 
    control, 
    handleSubmit,
    formState: { errors }
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  }) 

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      await axios.post('/api/issues', data)
      router.push('/issues') 
    } catch (error) {
      setError('An unexpected error ocurred.')
    }
  }
  
  return (
    <div className='max-w-xl'>
      {error &&
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
      <form
        className='space-y-3'
        onSubmit={handleSubmit(onSubmit)}
      >
          <TextField.Root placeholder='Title' {...register('title')} />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            name='description'
            control={control}
            render={({ field }) => <SimpleMDE placeholder='Description...' {...field} />}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage