import React from "react";
import NavBar from "./Navbar.tsx";
// Create a default layout that takes ReactNode as children
export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col justify-center h-screen">
            <NavBar />
            <main className="container mx-auto max-w-7xl flex-grow px-8 py-4">
                {children}
            </main>
        </div>
    );
}