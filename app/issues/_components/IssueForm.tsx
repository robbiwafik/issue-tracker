'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { createIssueSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

interface Props {
  issue?: Issue
}

type IssueSchema = z.infer<typeof createIssueSchema>

const IssueForm = ({ issue }: Props) => {
  const router = useRouter()
  const [ error, setError ] = useState('')
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const { 
    register, 
    control, 
    handleSubmit,
    formState: { errors }
  } = useForm<IssueSchema>({
    resolver: zodResolver(createIssueSchema)
  })

  const onSubmit: SubmitHandler<IssueSchema> = async (data) => {
    setIsSubmitting(true)
    try {
      await axios.post('/api/issues', data)
      router.push('/issues') 
    } catch (error) {
      setError('An unexpected error ocurred.')
    }
    setIsSubmitting(false)
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
          <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')} />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            name='description'
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => (
              <SimpleMDE  
                placeholder='Description...' 
                {...field} 
              />
              )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Button disabled={isSubmitting}>
            {issue ? 'Edit Issue' : 'Submit New Issue'}
            {isSubmitting && <Spinner />}
          </Button>
      </form>
    </div>
  )
}

export default IssueForm