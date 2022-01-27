import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faDiscord,
    faFacebook,
    faGithub,
    faInstagram,
    faLinkedin,
    faReddit,
} from '@fortawesome/free-brands-svg-icons'
// prettier-ignore
import {
    faComment as farComment,
    faCommentAlt as farCommentAlt, faEdit as farEdit, faFlag as farFlag, faHourglass as farHourglass, faStar as farStar, faThumbsDown as farThumbsDown, faThumbsUp as farThumbsUp,
} from '@fortawesome/free-regular-svg-icons'
// prettier-ignore
import {
    faAddressCard, faArrowDown, faArrowRight, faAward, faBars, faBold, faBolt, faBook, faBookmark, faCalculator, faCamera, faCertificate, faCheck, faCheckCircle, faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faCloudDownloadAlt, faCloudUploadAlt, faCog, faColumns, faComment, faCommentAlt, faComments, faCrown, faDizzy, faDownload, faEdit, faEllipsisH, faEnvelope, faExclamation, faExclamationCircle, faExternalLinkAlt, faEye, faFile, faFileUpload, faFlag, faFolder, faGrimace, faGrinBeamSweat, faHashtag, faHighlighter, faHistory, faHome, faHourglass, faHourglassEnd, faInfo, faInfoCircle, faItalic, faKey, faLeaf, faLink, faList, faMedal, faNewspaper, faPaperPlane, faParagraph, faPenAlt, faPhone, faPlus, faQuestionCircle, faSadCry, faSearch, faShareSquare, faSignInAlt, faSignOutAlt, faSlidersH, faSpinner, faStar, faStopwatch, faStrikethrough, faSurprise, faTags, faTerminal, faTh, faThumbsDown, faThumbsUp, faTimes, faTimesCircle, faToolbox, faTools, faTrash, faUnderline, faUniversalAccess, faUpload, faUser, faUserCog, faUserFriends, faUsers, faUserShield, faVial, faWind,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Solid icons
// prettier-ignore
library.add(faPhone, faUser, faFlag, faThumbsUp, faThumbsDown, faCheckCircle, faTimesCircle, faCheck,
    faTimes, faFolder, faCrown, faQuestionCircle, faFolder, faNewspaper, faUsers, faPenAlt, faUserCog,
    faUpload, faComments, faColumns, faHome, faVial, faComment, faHistory, faHourglass, faBars, faSignInAlt,
    faUserShield, faKey, faInfoCircle, faChevronDown, faChevronUp, faChevronLeft, faChevronRight, faStar,
    faFlag, faCommentAlt, faEdit, faHourglassEnd, faSearch, faCog, faSignOutAlt, faCamera, faWind,
    faExclamationCircle, faHashtag, faParagraph, faBold, faItalic, faStrikethrough, faUnderline,
    faHighlighter, faTrash, faStopwatch, faTags, faShareSquare, faAward, faMedal, faEnvelope,
    faUniversalAccess, faUserFriends, faAddressCard, faExternalLinkAlt, faFileUpload, faCloudUploadAlt,
    faCloudDownloadAlt, faList, faTh, faEllipsisH, faDownload, faPlus, faToolbox, faTools, faBookmark,
    faInfoCircle, faPaperPlane, faFile, faTerminal, faCalculator, faLeaf, faBolt, faBook, faSadCry,
    faGrimace, faGrinBeamSweat, faDizzy, faSurprise, faExclamation, faInfo, faSpinner, faArrowDown,
    faArrowRight, faLink, faSlidersH, faCertificate, faEye)

// Regular icons
library.add(farFlag, farHourglass, farStar, farComment, farCommentAlt, farEdit, farThumbsUp, farThumbsDown)

// Brand icons
library.add(faReddit, faFacebook, faDiscord, faLinkedin, faInstagram, faGithub)

export default FontAwesomeIcon
