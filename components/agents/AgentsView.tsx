"use client"
import { useTRPC } from '@/trpc/client';
import { useQuery, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import React, { use } from 'react'
import LoadingState from '../loading-state/LoadingState';
import ErrorState from '../error-state/ErrorState';
import { DataTable } from './data-table';
import { columns } from './columns';
import EmptyState from '../empty-state/EmptyState';


export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

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
    <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4'><DataTable data={data} columns={columns} />
      {data?.length === 0 && <EmptyState title='Create your first agent' description='Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call.' />}
    </div>
  )
}



export const AgentsViewLoading = () => {
  return (
    <LoadingState title='Loading Agents' description='This may take a few seconds...' />
  )
}

export const AgentsViewError = () => {
  return (
    <ErrorState
      title='Error loading Agents'
      description='Please try again later.'
    />
  )
}