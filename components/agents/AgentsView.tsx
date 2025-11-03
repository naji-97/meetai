"use client"
import { useTRPC } from '@/trpc/client';
import { useQuery, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import React, { use } from 'react'
import LoadingState from '../loading-state/LoadingState';
import ErrorState from '../error-state/ErrorState';

export const AgentsView = () => {
    const trpc = useTRPC();
    const {data} =useSuspenseQuery(trpc.agents.getMany.queryOptions());

    // if (isLoading) {
    //     return <LoadingState
    //     title='Loading agents'
    //     description='This may take a few seconds...'
    //     />;
    // }
    // if (isError) {
    //     return <ErrorState
    //     title='Error loading agents'
    //     description='Please try again later.'
    //     />;
    // }
  return (
    <div>{JSON.stringify(data, null, 2)}</div>
  )
}



export const AgentsViewLoading = () => {
  return (  
        <LoadingState title='Loading Agents' description='This may take a few seconds...' />
  )
}

export const AgentsViewError= () => {
  return (
    <ErrorState
    title='Error loading Agents'
    description='Please try again later.'
    />
  )
}