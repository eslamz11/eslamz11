"use client";

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
    work: BsPersonWorkspace,
    briefcase: BsBriefcase,
    laptop: BsLaptop,
    office: MdWorkOutline,
    freelance: SiFreelancer,
    user: FaUserTie,

    // Education related
    education: FaGraduationCap,
    school: MdSchool,
    university: FaUniversity,
    teacher: FaChalkboardTeacher,
    certificate: FaCertificate,
    award: BsAward,
    book: BsBook,

    // Tech / Skills related
    code: BsCodeSlash,
    terminal: BsTerminal,
    mobile: BsPhone,
    web: BsGlobe,
    database: BsDatabase,
    design: MdOutlineDesignServices,
    palette: BsPalette,
    tools: BsTools,
    project: FaProjectDiagram,
    realestate: BsBuilding,
};

const IconRenderer = ({ iconName, className, size = 26, defaultIcon = "work" }) => {
    // Normalize input to lowercase
    const key = iconName ? iconName.toLowerCase() : defaultIcon;

    // Get the icon component, fallback to default if not found
    const IconComponent = iconMap[key] || iconMap[defaultIcon] || BsPersonWorkspace;

    return <IconComponent className={className} size={size} />;
};

export default IconRenderer;
