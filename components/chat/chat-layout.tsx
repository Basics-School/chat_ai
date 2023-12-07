import Sidebar from "@/components/navigation/sidebar";
import SiderbarOverlay from "@/components/navigation/sidebar-overlay";

import React from "react";
import OpenAIServerKeyProvider from "../providers/openai-serverkey-provider";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <OpenAIServerKeyProvider>
            <div className="relative flex w-full h-full overflow-hidden">
                <SiderbarOverlay />
                <Sidebar />
                {children}
            </div>
        </OpenAIServerKeyProvider>
    );
};

export default ChatLayout;