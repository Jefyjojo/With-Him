/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: moodbasedscriptures
 * Interface for MoodBasedScriptures
 */
export interface MoodBasedScriptures {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  mood?: string;
  /** @wixFieldType text */
  scriptureText?: string;
  /** @wixFieldType text */
  scriptureReference?: string;
  /** @wixFieldType text */
  keywords?: string;
  /** @wixFieldType number */
  comfortLevel?: number;
}


/**
 * Collection ID: prayerjournal
 * Interface for PrayerJournal
 */
export interface PrayerJournal {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  entryTitle?: string;
  /** @wixFieldType text */
  prayerContent?: string;
  /** @wixFieldType datetime */
  entryDate?: Date | string;
  /** @wixFieldType text */
  moodTag?: string;
  /** @wixFieldType boolean */
  isPrivate?: boolean;
  /** @wixFieldType multi_reference */
  userprofiles?: UserProfiles[];
}


/**
 * Collection ID: userprofiles
 * Interface for UserProfiles
 */
export interface UserProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  externalUserId?: string;
  /** @wixFieldType multi_reference */
  prayerjournalentries?: PrayerJournal[];
  /** @wixFieldType text */
  userName?: string;
  /** @wixFieldType date */
  dateOfBirth?: Date | string;
  /** @wixFieldType text */
  gender?: string;
  /** @wixFieldType image */
  profilePicture?: string;
}


/**
 * Collection ID: userreflections
 * Interface for UserReflections
 */
export interface UserReflections {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  authorName?: string;
  /** @wixFieldType text */
  reflectionContent?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
  /** @wixFieldType text */
  moodTag?: string;
  /** @wixFieldType image */
  featuredImage?: string;
}


/**
 * Collection ID: usertestimonies
 * Interface for UserTestimonies
 */
export interface UserTestimonies {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  testimonyTitle?: string;
  /** @wixFieldType text */
  authorName?: string;
  /** @wixFieldType text */
  testimonyContent?: string;
  /** @wixFieldType date */
  submissionDate?: Date | string;
  /** @wixFieldType image */
  userPhoto?: string;
  /** @wixFieldType boolean */
  isApproved?: boolean;
}
