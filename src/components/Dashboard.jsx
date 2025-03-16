'use client'
import data from "../../utility/data";
import { useState } from "react";
import { BellIcon, MagnifyingGlassIcon, UserCircleIcon, FunnelIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    const [filters, setFilters] = useState({
        parentOrg: "",
        company: "",
        industry: "",
        accountOwner: "",
        companySize: "",
        accountPotential: ""
    });




    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value
        }));
    };

    const filteredData = data.filter(item => {
        return (
            (filters.parentOrg === "" || item.parent === filters.parentOrg) &&
            (filters.company === "" || item.company === filters.company) &&
            (filters.industry === "" || item.industry === filters.industry) &&
            (filters.accountOwner === "" || item.owner === filters.accountOwner) &&
            (filters.companySize === "" || item.size === filters.companySize) &&
            (filters.accountPotential === "" || item.accountPotential === filters.accountPotential) &&
            Object.values(item).some(value =>
                value.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    });

    const uniqueValues = (key) => [...new Set(data.map(item => item[key]))];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar Placeholder */}
            <div className="w-28 bg-black"></div>

            {/* Main Dashboard */}
            <div className="flex flex-col flex-1 p-6 overflow-x-scroll">
                {/* Header */}
                <header className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg">
                    <h1 className="text-xl font-semibold text-gray-900">Database</h1>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-md p-2">
                            <input
                                type="text"
                                placeholder="Search"
                                className="outline-none text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 ml-2" />
                        </div>

                        <BellIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
                        <UserCircleIcon className="h-8 w-8 text-gray-600 cursor-pointer" />
                    </div>
                </header>

                {/* Filters Section */}
                <div className="flex flex-wrap gap-4 mt-4">
                    <select
                        className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none"
                        value={filters.parentOrg}
                        onChange={(e) => handleFilterChange("parentOrg", e.target.value)}
                    >
                        <option value="">Parent Organization</option>
                        {uniqueValues("parent").map((org) => (
                            <option key={org} value={org}>{org}</option>
                        ))}
                    </select>

                    <select
                        className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none"
                        value={filters.company}
                        onChange={(e) => handleFilterChange("company", e.target.value)}
                    >
                        <option value="">Company</option>
                        {uniqueValues("company").map((comp) => (
                            <option key={comp} value={comp}>{comp}</option>
                        ))}
                    </select>

                    <select
                        className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none"
                        value={filters.industry}
                        onChange={(e) => handleFilterChange("industry", e.target.value)}
                    >
                        <option value="">Industry</option>
                        {uniqueValues("industry").map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                        ))}
                    </select>

                    <select
                        className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none"
                        value={filters.accountOwner}
                        onChange={(e) => handleFilterChange("accountOwner", e.target.value)}
                    >
                        <option value="">Account Owner</option>
                        {uniqueValues("owner").map((owner) => (
                            <option key={owner} value={owner}>{owner}</option>
                        ))}
                    </select>

                    {/* Advanced Filters Toggle */}
                    <button
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold"
                    >
                        <FunnelIcon className="h-5 w-5" />
                        <span>Advanced Filters</span>
                    </button>
                </div>

                {/* Advanced Filters  */}
                {showAdvancedFilters && (
                    <div className="flex flex-wrap gap-4 mt-4 bg-white p-4 rounded-md shadow-md">
                        <select
                            className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none"
                            value={filters.companySize}
                            onChange={(e) => handleFilterChange("companySize", e.target.value)}
                        >
                            <option value="">Company Size</option>
                            {uniqueValues("size").map((size) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>

                        <select
                            className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none"
                            value={filters.accountPotential}
                            onChange={(e) => handleFilterChange("accountPotential", e.target.value)}
                        >
                            <option value="">Est. Account Potential</option>
                            {uniqueValues("accountPotential").map((potential) => (
                                <option key={potential} value={potential}>{potential}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="flex justify-end mt-4">
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
                        Create Company
                    </button>
                </div>
                <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden w-full overflow-x-scroll">
                    <table className="min-w-full border-collapse ">
                        <thead className="bg-orange-600 text-white">
                            <tr>
                                {["Company Name", "Parent Organization", "Industry", "Sub-Industry", "Company Website", "Company Size", "Est. Account Potential", "Account Owner"].map((header) => (
                                    <th key={header} className="px-6 py-3 text-left text-sm font-semibold">{header}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="bg-white">
                            {filteredData.map((item, i) => (
                                <tr key={i} className="border-t">
                                    <td className="px-6 py-4 font-bold">{item.company}</td>
                                    <td className="px-6 py-4">{item.parent}</td>
                                    <td className="px-6 py-4">{item.industry}</td>
                                    <td className="px-6 py-4">{item.subIndustry}</td>
                                    <td className="px-6 py-4">{item.website}</td>
                                    <td className="px-6 py-4">{item.size}</td>
                                    <td className="px-6 py-4">{item.accountPotential}</td>
                                    <td className="px-6 py-4 font-bold">{item.owner}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
