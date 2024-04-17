'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const [ error, setError ] = useState('')
  const { register, control, handleSubmit } = useForm<IssueForm>() 

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
          <Controller
            name='description'
            control={control}
            render={({ field }) => <SimpleMDE placeholder='Description...' {...field} />}
          />
          <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage