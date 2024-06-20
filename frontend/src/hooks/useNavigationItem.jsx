import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'




const useNavigationItem = () => {


    const userInfo = useSelector((state) => state?.auth?.userInfo);
   

    const pageLoggedInNavMenu = [
        {
          text: "Home",
          to: "/",
        },
        {
          to: "/create",
          text: "Create",
        }
      ]
      
      const pageLoggedOutNavMenu = [
        {
          text: "Home",
          to: "/",
        },
        {
          text: "Sign In",
          to: "/signin",
        },
        {
          text: "Sign Up",
          to: "/signup",
        },
      ]
      
      const userSettingMenu = [
        {
          to: "/profile",
          text: "Profile",
        },
        {
          to: "profile/update",
          text: "Edit Account",
        },
        {
          text: "Logout",
          Element: "Button",
        },
      ]

    
      
    

      const pagesNavigation = userInfo?._id ? pageLoggedInNavMenu : pageLoggedOutNavMenu
      const loggedInMobileMenu = userInfo?._id ? [...pageLoggedInNavMenu, ...userSettingMenu] : pagesNavigation

      return [userSettingMenu, pagesNavigation, userInfo, loggedInMobileMenu]



}

export default useNavigationItem