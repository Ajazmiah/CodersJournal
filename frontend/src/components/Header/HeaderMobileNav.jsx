import React from 'react'

function HeaderMobileNav({pagesNavigation}) {
  return (
    <>
     {/* LOGO */}
     <div className={classNames(Styles.navLeft, "flex")}>
        <div className={Styles.logo}>
            <Logo />
          </div>
        {(device !== 'mobile' && device !== 'tablet') && (
        
          <ul className={classNames(Styles.leftMenuList, "flex")}>
            {pagesNavigation.map((page) => (
              <li key={page.to}>
                <Link to={page.to} className={Styles.navLink}>
                  {page.text}
                </Link>
              </li>
            ))}
          </ul>
     
     
        )}
           </div>

        {/* USER SETTING MENU */}
        {userInfo ? (
          <div className={classNames(Styles.navRight, "flex")}>
            <button
              className={Styles.profileButton}
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <ProfileImage
                customClasses="headerImage"
                imageURL={userInfo?.profilePicture || false}
              />
            </button>
            {showMenu && (
              <div className={Styles.userMenu}>
                <ul onClick={() => setShowMenu((prev) => !prev)}>
                  <DropDownMenu
                    dropDownItems={userSettingMenu}
                    Styles={Styles}
                    handleClick={logoutHandler}
                    showMenu={showMenu}
                  />
                </ul>
              </div>
            )}
          </div>
        ) : null}
    </>
  )
}

export default HeaderMobileNav