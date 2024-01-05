import React from 'react';

interface RCardProps {
    // Define your component's props here
    data?: string[];
    heading: String;
    description: String;
    icon: React.ReactNode; // Use React.ReactNode for the icon prop
    className?: String;
}

const RCard: React.FC<RCardProps> = ({ data, heading, description, icon, className }) => {
    return (
        <div className={`flex gap-4 rounded-xl shadow-sm p-6 ${className || ''}`}>
            <div className="min-w-max">{icon}</div>
            <div className="space-y-2">
                <h3 className="text-[22px] font-semibold text-sky-700">{heading}</h3>
                <p className="leading-8 text-gray-500 font-normal">{description}</p>
            </div>
        </div>
    );
};

export default RCard;