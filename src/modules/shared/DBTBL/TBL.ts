const DB_TBLS = {
  TYPES: {
    OFFICIAL: "official",
    ADDED_BY_USER: "added_by_user",
    APPROVED: "approved",
  },
  FOREIGN_KEYS: {
    LEAD_ID: "leadId",
    PERSON_ID: "personId",
    BUSINESS_ID: "businessId",
    TAG_ID: "tagId",
  },
  /* LEAD */
  LEAD: {
    TABLE: "lead",
    COLS: {
      ID: "id",
      TYPE: "type",
    },
    ENUM: {
      TYPE: {
        BUSINESS: "business",
        PERSON: "person",
        CANDIDATE: "candidate",
        ADMIN: "admin",
        DELEGATE: "delegate",
      },
    },
  },
  LEAD_DESCRIPTION: {
    TABLE: "lead_description",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      DESCRIPTION: "description",
    },
  },
  LEAD_MESSENGERS: {
    TABLE: "lead_messengers",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      MESSENGER_ID: "messengerId",
      MESSENGER_TYPE: "messengerType",
    },
    ENUM: {
      MESSENGER_TYPE: {
        TWITTER: "twitter",
        SKYPE: "skype",
        G_TALK: "gtalk",
        WE_CHAT: "wechat",
        QQ: "qq",
        ICQ: "icq",
      },
    },
  },
  LEAD_SKILLS: {
    TABLE: "lead_skills",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      TAG_ID: "tagId",
      WORK_CATEGORY_ID: "workCategoryId",
      SELF_RATING: "selfRating",
      SELF_INTEREST: "selfInterest",
      EXPERIENCE_IN_YEARS: "experienceInYears",
      PROJECTS_COMPLETED: "projectsCompleted",
    },
  },
  LEAD_TAGS: {
    TABLE: "lead_tags",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      TAG_ID: "tagId",
    },
  },
  LEAD_INTERESTS: {
    TABLE: "lead_interests",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      TAG_ID: "tagId",
    },
  },
  LEAD_INDUSTRY: {
    TABLE: "lead_industry",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      INDUSTRY_ID: "industryId",
    },
  },
  LEAD_STATUS: {
    TABLE: "lead_status",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      STATUS: "status",
    },
    ENUM: {
      STATUS: {
        ACTIVE: "active",
        PENDING: "pending",
        BLOCKED: "blocked",
      },
    },
  },
  /* BUSINESS */
  BUSINESS: {
    TABLE: "business",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      TYPE: "type",
    },
  },
  /* PERSON */
  PERSON: {
    TABLE: "person",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      BUSINESS_ID: "businessId",
      DESIGNATION_ID: "designationId",
      FIRST_NAME: "firstName",
      LAST_NAME: "lastName",
      SUMMARY: "summary",
    },
  },
  PERSON_EXPERIENCE: {
    TABLE: "person_experience",
    COLS: {
      ID: "id",
      PERSON_ID: "personId",
      DESIGNATION_ID: "designationId",
      WORK_COUNTRY_ID: "workCountryId",
      WORK_CITY_ID: "workCityId",
      FROM_DATE: "fromDate",
      TO_DATE: "toDate",
      WORK_DESCRIPTION: "workDescription",
      ORG_NAME: "orgName",
      ORG_URL: "orgUrl",
      ORG_LINKED_IN_URL: "orgLinkedInUrl",
    },
  },
  PERSON_EDUCATION: {
    TABLE: "person_education",
    COLS: {
      ID: "id",
      PERSON_ID: "personId",
      FROM_DATE: "fromDate",
      TO_DATE: "toDate",
      DEGREE_TITLE: "degreeTitle",
      DEGREE_CATEGORY: "degreeCategory",
      DEGREE_DESCRIPTION: "degreeDescription",
      DEGREE_GRADE: "degreeGrade",
      INSTITUTE_NAME: "instituteName",
      INSTITUTE_URL: "instituteUrl",
      EDUCATION_LOCATION: "educationLocation",
    },
  },
  CANDIDATE: {
    TABLE: "candidate",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      FIRST_NAME: "firstName",
      LAST_NAME: "lastName",
      DESIGNATION_ID: "designationId",
    },
  },
  /* AUTH TABLES */
  PASSWORD: {
    TABLE: "password",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      HASHED_PASSWORD: "hashedPassword",
    },
  },
  FORGOT_PASSWORD: {
    TABLE: "forgotPassword",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      IS_EXPIRED: "isExpired",
      Token_Expiry_DATE: "tokenExpiryDate",
    },
  },
  /* OTHER */
  ADDRESS: {
    TABLE: "address",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      COUNTRY_ID: "countryId",
      CITY_ID: "cityId",
      ADDRESS_LINE: "addressLine",
      ZIP: "zip",
    },
  },
  EMAIL: {
    TABLE: "email",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      EMAIL: "email",
    },
  },
  PHONE: {
    TABLE: "phone",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      PHONE: "phone",
      TYPE: "type",
    },
    ENUM: {
      TYPE: {
        HOME: "home",
        WORK: "work",
        MOBILE: "mobile",
        UNDEFINED: "undefined",
      },
    },
  },
  URL: {
    TABLE: "url",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      TAG_ID: "tagId",
      URL: "url",
    },
  },
  BIRTHDAY: {
    TABLE: "birthday",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      BIRTHDAY: "birthday",
    },
  },
  SITE_AUDIT: {
    TABLE: "site_audit",
    COLS: {
      ID: "id",
      URL_ID: "urlId",
      FORMATTED_JSON: "formattedJson",
    },
  },
  /* NO PARENT RELATION TABLES */
  TAGS: {
    TABLE: "tags",
    COLS: {
      ID: "id",
      NAME: "name",
      TYPE: "type",
      DESCRIPTION: "description",
    },
  },
  EMAIL_CAMPAIGN: {
    TABLE: "email_campaign",
    COLS: {
      ID: "id",
      NAME: "name",
      DESCRIPTION: "description",
    },
  },
  DESIGNATIONS: {
    TABLE: "designations",
    COLS: {
      ID: "id",
      NAME: "name",
      TYPE: "type",
    },
  },
  INDUSTRIES: {
    TABLE: "industries",
    COLS: {
      ID: "id",
      NAME: "name",
      DESCRIPTION: "description",
      TYPE: "type",
    },
  },
  COUNTRIES: {
    TABLE: "countries",
    COLS: {
      ID: "id",
      NAME: "name",
      TYPE: "type",
    },
  },
  CITIES: {
    TABLE: "cities",
    COLS: {
      ID: "id",
      NAME: "name",
      TYPE: "type",
    },
  },
  LOGS: {
    TABLE: "logs",
    COLS: {
      ID: "id",
      AFFECTEE_ID: "affecteeId",
      ENTITY_ID: "entityId",
      DOER_ID: "doer_id",
      ACTIVITY: "activity",
      DETAILS: "details",
      STATUS: "status",
    },
    ENUM: {
      STATUS: {
        SUCCESS: "success",
        FAILURE: "failure",
      },
    },
  },
  TALENT_WORK_CATEGORY: {
    TABLE: "talent_work_category",
    COLS: {
      ID: "id",
      NAME: "name",
      DESCRIPTION: "description",
      TYPE: "type",
    },
  },
  PERSON_AVATAR: {
    TABLE: "person_avatar",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      IMAGE_NAME: "imageName",
      IMAGE_LOCATION: "imageLocation",
      STATUS: "status",
    },
  },
  TALENT_VIDEO: {
    TABLE: "talent_video",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",
      VIDEO_LINK: "videoLink",
      STATUS: "status",
    },
  },
  TALENT_WORK_PREFERENCES: {
    TABLE: "talent_work_preferences",
    COLS: {
      ID: "id",
      LEAD_ID: "leadId",

      FULL_TIME_IN_OFFICE: "fullTimeInOffice",
      PER_MONTH_FULL_TIME_SALARY_IN_OFFICE: "perMonthFullTimeSalaryInOffice",
      FULL_TIME_REMOTE: "fullTimeRemote",
      PER_MONTH_FULL_TIME_SALARY_REMOTE: "perMonthFullTimeSalaryRemote",

      PART_TIME_IN_OFFICE: "partTimeInOffice",
      PART_TIME_SALARY_IN_OFFICE: "partTimeSalaryInOffice",
      PART_TIME_REMOTE: "partTimeRemote",
      PART_TIME_SALARY_REMOTE: "partTimeSalaryRemote",

      CONSULTANT_IN_OFFICE: "consultantInOffice",
      PER_HOUR_CONSULTANCY_RATE_IN_OFFICE: "perHourConsultancyRateInOffice",
      CONSULTANT_REMOTE: "consultantRemote",
      PER_HOUR_CONSULTANCY_RATE_REMOTE: "perHourConsultancyRateRemote",

      IMMIGRATION: "immigration",
      PER_MONTH_CURRENT_EARNINGS: "perMonthCurrentEarnings",
      DISCLOSE_CURRENT_EARNINGS: "discloseCurrentEarnings",
      AVAILABLE_WITH_DAYS: "availableWithDays",
      ACTIVELY_LOOKING_FOR_JOB: "activelyLookingForJob",
      DISCLOSE_NATIONALITY: "discloseNationality",
    },
  },
};

export default DB_TBLS;
