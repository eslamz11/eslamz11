import { useState, useRef, useEffect } from 'react';
import {
    BsPersonWorkspace,
    BsBriefcase,
    BsLaptop,
    BsCodeSlash,
    BsTerminal,
    BsPhone,
    BsGlobe,
    BsDatabase,
    BsPalette,
    BsTools,
    BsAward,
    BsBook,
    BsChevronDown,
    BsBuilding
} from "react-icons/bs";
import {
    FaUserTie,
    FaChalkboardTeacher,
    FaUniversity,
    FaGraduationCap,
    FaCertificate,
    FaProjectDiagram
} from "react-icons/fa";
import { MdWorkOutline, MdSchool, MdOutlineDesignServices } from "react-icons/md";
import { SiFreelancer } from "react-icons/si";

const iconMap = {
    // Work / Experience related
    work: { component: BsPersonWorkspace, label: 'Work' },
    briefcase: { component: BsBriefcase, label: 'Briefcase' },
    laptop: { component: BsLaptop, label: 'Laptop' },
    office: { component: MdWorkOutline, label: 'Office' },
    freelance: { component: SiFreelancer, label: 'Freelance' },
    user: { component: FaUserTie, label: 'Professional' },

    // Education related
    education: { component: FaGraduationCap, label: 'Graduation' },
    school: { component: MdSchool, label: 'School' },
    university: { component: FaUniversity, label: 'University' },
    teacher: { component: FaChalkboardTeacher, label: 'Teacher' },
    certificate: { component: FaCertificate, label: 'Certificate' },
    award: { component: BsAward, label: 'Award' },
    book: { component: BsBook, label: 'Book' },

    // Tech / Skills related
    code: { component: BsCodeSlash, label: 'Code' },
    terminal: { component: BsTerminal, label: 'Terminal' },
    mobile: { component: BsPhone, label: 'Mobile' },
    web: { component: BsGlobe, label: 'Web' },
    database: { component: BsDatabase, label: 'Database' },
    design: { component: MdOutlineDesignServices, label: 'Design' },
    palette: { component: BsPalette, label: 'Art' },
    tools: { component: BsTools, label: 'Tools' },
    project: { component: FaProjectDiagram, label: 'Project' },
    realestate: { component: BsBuilding, label: 'Real Estate' },
};

const IconSelector = ({ value, onChange, label = "Select Icon" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectedKey = value ? value.toLowerCase() : '';
    const SelectedIcon = iconMap[selectedKey]?.component || BsPersonWorkspace;
    const selectedLabel = iconMap[selectedKey]?.label || 'Default';

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block text-slate-700 font-semibold mb-2">{label}</label>

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white flex items-center justify-between hover:border-violet-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                        <SelectedIcon size={18} />
                    </div>
                    <span className="text-slate-700 font-medium">
                        {value ? selectedLabel : 'Select an icon...'}
                    </span>
                    {value && <span className="text-xs text-slate-400">({value})</span>}
                </div>
                <BsChevronDown className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 max-h-64 overflow-y-auto p-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {Object.entries(iconMap).map(([key, { component: Icon, label }]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => {
                                    onChange(key);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${selectedKey === key
                                    ? 'bg-violet-50 text-violet-700 ring-1 ring-violet-500'
                                    : 'hover:bg-slate-50 text-slate-600'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedKey === key ? 'bg-violet-200' : 'bg-slate-100'
                                    }`}>
                                    <Icon size={16} />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-medium">{label}</div>
                                    <div className="text-[10px] text-slate-400">{key}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IconSelector;
