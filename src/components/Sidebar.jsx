'use client'

import { useState } from 'react'
import { ChartColumn, Package, Landmark, Users, User, HandCoins, ChevronLeft, ChevronDown } from "lucide-react"
import {
    Cog6ToothIcon,
    Squares2X2Icon,
    QuestionMarkCircleIcon,
    PowerIcon
} from '@heroicons/react/24/outline'

const navigation = [
    {
        name: 'Database',
        href: '#',
        icon: Squares2X2Icon,
        current: true,
        submenu: [
            { name: 'Parent Organization', href: '#' },
            { name: 'Company', href: '#' },
            { name: 'Plant', href: '#' },
            { name: 'Contact', href: '#' }
        ]
    },
];

const discoverSections = [
    { name: 'Sales & Marketing', href: '#', icon: ChartColumn },
    { name: 'Projects & Implementation', href: '#', icon: Package },
    { name: 'Finance, MIS & POs', href: '#', icon: Landmark },
    { name: 'Vendor Management', href: '#', icon: Users },
    { name: 'Teams & Users', href: '#', icon: User },
    { name: 'Reports & Analytics', href: '#', icon: HandCoins },
    { name: 'Support', href: '#', icon: QuestionMarkCircleIcon },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);

    const toggleSubmenu = (name) => {
        setActiveSubmenu(activeSubmenu === name ? null : name);
    };

    return (
        <div>
            <div className={`fixed inset-0 flex ${collapsed ? "w-72" : "w-28"}`}>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#1E1E1E] px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                        <img
                            alt="Company Logo"
                            src={collapsed ? "/Logo.png" : "/Logo2.png"}
                            className={`h-8 w-auto ${!collapsed ? "mx-auto" : ""}`}
                        />
                    </div>

                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">

                            {/* Home Section */}
                            <li>
                                <span className="text-gray-400 text-sm font-semibold">HOME</span>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <button
                                                onClick={() => toggleSubmenu(item.name)}
                                                className={classNames(
                                                    item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                    'group flex justify-between w-full rounded-md p-2 text-sm font-semibold ',
                                                    !collapsed ? "justify-center" : ""
                                                )
                                                }
                                            >
                                                <div className="flex gap-x-3 ">
                                                    <item.icon aria-hidden="true" className={`size-6 shrink-0 ${!collapsed ? "mx-auto" : ""}`} />
                                                    <span className={`${!collapsed ? "hidden" : "block"}`}>{item.name}</span>
                                                </div>
                                                {item.submenu && <ChevronDown className={`size-4 transition-transform ${!collapsed ? "hidden" : "block "} ${activeSubmenu === item.name ? "rotate-180" : ""}`} />}
                                            </button>

                                            {/* Submenu */}
                                            {item.submenu && activeSubmenu === item.name && (
                                                <ul className="ml-8 space-y-1">
                                                    {item.submenu.map((sub) => (
                                                        <li key={sub.name}>
                                                            <a
                                                                href={sub.href}
                                                                className={`block text-gray-400 hover:bg-gray-800 hover:text-white rounded-md p-2 text-sm my-2 ${!collapsed ? "hidden" : "block"}`}
                                                            >
                                                                {sub.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* Discover Section */}
                            <li>
                                <span className="text-gray-400 text-sm font-semibold">DISCOVER</span>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {discoverSections.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                            >
                                                <item.icon aria-hidden="true" className={`size-6 shrink-0 ${!collapsed ? "mx-auto" : ""}`} />
                                                <span className={`${!collapsed ? "hidden" : "block"}`}>{item.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* Settings & Logout */}
                            <li className="mt-auto">
                                <a
                                    href="#"
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                >
                                    <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                                    <span className={`${!collapsed ? "hidden" : "block"}`}>Settings</span>
                                </a>
                                <a
                                    href="#"
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                >
                                    <PowerIcon aria-hidden="true" className="size-6 shrink-0" />
                                    <span className={`${!collapsed ? "hidden" : "block"}`}>Logout</span>
                                </a>
                                <div className="w-full flex flex-row justify-end">
                                    <button
                                        className="p-4 hover:bg-zinc-800 rounded-lg transition-colors"
                                        onClick={() => setCollapsed(!collapsed)}
                                    >
                                        <ChevronLeft className={`h-4 w-4 ${!collapsed && 'rotate-180'} text-2xl text-white`} />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div >
        </div >
    )
}
