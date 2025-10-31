import React from 'react'
import {createAvatar} from '@dicebear/core'
import {botttsNeutral, initials} from '@dicebear/collection'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface GeneratedAvatarProps {
    seed: string
    className?: string
    varient?: 'botttsNeutral' | 'initials'
}
const GeneratedAvatar = ({seed, className, varient}: GeneratedAvatarProps) => {
    let avatar;
    if (varient=== "botttsNeutral") {
        avatar = createAvatar(botttsNeutral, {
            seed,
        })
    }else{
        avatar = createAvatar(initials, {
            seed,
            fontWeight: 500,
            fontSize: 42
        })
    }
  return (
    <Avatar>
        <AvatarImage src={avatar.toDataUri()} alt='' />
        <AvatarFallback  >
            {seed.charAt(0).toUpperCase()}
        </AvatarFallback>
    </Avatar>
  )
}

export default GeneratedAvatar