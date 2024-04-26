'use client'

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'

const NavBar = () => {    
    return (
        <nav className='py-6 border-b mb-5'>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href='/'>
                            <AiFillBug />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    )
}

const NavLinks = () => {
    const currentPath = usePathname()
    
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues/list'}
    ]
    
    return (
        <ul className='flex space-x-6'>
            {links.map(link => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={classNames({
                            'nav-link': true,
                            '!text-zinc-900': currentPath === link.href,
                        })}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}    
        </ul>
    )
}

const AuthStatus = () => {
    const { status, data: session } = useSession()

    if (status === 'loading')
        return null

    if (status === 'unauthenticated')
        return <Link className='nav-link' href='/api/auth/signin'>Log in</Link>

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar 
                        src={session!.user!.image!} 
                        fallback='?' 
                        radius='full'
                        className='cursor-pointer'
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size='2'>
                            {session!.user!.email}
                        </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href='/api/auth/signout'>Log out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    )
}

export default NavBar