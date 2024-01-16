import {React,useState}from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faBook, faFileAlt,faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';




export default function 
() {
    const [dropdownVisible, setDropdownVisible] = useState(false);

const toggleDropdown = () => {
  setDropdownVisible(!dropdownVisible);
};
  return (
    <div>
        

        <div className={`ribbon-container ${dropdownVisible ? 'open' : ''}`}>
      {dropdownVisible && (
       <div className="dropdown">
       <div>
         <FontAwesomeIcon icon={faHome} className="icon"/> 
         <a href="https://www.sathyabama.ac.in/" target="_blank" rel="noopener noreferrer">
           Home
         </a>
       </div>
       <div>
         <FontAwesomeIcon icon={faBriefcase} className="icon"/> {/* ERP icon */}
         <a href="https://erp.sathyabama.ac.in/account/login?returnUrl=%2F" target="_blank" rel="noopener noreferrer">
           ERP
         </a>
       </div>
       <div>
         <FontAwesomeIcon icon={faBook} className="icon"/> {/* LMS icon */}
         <a href="https://sathyabama.cognibot.in/login/index.php" target="_blank" rel="noopener noreferrer">
           LMS
         </a>
       </div>
       <div>
         <FontAwesomeIcon icon={faFileAlt} className="icon" /> {/* E-Library icon */}
         <a href="https://sist.knimbus.com/user#/home" target="_blank" rel="noopener noreferrer">
           Library
         </a>
       </div>
     </div>
      )}
      <button onClick={toggleDropdown}>
        {dropdownVisible ? (
          <>
                      th Dropdown   Close &lt;

          </>
        ) : (
          <>
                     &gt;          </>
        )}
      </button>
    </div>


    </div>
  )
}
