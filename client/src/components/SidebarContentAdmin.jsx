import React from "react";
import {RiDashboardFill} from 'react-icons/ri';
import {FiLogOut} from 'react-icons/fi';
import {MdEmojiEvents} from 'react-icons/md';
import {MdGroup} from 'react-icons/md';
import {MdPublish} from 'react-icons/md';
import {AiFillSchedule} from 'react-icons/ai';
import {AiFillTrophy} from 'react-icons/ai';
import {TbReportSearch} from 'react-icons/tb';
//import DashboardContent from './DashboardContent';
import {MdManageAccounts} from 'react-icons/md'


export const SidebarContentAdmin = [
    {
        title: "Dashboard",
        icon: <RiDashboardFill />,
        link: "/AdminDash"
    },
    {
        title: "Events",
        icon: <MdEmojiEvents />,
        link: "./Events"
    },
    {
        title: "Teams",
        icon: <MdGroup />,
        subMenu: [
            {  title: "View Teams",
               link: "./teams"
            },
            {  title: "View Players",
               link: "./Players"
            },
            {  title: "Team Standings",
               link: "./TeamStandings"
            }

        ]
          
    },
            
    {
        title: "Schedule",
        icon: <AiFillSchedule />,
        link: "./Schedule"
    },
    {
        title: "Submission",
        icon: <MdPublish />,
        link: "./Submission"
    },

    {
        title: "Reports",
        icon: <TbReportSearch />,
        link: "./Reports"
    },
    
    // {
    //     title: "Account Settings",
    //     icon: <MdManageAccounts />,
    //     link: "./AccountSettings"
    // }
    
]
    



