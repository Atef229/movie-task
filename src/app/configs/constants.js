export const VALIDATION_ERROR = 'Request didn\'t pass validation';
export const PERMISSION_DENIED = 'Permission Denied';
export const SOMETHING_WENT_WRONG = 'Something went wrong, please try again';
export const REQUIRED = resource => `${resource} is required`;
export const INVALID = resource => `${resource} is invalid`;
export const ALREADY_EXISTS = resource => `${resource} already exists!`;
export const NOT_EXISTS = resource => `${resource} doesn't exist!`;
export const INVALID_CREDENTIALS = 'Invalid credentials';
export const INVALID_EMAIL_OR_PASSWORD = 'Invalid email or password';
export const INVALID_CURRENT_PASSWORD = 'Your current password is wrong';
export const SERVICE_UNAVAILABLE = 'Service is temporarily unavailable';
export const USER_AUTH = 'user-rule';
export const SUPER_ADMIN_AUTH = 'super-admin-rule';
export const TOKEN_EXPIRED = 'Token expired';
export const EMAIL_VERIFICATION_TOKEN = 'verify_email';
export const PASSWORD_RESET_TOKEN = 'reset_password';
export const RATE_LIMITED = 'You have exceeded the allowed limit to this action';

export const USER_TYPES = {
    SuperAdmin: 0,
    Admin: 1,
    Owner: 2,
    Client: 3,
};

/**
 * Separating user types into groups with same roles.
 */
export const USER_TYPES_GROUPS = {
    Adminstration: [USER_TYPES.SuperAdmin, USER_TYPES.SuperAdmin],
    Users:[USER_TYPES.Owner, USER_TYPES.Client]
};

export const TARGET_AUDIENCE = {
    Men: 'Men',
    Women: 'Women',
    BOTH: 'Both',
};

export const TIME_OF_DAY = {
    Anytime: 'Anytime',
    Morning: 'Morning',
    Afternoon: 'Afternoon',
    Evening: 'Evening',
};

export const BUSINESS_TYPE = {
    HairSalon:'Hair Salon',
    Barbershop: 'Barbershop',
    NailSalon:'Nail Salon',
    BeautySalon: 'Beauty Salon',
    EyebrowsLashes: 'Eyebrows & Lashes',
    Massage:'Massage',
    MakeupArtist: 'Makeup Artist',
    DaySpa: 'Day Spa',
    TattooShops:'Tattoo Shops'
};

export const PRICE_TYPE = {
    Fixed: 'Fixed',
    Varies: 'Varies',
    DontShow: 'DontShow',
    Free: 'Free',
    StartsAt: 'StartsAt',
};


export const TYPE_OF_ACTION = {
    add: 'add',
    remove: 'remove'
};

export const PAYMENT_METHOD = {
    Cash: 'Cash',
    Card: 'Card'
};

export const MESSAGE_TYPE = {
    Text: 'Text',
    Image: 'Image',
    Link: 'Link',
};

export const APPOINTMENT_STATE = {
    InProgress: 'In Progress',
    Finished: 'Finished',
    Canceled: 'Canceled'
};

export const WEEK_DAY = {
    Saturday: 'Saturday',
    Sunday: 'Sunday',
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
};

export const VIDEO_EXTENSIONS = [
    '.3g2', '.3gp', '.avi', '.flv', '.h264', '.m4v', '.mkv', '.mov', '.mp4', '.mpg', '.mpeg', '.rm', '.swf', '.vob', '.wmv', '.webm'
];

export const IMAGE_EXTENSIONS = [
    '.ai', '.bmp', '.ico', '.jpeg', '.jpg', '.png', '.psd', '.svg', '.tif', '.tiff'
];

export const DOC_EXTENSIONS = [
    '.pdf', '.doc', '.docx', '.txt', '.rtf'
];
