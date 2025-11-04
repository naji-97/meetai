import { agentsInsertSchema } from '@/models/agents/schema';
import { AgentGetOne } from '@/models/agents/types';
import { useTRPC } from '@/trpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
import {Textarea} from "@/components/ui/textarea"
import  GeneratedAvatar  from '@/components/generated-avatar/GeneratedAvatar'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
interface AgentFormProps {
    onSuccess: () => void
    onCancel: () => void;
    initialValues?: AgentGetOne
}
const AgentForm = ({onSuccess, onCancel, initialValues}: AgentFormProps) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient(); 
    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async() => {
               await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());
                if (initialValues?.id) {
                    await queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({id: initialValues.id}));
                }
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    )
    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues:{
            name:initialValues?.name?? "",
            instructions:initialValues?.instructions?? ""
        }
    })
    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;
    const onSubmit= (value: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
            console.log("TODO: updateAgent")
        }else{
            createAgent.mutate(value);
        }
    }
  return (
    <Form {...form} >
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <GeneratedAvatar 
            seed={form.watch("name")}
            varient='botttsNeutral'
            className='border size-16'
            />
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='e.g. John' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Instructions</FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder='e.g. You are a helpful assistant that can answer questions and help with assistants' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className='flex justify-between gap-x-2'>
                {onCancel&& (
                    <Button
                     variant='ghost'
                     disabled={isPending}
                     type='button'
                      onClick={onCancel}
                      >
                        Cancel</Button>
                )}
                <Button type='submit' disabled={isPending} >{isEdit? "Update": "Create"}</Button>
            </div>
        </form>
    </Form>
  )
}

export default AgentForm