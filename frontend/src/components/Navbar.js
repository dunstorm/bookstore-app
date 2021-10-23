import React from 'react'
import NavbarItem from './NavbarItem'

export default function Navbar() {
    return (
        <div className="flex mt-6 p-2 relative overflow-auto">
            <NavbarItem title="Popular" isActive={true}></NavbarItem>
            <NavbarItem title="New Releases" isActive={false}></NavbarItem>
            <NavbarItem title="Audiobooks" isActive={false}></NavbarItem>
        </div>
    )
}
