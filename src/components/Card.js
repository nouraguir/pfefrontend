import React from 'react';
import {IoMailOutline, IoChevronForward, FcDataConfiguration,IoApps, IoNotifications, IoPieChart, IoNewspaper, IoCard, IoColorFill} from "react-icons/io5";
import {IconContext} from "react-icons";
import {motion} from 'framer-motion';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import WebhookOutlinedIcon from '@mui/icons-material/WebhookOutlined';
import { DesktopMacOutlined, UpdateOutlined } from '@material-ui/icons';
import ApiOutlinedIcon from '@mui/icons-material/ApiOutlined';
let easing = [0.6,-0.05,0.01,0.99];

const container = {
    show:{
        transition:{
            staggerChildren:0.2
        }
    }
};

const item = {
    hidden:{opacity:0,y:20},
    show:{
        opacity:1,
        y:0,
        transition:{
            ease:'easeInOut',
            duration:.2
        }
    }
}

const title = {
    hidden:{
        y:60,
        opacity:0
    },
    show:{
        y:0,
        opacity:1,
        transition:{
            delay:.2,
            duration:0.6,
            ease:easing
        }
    }
};

const hoverEffect = {
    whileHover:{
        scale:1.5,rotate:630,borderRadius:"100%"
    },
    whileTap:{
        scale:.8,rotate:630,borderRadius:"100%"
    },
}



function Card() {
  return (
    <motion.div className="service_container">
        <div className="title_wrapper">
            <motion.span className="service_title"
                initial={{y:20, opacity:0}}
                animate={{y:0, opacity:1}}
                exit={{opacity:0}}
                transition={{duration:.5, delay:1.8}}
            >Our Services</motion.span>
            <motion.h2
                initial={{y:200, opacity:0}}
                animate={{y:0, opacity:1}}
                exit={{opacity:0}}
                transition={{duration:.5, delay:1}}
            >Manage your servers from everywhere and anywhere<br/>For Your Business.</motion.h2>
        </div>


        <motion.div className="service_card" variants={container} initial="hidden" exit="exit" whileInView="show" viewport={{once:false}}>

            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#65cbe9"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <IconContext.Provider value={{color:"#14da8f", size:"22px"}}>
                        <SettingsOutlinedIcon/>
                    </IconContext.Provider>
                </motion.span>
                <h3>Centralized Configuration Management</h3>
                <a href="/configurationinfo">
                    <span>Learn more</span>
                    <IconContext.Provider value={{color:"#65cbe9", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>

            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#68b6ef"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <IconContext.Provider value={{color:"#5700cf", size:"22px"}}>
                        <LockOutlinedIcon/>
                    </IconContext.Provider>
                </motion.span>
                <h3>Secure and Reliable</h3>
                <a href="/secureinfo">
                    <span>Learn more</span>
                    <IconContext.Provider value={{color:"#68b6ef", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>
            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#6c8dfa"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <IconContext.Provider value={{color:"#ff8559", size:"22px"}}>
                        <WebhookOutlinedIcon/>
                    </IconContext.Provider>
                </motion.span>
                <h3>Standarize Access</h3>
                <a href="/access">
                    <span>Learn more</span>
                    <IconContext.Provider value={{color:"#6c8dfa", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>
            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#998B7B"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <IconContext.Provider value={{color:"#", size:"22px"}}>
                        <GppGoodOutlinedIcon/>
                    </IconContext.Provider>
                </motion.span>
                <h3>Security</h3>
                <a href="/securityinfo">
                    <span>Learn more</span>
                    <IconContext.Provider value={{color:"#998B7B", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>
            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#61f4de"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <IconContext.Provider value={{color:"#56a8f4", size:"22px"}}>
                        <AppsOutlinedIcon/>
                    </IconContext.Provider>
                </motion.span>
                <h3>Application</h3>
                <a href="/application">
                    <span>Learn more</span>
                    <IconContext.Provider value={{color:"#61f4de", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>
            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#abc4ff"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <IconContext.Provider value={{color:"#06d786", size:"22px"}}>
                        <DesktopMacOutlined/>
                    </IconContext.Provider>
                </motion.span>
                <h3>Virtual Machine</h3>
                <a href="/vm">
                    <span>Learn more</span>
                    <IconContext.Provider value={{color:"#abc4ff", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>
            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#3A5874"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <IconContext.Provider value={{color:"#f1df11", size:"22px"}}>
                        <UpdateOutlined/>
                    </IconContext.Provider>
                </motion.span>
                <h3>System Updates</h3>
                <a href="/updates">
                    <span>Learn more</span>
                    <IconContext.Provider value={{color:"#3A5874", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>
            
            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#94A6BB"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <IconContext.Provider value={{color:"#f1df11", size:"22px"}}>
                        <ApiOutlinedIcon/>
                    </IconContext.Provider>
                </motion.span>
                <h3>S3 Service</h3>
                <a href="/s3">
                    <span>Learn more</span>
                    <IconContext.Provider value={{color:"#94A6BB", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>

            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#7894B0"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <IconContext.Provider value={{color:"#f1df11", size:"22px"}}>
                        <AccountTreeOutlinedIcon/>
                    </IconContext.Provider>
                </motion.span>
                <h3>Backup Projects</h3>
                <a href="/updates">
                    <span>Learn more</span>
                    <IconContext.Provider value={{color:"#7894B0", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>
            
        </motion.div>

    </motion.div>
  )
}

export default Card



//thanks for watching
//please subscribe my channel..........