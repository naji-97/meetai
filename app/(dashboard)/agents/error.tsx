"use client"
import ErrorState from '@/components/error-state/ErrorState'
import React from 'react'

const ErrorPage = () => {
  return (
    <ErrorState
    title='Error loading Agents'
    description='Please try again later.'
    />
  )
}

export default ErrorPage