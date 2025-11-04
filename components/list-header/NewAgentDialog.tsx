import React from 'react'
import ResponsiveDialog from '../dialog/Dialog'
import AgentForm from '../agents/AgentForm'

interface NewAgentDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}
const NewAgentDialog = ({open, onOpenChange}: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog title="New Agent" description="Create a new agent" open={open} onOpenChange={onOpenChange}>
          <AgentForm onCancel={()=>(onOpenChange(false))} onSuccess={()=>(onOpenChange(false))} />
    </ResponsiveDialog>
  )
}

export default NewAgentDialog