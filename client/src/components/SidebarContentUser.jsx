import React from "react";
import {RiDashboardFill} from 'react-icons/ri';
import {FiLogOut} from 'react-icons/fi';
import {MdEmojiEvents} from 'react-icons/md';
import {MdGroup} from 'react-icons/md';
import {MdPublish} from 'react-icons/md';
import {AiFillSchedule} from 'react-icons/ai';
import {TbReportSearch} from 'react-icons/tb';
import {AiFillTrophy} from 'react-icons/ai';
//import DashboardContent from './DashboardContent';
import {MdManageAccounts} from 'react-icons/md'


export const SidebarContentUser = [
    {
        title: "Dashboard",
        icon: <RiDashboardFill />,
        link: "/UserDash"
    },
    {
        title: "Events",
        icon: <MdEmojiEvents />,
        link: "./ViewEvents"
    },
    // {
    //     title: "Teams",
    //     icon: <MdGroup />,
    //     link: "./Teams"
    // },
    {
        title: "Schedule",
        icon: <AiFillSchedule />,
        link: "./ViewSchedule"
    },
    {
        title: "Submission",
        icon: <MdPublish />,
        link: "./TeamSubmission"
    },
    {
        title: "Standing",
        icon: <AiFillTrophy />,
        link: "./TeamStanding"
    }


    // {
    //     title: "Reports",
    //     icon: <TbReportSearch />,
    //     link: "./Reports"
    // },
    
    // {
    //     title: "Account Settings",
    //     icon: <MdManageAccounts />,
    //     link: "./AccountSettings"
    // }
    
]
    



