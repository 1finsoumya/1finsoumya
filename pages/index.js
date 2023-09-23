import React, { useState, useEffect } from "react";
import styles from "./events.module.css";
import PrimaryBtn from "./components/primarybtn/PrimarytBtn";
import RegisterForm from "./components/registerform/RegisterForm";
import axios from "axios";
import Head from "next/head";

const index = () => {

  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const [brandImages, setBrandImages] = useState({
    education: '',
    media: ''
  })

  const handleView = () => {
    // document.getElementById("registerForm").scrollIntoView();
    window?.scrollTo({
      top: document.getElementById("registerForm").offsetTop - 100,
      behavior: 'smooth'
    })
  }

  const scrollHandler = () => {
    const element = document?.getElementById("bottom_register_btn")?.getBoundingClientRect(); // bottom sticky one
    const bottomRegBtn = document?.getElementById("bottom_register_btn")?.offsetTop;
    const formTop = document?.getElementById("event_register_form").offsetTop;
    if(window?.pageYOffset >= document?.getElementById("event_register_btn")?.offsetTop){ // top button 
      setIsBtnVisible(true)
    }else{
      setIsBtnVisible(false)
    }
    console.log('formtopis', formTop, 'bttom reg btn offsetTop', bottomRegBtn, 'isbtn visible', isBtnVisible)
    // if((formTop > bottomRegBtn) && (isBtnVisible === true)) {
    //   setIsBtnVisible(false)
    // }
  }

  useEffect(()=>{
    document.addEventListener('scroll', scrollHandler)
    return () => document.removeEventListener('scroll', scrollHandler);
  }, [])

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_WP_API}/events/v1/sponsors`).then((res)=>{
      const data = res.data;
      const newBrandImages = {};
      data.forEach(item => {
        if (item.flag === "0") {
          newBrandImages.education = item.url;
        } else if (item.flag === "1") {
          newBrandImages.media = item.url;
        }
      });
      setBrandImages(newBrandImages);
    })
  }, [])

  return (
    <div className={`${styles["event_page"]}`}>
      <Head>
        <title>GFP Event Page</title>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/pbo4top.css"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;200;300;400;500;600;700;800;900&family=League+Spartan:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* header section start */}
      <header className={styles.global_header}>
        <a href="javascript:void(0)" className={`${styles["logo"]}`}>
          <img
            src="/images/event-page/global-financial-summit-logo.svg"
            width="83"
            height="39"
            alt="event-brand-logo"
          />
        </a>
        <div className={`${styles["header_right"]}`} style={{ display: 'flex', alignItems: 'center'}}>
          <a
            className={`${styles["hosted_by"]} ${styles.brand_img} ${styles["active"]}`}
            href="javascript:void(0)"
          >
            Presented by
            <img
              src="/images/event-page/1fin-logo.svg"
              width="34"
              height="40"
              alt="1fin-logo"
            />
          </a>
          <a
            className={`${styles["education_partner"]} ${styles.brand_img}`}
            href="javascript:void(0)"
          >
            Education partner
            {brandImages?.education && <img
              src={brandImages?.education || null}
              width="42"
              height="30"
              alt="fbsp-logo"
            />}
          </a>
          <a className={`${styles["media_partner"]} ${styles.brand_img}`} href="javascript:void(0)">
            Media partner
            {brandImages?.media && <img
              src={brandImages?.media || null}
              width="47"
              height="17"
              alt="mint-logo"
            />}
          </a>
          { isBtnVisible && <PrimaryBtn btn_name="Register" btn_disable={false} onClickHandler={handleView} />}
        </div>
      </header>
      {/* header section ends */}
      <div className={`${styles["container"]}`}>
        {/* hero-banner section start */}
        <div className={`${styles["hero_banner"]}`}>
          <a
            href="javascript:void(0)"
            className={`${styles["event_page_logo"]}`}
          >
            <img
              src="/images/event-page/global-financial-summit-logo.svg"
              width="83"
              height="39"
              alt="event-brand-logo"
            />
          </a>
          <h2 className={`${styles["hero_banner_sup_title"]}`}>
            India's Exclusive Invite-Only
          </h2>
          <h1 className={`${styles["hero_banner_title"]}`}>
            Global Financial Planners Summit 2023
          </h1>
          <h3 className={`${styles["hero_banner_sub_title"]}`}>
            Where Insights, Connections, and Leading Expertise Unite
          </h3>
          <ul className={`${styles["hero_banner_list"]}`}>
            <li className={`${styles["list_item"]}`}>
              <img
                className={`${styles["list_item_icon"]}`}
                src="/images/event-page/calendar-icon.svg"
                width="20"
                height="20"
                alt="calendar-icon"
              />
              <span className={`${styles["list_item_value"]}`}>
                October 7, 2023
              </span>
            </li>
            <li className={`${styles["list_item"]}`}>
              <img
                className={`${styles["list_item_icon"]}`}
                src="/images/event-page/time-clock-icon.svg"
                width="20"
                height="20"
                alt="time-clock-icon"
              />
              <span className={`${styles["list_item_value"]}`}>
                9:30 AM - 3:00 PM
              </span>
            </li>
            <li className={`${styles["list_item"]}`}>
              <img
                className={`${styles["list_item_icon"]}`}
                src="/images/event-page/location-icon.svg"
                width="20"
                height="20"
                alt="location-icon"
              />
              <span className={`${styles["list_item_value"]}`}>
                The Westin, Goregaon
              </span>
            </li>
          </ul>
          <span id='event_register_btn'>
            <PrimaryBtn btn_name="Register" btn_disable={false} onClickHandler={handleView} />
          </span>
          <span className={`${styles["limited_invitation_text"]}`}>
            Limited Invitations Available
          </span>
          <div className={`${styles["header_right"]}`}>
            <a
              className={`${styles["hosted_by"]} ${styles.brand_img} ${styles["active"]}`}
              href="javascript:void(0)"
            >
              <span>Presented by</span>
              <img
                src="/images/event-page/1fin-logo.svg"
                width="30"
                height="45"
                alt="1fin-logo"
              />
            </a>
            <div className={`${styles["header_right_bottom"]}`}>
              <a
                className={`${styles["education_partner"]}`}
                href="javascript:void(0)"
              >
                <span>Education partner</span>
                <img
                  src="/images/event-page/fbsp-logo.svg"
                  width="42"
                  height="30"
                  alt="fbsp-logo"
                />
              </a>
              <a
                className={`${styles["media_partner"]}`}
                href="javascript:void(0)"
              >
                <span>Media partner</span>
                <img
                  src="/images/event-page/mint-logo.svg"
                  width="47"
                  height="17"
                  alt="mint-logo"
                />
              </a>
            </div>
          </div>
        </div>
        {/* hero-banner section ends */}

        {/*about the event section start */}
        <div className={`${styles["about_event"]}`}>
          <h2 className={`${styles["about_event_title"]}`}>About the Event</h2>
          <p className={`${styles["about_event_para"]}`}>
            Every year, on the first Wednesday of October, the world unites to
            celebrate World Financial Planning Day (WFPD). WFPD is a global
            initiative to raise awareness of the importance of financial
            planning and to empower individuals to achieve their financial
            goals.
          </p>
          <p className={`${styles["about_event_para"]}`}>
            This year, 1 Finance is proud to join the global community in
            celebrating WFPD and to highlight the importance of financial
            planning for consumers of financial services in India.
          </p>
        </div>
        {/* about the event section ends */}

        {/* core objective summit section start */}
        <div className={`${styles["core_objectives_summit"]}`}>
          <h2 className={`${styles["objectives_title"]}`}>
            Core Objectives of The Summit
          </h2>
          <ul className={`${styles["objectives_list"]}`}>
            <li className={`${styles["objectives_list_item"]}`}>
              <span className={`${styles["list_item_title"]}`}>
                Showcase India's Potential
              </span>
              <p className={`${styles["objectives_list_para"]}`}>
                Underscore the country's potential as a burgeoning hub for
                financial planning and advisory services.
              </p>
            </li>
            <li className={`${styles["objectives_list_item"]}`}>
              <span className={`${styles["list_item_title"]}`}>
                Highlight Responsible Financial Planning
              </span>
              <p className={`${styles["objectives_list_para"]}`}>
                Responsible and sustainable financial planning, emphasising
                ethical and prudent practices.
              </p>
            </li>
            <li className={`${styles["objectives_list_item"]}`}>
              <span className={`${styles["list_item_title"]}`}>
                Foster Community Networking
              </span>
              <p className={`${styles["objectives_list_para"]}`}>
                A dynamic platform for financial planners to connect, exchange
                ideas, and collaborate.
              </p>
            </li>
            <li className={`${styles["objectives_list_item"]}`}>
              <span className={`${styles["list_item_title"]}`}>
                Inspire Action
              </span>
              <p className={`${styles["objectives_list_para"]}`}>
                Insightful discussions led by industry veterans to empower
                proactive financial advisory practices.
              </p>
            </li>
          </ul>
        </div>
        {/* core objective summit section ends */}

        {/* event details section start */}
        <div className={`${styles["event_details"]}`}>
          <h2 className={`${styles["event_details_title"]}`}>Event Details</h2>
          <div className={`${styles["event_details_card"]}`}>
            <ul className={`${styles["event_details_list"]}`}>
              <li className={`${styles["event_details_item"]}`}>
                <img
                  src="/images/event-page/calendar-light-icon.svg"
                  width="20"
                  height="20"
                  alt="calendar-light-icon"
                />
                <span className={`${styles["event_details_value"]}`}>
                  October 7, 2023
                </span>
              </li>
              <li className={`${styles["event_details_item"]}`}>
                <img
                  src="/images/event-page/time-clock-light-icon.svg"
                  width="20"
                  height="20"
                  alt="time-clock-light-icon"
                />
                <span className={`${styles["event_details_value"]}`}>
                  9:30 AM - 3:00 PM
                </span>
              </li>
              <li
                className={`${styles["event_details_item"]} ${styles["active"]}`}
              >
                <img
                  src="/images/event-page/location-dark-icon.svg"
                  width="20"
                  height="20"
                  alt="location-dark-icon"
                />
                <span className={`${styles["event_details_value"]}`}>
                  The Westin, Goregaon
                </span>
              </li>
            </ul>
          </div>
          <div className={`${styles["order_events"]}`}>
            <h2 className={`${styles["order_events_title"]}`}>
              Order of Events
            </h2>
            <ul className={`${styles["events_list"]}`}>
              <li className={`${styles["events_list_item"]}`}>
                <span className={`${styles["event_time"]}`}>
                  9.30 - 10.30 AM
                </span>
                <span className={`${styles["event_name"]}`}>
                  Breakfast, Engagement and Networking
                </span>
              </li>
              <li className={`${styles["events_list_item"]}`}>
                <span className={`${styles["event_time"]}`}>
                  10:30 - 10:40 AM
                </span>
                <span className={`${styles["event_name"]}`}>
                  Welcome address
                </span>
              </li>
              <li className={`${styles["events_list_item"]}`}>
                <span className={`${styles["event_time"]}`}>
                  10:40 - 11:00 AM
                </span>
                <span className={`${styles["event_name"]}`}>
                  Opening Note - Anooj Mehta
                </span>
              </li>
              <li className={`${styles["events_list_item"]}`}>
                <span className={`${styles["event_time"]}`}>
                  11:00 - 11:30 AM
                </span>
                <span className={`${styles["event_name"]}`}>
                  Keynote speaker's session
                </span>
              </li>
              <li className={`${styles["events_list_item"]}`}>
                <span className={`${styles["event_time"]}`}>
                  11:30 - 12:15 PM
                </span>
                <span className={`${styles["event_name"]}`}>
                  Panel Discussion
                </span>
                <div className={`${styles["event_user_card"]}`}>
                  <div className={`${styles["user_card_header"]}`}>
                    <img
                      src="/images/event-page/kirtan.png"
                      width="50"
                      height="50"
                      alt="user-image"
                    />
                    <div className={`${styles["user_about"]}`}>
                      <span className={`${styles["user_name"]}`}>
                        Kirtan Shah
                      </span>
                      <span className={`${styles["user_desc"]}`}>
                        Wealth Management solutions for UHNI’s, HNI’s &
                        Corporate Treasury
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li className={`${styles["events_list_item"]}`}>
                <span className={`${styles["event_time"]}`}>
                  12.15 - 12.30 PM
                </span>
                <span className={`${styles["event_name"]}`}>
                  Papa please - Awareness Initiate Film Release
                </span>
                <img
                  className={`${styles["event_img"]}`}
                  src="/images/event-page/papa-please-img.png"
                  width="467"
                  height="263"
                  alt="papa-please-img"
                ></img>
              </li>
              <li className={`${styles["events_list_item"]}`}>
                <span className={`${styles["event_time"]}`}>
                  12:30 - 1:00 PM
                </span>
                <span className={`${styles["event_name"]}`}>Fireside Chat</span>
                <span className={`${styles["event_sub-title"]}`}>
                  Account Aggregator Framework - How will it change the future
                  of Finance Industry
                </span>
                <ul className={`${styles["event_card-list"]}`}>
                  <li className={`${styles["card-item"]}`}>
                    <img
                      className={`${styles["user_img"]}`}
                      src="/images/event-page/jeet-image.png"
                      width="50"
                      height="50"
                      alt="user-image"
                    />
                    <div className={`${styles["user_about"]}`}>
                      <span className={`${styles["user_name"]}`}>
                        Jeet Marwadi
                      </span>
                      <span className={`${styles["user-designation"]}`}>
                        Founder, 1 Finance
                      </span>
                    </div>
                  </li>
                  <li className={`${styles["card-item"]}`}>
                    <img
                      className={`${styles["user_img"]}`}
                      src="/images/event-page/nikhil.png"
                      width="50"
                      height="50"
                      alt="user-image"
                    />
                    <div className={`${styles["user_about"]}`}>
                      <span className={`${styles["user_name"]}`}>
                        Nikhil Kurhe
                      </span>
                      <span className={`${styles["user-designation"]}`}>
                        Co-Founder & CEO at Finarkein Analytics
                      </span>
                    </div>
                  </li>
                </ul>
              </li>
              {/* <li className={`${styles["events_list_item"]}`}>
                <span className={`${styles["event_time"]}`}>
                  12.50 - 1.00 PM
                </span>
                <span className={`${styles["event_name"]}`}>Closing Note</span>
              </li> */}
              <li className={`${styles["events_list_item"]}`}>
                <span className={`${styles["event_time"]}`}>
                  1.00 - 3.00 PM
                </span>
                <span className={`${styles["event_name"]}`}>
                  Networking Lunch
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* event details section ends */}
      </div>
      {/* register form section start */}
      <div className={`${styles["register_now"]}`} id="registerForm">
        <div className={`${styles["register_now_content"]}`}>
          <h2 className={`${styles["register_now_title"]}`}>Register Now</h2>
          <p className={`${styles["register_now_para"]}`}>
            Secure your exclusive invitation to the Global Financial Planners
            Summit by providing your details here
          </p>
        </div>
        <span id="event_register_form">
          <RegisterForm />
        </span>
      </div>
      {/* register form section ends */}

      {/* footer section start */}
      <footer>
        {/* <span className={`${styles["powered_by"]}`}>
          Powered by
          <a href="javascript:void(0)" className={`${styles["fin_logo"]}`}>
            <img
              src="/images/event-page/1fin-logo.svg"
              alt="1fin-logo"
              width="34"
              height="40"
            />
          </a>
        </span> */}
        <a
          className={`${styles["hosted_by"]} ${styles.brand_img} ${styles["active"]}`}
          href="javascript:void(0)"
        >
          Presented by
          <img
            src="/images/event-page/1fin-logo.svg"
            width="34"
            height="40"
            alt="1fin-logo"
          />
        </a>
        <div  className={`${styles["footer_bottom"]}`}>
          <a
            className={`${styles["education_partner"]}`}
            href="javascript:void(0)"
          >
            Education partner
            <img
              src="/images/event-page/fbsp-logo.svg"
              width="42"
              height="30"
              alt="fbsp-logo"
            />
          </a>
          <a className={`${styles["media_partner"]}`} href="javascript:void(0)">
            Media partner
            <img
              src="/images/event-page/mint-logo.svg"
              width="47"
              height="17"
              alt="mint-logo"
            />
          </a>
        </div>
      </footer>
      {/* footer section ends */}
      { isBtnVisible && 
            <div id="bottom_register_btn" className={`${styles["sticky-button-mobile-container"]}`}>
              <div className={`${styles["sticky-button-mobile"]}`}>
                  <span className={`${styles["sticky-button-para"]}`}>Limited Invitations Available</span>
                    <PrimaryBtn btn_name="Register" btn_disable={false} onClickHandler={handleView} />
              </div>
            </div>
          }
    </div>
    
  );
};

export default index;
